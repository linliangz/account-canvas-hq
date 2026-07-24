import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import tls from "node:tls";

import { parseCsv } from "./lib/csv.mjs";

const root = process.cwd();
const targets = JSON.parse(
  await readFile(path.join(root, "config", "seo-geo-targets.json"), "utf8"),
);
const scorecard = JSON.parse(
  await readFile(path.join(root, "config", "seo-geo-scorecard.json"), "utf8"),
);
const origin = (process.env.SITE_URL || targets.canonicalOrigin).replace(/\/+$/, "");
const reportDate = (process.env.REPORT_DATE || new Date().toISOString().slice(0, 10)).trim();
const outputDir = path.join(root, "reports", "trust");
const reputationInput =
  process.env.REPUTATION_BASELINE ||
  path.join(root, "baselines", reportDate, "reputation-baseline.csv");
const checks = [];

function record(group, name, passed, evidence, measured = true) {
  checks.push({ group, name, passed: Boolean(passed), measured, evidence: String(evidence || "") });
}

async function request(url, redirect = "follow") {
  try {
    const response = await fetch(url, {
      redirect,
      headers: {
        "user-agent":
          "Visioner-Trust-Audit/2.0 (+https://www.visioner.cc/.well-known/security.txt)",
      },
      signal: AbortSignal.timeout(15_000),
    });
    return { response, body: await response.text() };
  } catch (error) {
    return {
      response: null,
      body: "",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function comparableUrl(value) {
  try {
    const url = new URL(value);
    if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
    return url.toString();
  } catch {
    return "";
  }
}

async function checkRedirect(source) {
  const expected = `${origin}/guides?source=trust-audit`;
  const { response, error } = await request(`${source}/guides?source=trust-audit`, "manual");
  const location = response?.headers.get("location") || "";
  const resolved = location ? new URL(location, source).toString() : "";
  record(
    "canonicalRedirects",
    source,
    response &&
      [301, 308].includes(response.status) &&
      comparableUrl(resolved) === comparableUrl(expected),
    response ? `HTTP ${response.status}; ${resolved || "Location missing"}` : error,
  );
}

await Promise.all([
  checkRedirect("http://visioner.cc"),
  checkRedirect("https://visioner.cc"),
  checkRedirect("http://www.visioner.cc"),
]);

const home = await request(`${origin}/`);
if (home.response) {
  const headers = home.response.headers;
  const expected = {
    "strict-transport-security": /max-age=\d+/i,
    "x-content-type-options": /^nosniff$/i,
    "x-frame-options": /^(deny|sameorigin)$/i,
    "referrer-policy": /^strict-origin-when-cross-origin$/i,
    "permissions-policy": /camera=\(\).*microphone=\(\).*geolocation=\(\)/i,
  };
  const failed = Object.entries(expected)
    .filter(([name, pattern]) => !pattern.test(headers.get(name) || ""))
    .map(([name]) => name);
  record(
    "transportAndHeaders",
    "Conservative response headers",
    failed.length === 0,
    failed.length ? `Missing or invalid: ${failed.join(", ")}` : "All expected headers passed",
  );
} else {
  record("transportAndHeaders", "Conservative response headers", false, home.error);
}

const hostname = new URL(origin).hostname;
await new Promise((resolve) => {
  const socket = tls.connect(
    { host: hostname, port: 443, servername: hostname, rejectUnauthorized: true, timeout: 15_000 },
    () => {
      const certificate = socket.getPeerCertificate();
      const validTo = Date.parse(certificate.valid_to);
      const daysRemaining = Number.isFinite(validTo)
        ? Math.floor((validTo - Date.now()) / 86_400_000)
        : -1;
      record(
        "transportAndHeaders",
        "TLS certificate",
        daysRemaining >= 14,
        Number.isFinite(validTo)
          ? `${daysRemaining} days remaining; expires ${certificate.valid_to}`
          : "Expiry unavailable",
      );
      socket.end();
      resolve();
    },
  );
  socket.once("error", (error) => {
    record("transportAndHeaders", "TLS certificate", false, error.message);
    resolve();
  });
  socket.once("timeout", () => {
    socket.destroy();
    record("transportAndHeaders", "TLS certificate", false, "Timed out");
    resolve();
  });
});

const trustPages = [
  ["/privacy", "Privacy Policy"],
  ["/terms", "Terms of Service"],
  ["/support", "support@visioner.cc"],
  ["/about", "Ronisens Inc."],
  ["/.well-known/security.txt", "Contact: mailto:support@visioner.cc"],
];
for (const [route, marker] of trustPages) {
  const result = await request(`${origin}${route}`);
  record(
    "publicTrustPages",
    route,
    result.response?.status === 200 && result.body.includes(marker),
    result.response
      ? `HTTP ${result.response.status}; marker=${result.body.includes(marker)}`
      : result.error,
  );
}

const homeSchema =
  home.body.includes('"@type":"Organization"') ||
  home.body.includes('\\"@type\\":\\"Organization\\"');
record(
  "identityAndSupport",
  "Organization structured data",
  home.response?.status === 200 && homeSchema,
  `HTTP ${home.response?.status || 0}; Organization=${homeSchema}`,
);
const identityPages = await Promise.all([request(`${origin}/about`), request(`${origin}/support`)]);
const identityText = identityPages.map((item) => item.body).join("\n");
record(
  "identityAndSupport",
  "Operator and support identity",
  identityText.includes("Ronisens Inc.") && identityText.includes("support@visioner.cc"),
  `operator=${identityText.includes("Ronisens Inc.")}; support=${identityText.includes("support@visioner.cc")}`,
);

let reputationRows = [];
try {
  reputationRows = parseCsv(await readFile(reputationInput, "utf8")).filter(
    (row) => row.measured_at && row.source && row.status,
  );
} catch {
  reputationRows = [];
}
if (reputationRows.length) {
  const unresolved = reputationRows.filter((row) => !/^(pass|clear|clean|ok)$/i.test(row.status));
  record(
    "externalReputationEvidence",
    "External reputation checks",
    unresolved.length === 0,
    `${reputationRows.length} sources; ${unresolved.length} unresolved`,
  );
} else {
  record(
    "externalReputationEvidence",
    "External reputation checks",
    false,
    `No completed rows in ${path.relative(root, reputationInput)}`,
    false,
  );
}

const weights = scorecard.categories.trustReputation.criteria;
const criteria = {};
for (const [name, maximum] of Object.entries(weights)) {
  const group = checks.filter((check) => check.group === name);
  const measured = group.filter((check) => check.measured);
  const rate = measured.length
    ? measured.filter((check) => check.passed).length / measured.length
    : 0;
  criteria[name] = {
    score: Math.round(maximum * rate * 100) / 100,
    maximum,
    measured: measured.length > 0,
    passed: measured.filter((check) => check.passed).length,
    checks: group.length,
  };
}
const trustScore =
  Math.round(Object.values(criteria).reduce((sum, criterion) => sum + criterion.score, 0) * 100) /
  100;
const measuredMaximum = Object.values(criteria)
  .filter((criterion) => criterion.measured)
  .reduce((sum, criterion) => sum + criterion.maximum, 0);
const report = {
  generatedAt: new Date().toISOString(),
  reportDate,
  origin,
  trustScore,
  scoreMaximum: scorecard.categories.trustReputation.maximumScore,
  measuredMaximum,
  criteria,
  summary: {
    checks: checks.length,
    passed: checks.filter((check) => check.passed).length,
    failed: checks.filter((check) => check.measured && !check.passed).length,
    unmeasured: checks.filter((check) => !check.measured).length,
  },
  checks,
};

const criterionRows = Object.entries(criteria)
  .map(
    ([name, item]) =>
      `| ${name} | ${item.score.toFixed(2)} | ${item.maximum} | ${item.measured ? `${item.passed}/${item.checks}` : "Not measured"} |`,
  )
  .join("\n");
const checkRows = checks
  .map(
    (check) =>
      `| ${check.measured ? (check.passed ? "PASS" : "FAIL") : "UNMEASURED"} | ${check.group} | ${check.name} | ${check.evidence.replaceAll("|", "\\|")} |`,
  )
  .join("\n");
const markdown = `# Visioner Trust / Reputation Audit

- Generated: ${report.generatedAt}
- Score: **${trustScore}/${report.scoreMaximum}**
- Measured maximum: ${measuredMaximum}/${report.scoreMaximum}
- Passed checks: ${report.summary.passed}
- Failed checks: ${report.summary.failed}
- Unmeasured checks: ${report.summary.unmeasured}

## Scoring

| Criterion | Score | Maximum | Evidence |
| --- | ---: | ---: | --- |
${criterionRows}

## Checks

| Result | Group | Check | Evidence |
| --- | --- | --- | --- |
${checkRows}

External reputation services are manual evidence. Missing rows remain unmeasured and
do not become a fabricated clean result.
`;

await mkdir(outputDir, { recursive: true });
await Promise.all([
  writeFile(path.join(outputDir, "latest.json"), `${JSON.stringify(report, null, 2)}\n`),
  writeFile(path.join(outputDir, "latest.md"), markdown),
  writeFile(path.join(outputDir, `${reportDate}.json`), `${JSON.stringify(report, null, 2)}\n`),
  writeFile(path.join(outputDir, `${reportDate}.md`), markdown),
]);

console.log(`Trust / Reputation score: ${trustScore}/${report.scoreMaximum}`);
if (report.summary.failed > 0) process.exitCode = 1;
