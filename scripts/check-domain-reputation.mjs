import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const canonicalOrigin = (process.env.TARGET_ORIGIN || "https://www.visioner.cc").replace(/\/$/, "");
const evidenceDir = process.env.EVIDENCE_DIR || ".reputation-evidence";
const timeoutMs = Number(process.env.CHECK_TIMEOUT_MS || 15000);

const checks = [];

function record(name, ok, details, critical = true) {
  checks.push({ name, ok, critical, details });
  const marker = ok ? "PASS" : critical ? "FAIL" : "WARN";
  process.stdout.write(`${marker} ${name}: ${details}\n`);
}

async function request(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      redirect: options.redirect || "follow",
      headers: {
        "user-agent":
          "Visioner-Reputation-Monitor/1.0 (+https://www.visioner.cc/.well-known/security.txt)",
        accept: options.accept || "text/html,application/xhtml+xml",
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

function challengeDetected(body) {
  const normalized = body.toLowerCase();
  return [
    "cf-chl-",
    "just a moment",
    "checking your browser",
    "performing security verification",
    "security verification could not load",
    "challenges.cloudflare.com",
  ].some((marker) => normalized.includes(marker));
}

async function checkPage(relativePath, expectedContentType) {
  const url = `${canonicalOrigin}${relativePath}`;

  try {
    const response = await request(url, {
      accept: expectedContentType === "xml" ? "application/xml,text/xml" : undefined,
    });
    const body = await response.text();
    const contentType = response.headers.get("content-type") || "";

    record(`${relativePath} status`, response.ok, `${response.status} ${response.statusText}`);
    record(
      `${relativePath} no browser challenge`,
      !challengeDetected(body),
      challengeDetected(body) ? "Cloudflare challenge content detected" : "No challenge markers",
    );

    if (expectedContentType === "xml") {
      record(
        `${relativePath} XML content`,
        contentType.includes("xml") && body.includes("<urlset"),
        `content-type=${contentType || "missing"}`,
      );
    }

    if (expectedContentType === "text") {
      record(
        `${relativePath} text content`,
        contentType.includes("text/plain") && body.includes("Contact: mailto:support@visioner.cc"),
        `content-type=${contentType || "missing"}`,
      );
    }

    return { response, body };
  } catch (error) {
    record(
      `${relativePath} request`,
      false,
      error instanceof Error ? error.message : String(error),
    );
    return null;
  }
}

async function checkRedirect(sourceOrigin) {
  const probePath = "/reputation-probe?source=monitor";
  const expected = `${canonicalOrigin}${probePath}`;

  try {
    const response = await request(`${sourceOrigin}${probePath}`, { redirect: "manual" });
    const location = response.headers.get("location");
    let resolvedLocation = null;

    if (location) {
      resolvedLocation = new URL(location, sourceOrigin).toString();
    }

    record(
      `${sourceOrigin} canonical redirect`,
      response.status >= 300 && response.status < 400 && resolvedLocation === expected,
      `status=${response.status}, location=${resolvedLocation || "missing"}, expected=${expected}`,
    );
  } catch (error) {
    record(
      `${sourceOrigin} canonical redirect`,
      false,
      error instanceof Error ? error.message : String(error),
    );
  }
}

const home = await checkPage("/", "html");
await Promise.all([
  checkPage("/privacy", "html"),
  checkPage("/terms", "html"),
  checkPage("/robots.txt", "text"),
  checkPage("/sitemap.xml", "xml"),
  checkPage("/.well-known/security.txt", "text"),
]);

await Promise.all([
  checkRedirect("http://visioner.cc"),
  checkRedirect("https://visioner.cc"),
  checkRedirect("http://www.visioner.cc"),
]);

if (home) {
  const { response, body } = home;
  const hsts = response.headers.get("strict-transport-security") || "";
  const nosniff = response.headers.get("x-content-type-options") || "";
  const referrerPolicy = response.headers.get("referrer-policy") || "";
  const canonicalMatch =
    body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
    body.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);

  record("HSTS header", hsts.includes("max-age="), hsts || "missing");
  record("nosniff header", nosniff.toLowerCase() === "nosniff", nosniff || "missing");
  record(
    "referrer policy",
    referrerPolicy.toLowerCase() === "strict-origin-when-cross-origin",
    referrerPolicy || "missing",
  );
  record(
    "canonical page URL",
    canonicalMatch?.[1] === `${canonicalOrigin}/`,
    canonicalMatch?.[1] || "missing",
  );
}

const criticalFailures = checks.filter((check) => check.critical && !check.ok);
const result = {
  checkedAt: new Date().toISOString(),
  canonicalOrigin,
  summary: {
    total: checks.length,
    passed: checks.filter((check) => check.ok).length,
    failed: criticalFailures.length,
  },
  checks,
};

await mkdir(evidenceDir, { recursive: true });
const timestamp = result.checkedAt.replace(/[:.]/g, "-");
const evidencePath = path.join(evidenceDir, `domain-reputation-${timestamp}.json`);
await writeFile(evidencePath, `${JSON.stringify(result, null, 2)}\n`);
process.stdout.write(`Evidence: ${evidencePath}\n`);

if (criticalFailures.length > 0) {
  process.exitCode = 1;
}
