import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import tls from "node:tls";

const canonicalOrigin = process.env.CANONICAL_ORIGIN || "https://www.visioner.cc";
const canonicalUrl = new URL(canonicalOrigin);
const reportPath =
  process.env.REPUTATION_REPORT_PATH ||
  path.join(process.cwd(), "artifacts", "domain-reputation-report.json");

const checks = [];

function record(name, status, details, severity = "critical") {
  checks.push({ name, status, severity, details });
  const symbol = status === "pass" ? "PASS" : status === "warn" ? "WARN" : "FAIL";
  process.stdout.write(`${symbol} ${name}: ${details}\n`);
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    return await fetch(url, {
      ...options,
      headers: {
        "user-agent": "Visioner-Reputation-Monitor/1.0 (+https://www.visioner.cc)",
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeLocation(location, source) {
  return new URL(location, source).toString();
}

async function checkRedirect(name, source, expectedOrigin) {
  try {
    const response = await fetchWithTimeout(source, { redirect: "manual" });
    const location = response.headers.get("location");

    if (![301, 302, 307, 308].includes(response.status) || !location) {
      record(
        name,
        "fail",
        `Expected an HTTP redirect, received ${response.status} without a usable Location header.`,
      );
      return;
    }

    const target = new URL(normalizeLocation(location, source));
    const sourceUrl = new URL(source);
    const expectedUrl = new URL(expectedOrigin);
    const pathPreserved =
      target.pathname === sourceUrl.pathname && target.search === sourceUrl.search;

    if (target.origin !== expectedUrl.origin || !pathPreserved) {
      record(
        name,
        "fail",
        `Redirected to ${target.toString()} instead of preserving the path on ${expectedUrl.origin}.`,
      );
      return;
    }

    record(name, "pass", `${response.status} → ${target.toString()}`);
  } catch (error) {
    record(name, "fail", error instanceof Error ? error.message : String(error));
  }
}

async function checkPublicPage(route) {
  const url = new URL(route, canonicalOrigin).toString();

  try {
    const response = await fetchWithTimeout(url, { redirect: "follow" });
    const body = await response.text();
    const finalUrl = new URL(response.url);
    const challengeMarkers = [
      "cf-chl-",
      "challenges.cloudflare.com/turnstile",
      "verifying you are human",
      "security verification could not load",
      "just a moment...",
    ];
    const bodyLower = body.toLowerCase();
    const challenge = challengeMarkers.find((marker) => bodyLower.includes(marker.toLowerCase()));

    if (response.status !== 200) {
      record(`Public page ${route}`, "fail", `Returned HTTP ${response.status}.`);
      return;
    }

    if (finalUrl.origin !== canonicalUrl.origin) {
      record(`Public page ${route}`, "fail", `Ended on non-canonical origin ${finalUrl.origin}.`);
      return;
    }

    if (challenge) {
      record(
        `Public page ${route}`,
        "fail",
        `Public content contains a security challenge marker: ${challenge}`,
      );
      return;
    }

    const canonicalMatch = body.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i,
    );
    if (!canonicalMatch) {
      record(`Canonical tag ${route}`, "warn", "No canonical link tag was found.", "warning");
    } else {
      const canonical = new URL(canonicalMatch[1], response.url);
      if (canonical.origin !== canonicalUrl.origin) {
        record(`Canonical tag ${route}`, "fail", `Canonical points to ${canonical.toString()}.`);
      } else {
        record(`Canonical tag ${route}`, "pass", `Canonical points to ${canonical.toString()}.`);
      }
    }

    const hsts = response.headers.get("strict-transport-security");
    const nosniff = response.headers.get("x-content-type-options");
    if (!hsts) {
      record(`HSTS ${route}`, "warn", "Strict-Transport-Security is missing.", "warning");
    } else {
      record(`HSTS ${route}`, "pass", hsts);
    }
    if (nosniff?.toLowerCase() !== "nosniff") {
      record(`No-sniff ${route}`, "warn", "X-Content-Type-Options: nosniff is missing.", "warning");
    } else {
      record(`No-sniff ${route}`, "pass", "nosniff");
    }

    record(`Public page ${route}`, "pass", `HTTP 200 at ${response.url}`);
  } catch (error) {
    record(`Public page ${route}`, "fail", error instanceof Error ? error.message : String(error));
  }
}

async function checkRobots() {
  const url = new URL("/robots.txt", canonicalOrigin).toString();
  try {
    const response = await fetchWithTimeout(url);
    const body = await response.text();
    const expected = new URL("/sitemap.xml", canonicalOrigin).toString();
    if (response.status !== 200) {
      record("robots.txt", "fail", `Returned HTTP ${response.status}.`);
    } else if (!body.includes(expected)) {
      record("robots.txt", "fail", `Does not reference ${expected}.`);
    } else {
      record("robots.txt", "pass", `References ${expected}.`);
    }
  } catch (error) {
    record("robots.txt", "fail", error instanceof Error ? error.message : String(error));
  }
}

async function checkSitemap() {
  const url = new URL("/sitemap.xml", canonicalOrigin).toString();
  try {
    const response = await fetchWithTimeout(url);
    const body = await response.text();
    const locations = [...body.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => match[1]);

    if (response.status !== 200) {
      record("sitemap.xml", "fail", `Returned HTTP ${response.status}.`);
    } else if (!body.includes("<urlset") || locations.length === 0) {
      record("sitemap.xml", "fail", "No valid sitemap URL entries were found.");
    } else if (locations.some((location) => new URL(location).origin !== canonicalUrl.origin)) {
      record("sitemap.xml", "fail", "At least one sitemap URL uses a non-canonical origin.");
    } else {
      record("sitemap.xml", "pass", `${locations.length} canonical URLs found.`);
    }
  } catch (error) {
    record("sitemap.xml", "fail", error instanceof Error ? error.message : String(error));
  }
}

async function checkSecurityTxt() {
  const url = new URL("/.well-known/security.txt", canonicalOrigin).toString();
  try {
    const response = await fetchWithTimeout(url);
    const body = await response.text();
    const expiresMatch = body.match(/^Expires:\s*(.+)$/im);
    const canonicalLine = `Canonical: ${url}`;
    const hasContact = /^Contact:\s*mailto:/im.test(body);
    const futureExpiry =
      expiresMatch && Number.isFinite(Date.parse(expiresMatch[1]))
        ? Date.parse(expiresMatch[1]) > Date.now()
        : false;

    if (response.status !== 200) {
      record("security.txt", "fail", `Returned HTTP ${response.status}.`);
    } else if (!hasContact || !body.includes(canonicalLine) || !futureExpiry) {
      record(
        "security.txt",
        "fail",
        "Missing a mail contact, canonical URL, or future expiration date.",
      );
    } else {
      record("security.txt", "pass", "Contact, canonical URL, and expiry are valid.");
    }
  } catch (error) {
    record("security.txt", "fail", error instanceof Error ? error.message : String(error));
  }
}

function checkTlsCertificate() {
  return new Promise((resolve) => {
    const socket = tls.connect(
      443,
      canonicalUrl.hostname,
      { servername: canonicalUrl.hostname },
      () => {
        const certificate = socket.getPeerCertificate();
        const validTo = Date.parse(certificate.valid_to);
        const daysRemaining = Math.floor((validTo - Date.now()) / 86_400_000);
        socket.end();

        if (!Number.isFinite(validTo)) {
          record("TLS certificate", "fail", "Certificate expiry could not be read.");
        } else if (daysRemaining < 14) {
          record(
            "TLS certificate",
            "fail",
            `Only ${daysRemaining} days remain before certificate expiry.`,
          );
        } else {
          record(
            "TLS certificate",
            "pass",
            `${daysRemaining} days remain; expires ${certificate.valid_to}.`,
          );
        }
        resolve();
      },
    );

    socket.setTimeout(15_000);
    socket.on("timeout", () => {
      socket.destroy();
      record("TLS certificate", "fail", "TLS connection timed out.");
      resolve();
    });
    socket.on("error", (error) => {
      record("TLS certificate", "fail", error.message);
      resolve();
    });
  });
}

await checkRedirect(
  "HTTP apex redirect",
  "http://visioner.cc/privacy?source=reputation-smoke",
  canonicalOrigin,
);
await checkRedirect(
  "HTTPS apex redirect",
  "https://visioner.cc/privacy?source=reputation-smoke",
  canonicalOrigin,
);
await checkRedirect(
  "HTTP www redirect",
  "http://www.visioner.cc/privacy?source=reputation-smoke",
  canonicalOrigin,
);

for (const route of ["/", "/privacy", "/terms"]) {
  await checkPublicPage(route);
}

await checkRobots();
await checkSitemap();
await checkSecurityTxt();
await checkTlsCertificate();

const criticalFailures = checks.filter(
  (check) => check.status === "fail" && check.severity === "critical",
);
const warnings = checks.filter((check) => check.status === "warn");
const report = {
  generatedAt: new Date().toISOString(),
  canonicalOrigin,
  summary: {
    total: checks.length,
    passed: checks.filter((check) => check.status === "pass").length,
    warnings: warnings.length,
    criticalFailures: criticalFailures.length,
  },
  checks,
};

await mkdir(path.dirname(reportPath), { recursive: true });
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`Report written to ${reportPath}\n`);

if (criticalFailures.length > 0) {
  process.exitCode = 1;
}
