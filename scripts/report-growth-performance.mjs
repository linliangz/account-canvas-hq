import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const appUrl = (process.env.VISIONER_APP_URL || "https://app.visioner.cc").replace(/\/$/, "");
const jsonOutput = process.env.GROWTH_REPORT_OUTPUT || "artifacts/growth-performance.json";
const markdownOutput = process.env.GROWTH_REPORT_MARKDOWN || "artifacts/growth-performance.md";
const required = process.env.VISIONER_GROWTH_REQUIRED === "true";
const token = (
  process.env.VISIONER_ADMIN_TOKEN?.trim() || readOptional(process.env.VISIONER_ADMIN_TOKEN_FILE)
).trim();

if (!token) {
  const message =
    "Visioner product activation reporting is ready but not connected. Add the website repository secret VISIONER_ADMIN_TOKEN to include privacy-safe 28-day signup, first-Account, and paid conversion data in this sprint.";
  const markdown = `## Product acquisition baseline\n\n⚪ ${message}\n`;
  writeMarkdown(markdown);
  writeJson({
    ok: false,
    status: "not_connected",
    generatedAt: new Date().toISOString(),
    message,
  });
  console.log(markdown);
  appendSummary(markdown);
  if (required) process.exit(1);
  process.exit(0);
}

const response = await fetch(`${appUrl}/api/admin/growth-performance`, {
  headers: { accept: "application/json", authorization: `Bearer ${token}` },
});
const report = await response.json();
if (!response.ok || !report.ok) {
  throw new Error(
    `Visioner growth report failed (${response.status}): ${report.message || "Unknown error"}`,
  );
}

writeJson(report);
const markdown = renderMarkdown(report);
writeMarkdown(markdown);
console.log(markdown);
appendSummary(markdown);

function renderMarkdown(report) {
  const totals = report.totals || { signups: 0, activated: 0, paid: 0 };
  const activationRate = percentage(totals.activated, totals.signups);
  const paidRate = percentage(totals.paid, totals.signups);
  const rows = (report.acquisition || [])
    .slice(0, 10)
    .map(
      (row) =>
        `| ${cell(row.source)} | ${cell(row.campaign)} | ${cell(row.landingPath)} | ${integer(row.signups)} | ${integer(row.activated)} | ${integer(row.paid)} |`,
    )
    .join("\n");
  return `## Product acquisition baseline

Rolling ${report.windowDays || 28} days · generated ${new Date(report.generatedAt).toISOString().slice(0, 10)}

| Signups | First Account | Activation rate | Paid | Signup-to-paid |
| ---: | ---: | ---: | ---: | ---: |
| ${integer(totals.signups)} | ${integer(totals.activated)} | ${activationRate} | ${integer(totals.paid)} | ${paidRate} |

| Source | Campaign | Landing page | Signups | First Account | Paid |
| --- | --- | --- | ---: | ---: | ---: |
${rows || "| No attributed customer signups yet | — | — | 0 | 0 | 0 |"}

Privacy boundary: aggregate acquisition counts only; no customer identity or workspace content.
`;
}

function percentage(value, total) {
  return total ? `${((Number(value || 0) / Number(total)) * 100).toFixed(1)}%` : "—";
}

function integer(value) {
  return Math.round(Number(value || 0)).toLocaleString("en-US");
}

function cell(value) {
  return String(value || "-")
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");
}

function readOptional(path) {
  if (!path || !existsSync(path)) return "";
  return readFileSync(path, "utf8");
}

function writeMarkdown(markdown) {
  mkdirSync(dirname(markdownOutput), { recursive: true });
  writeFileSync(markdownOutput, markdown);
}

function writeJson(report) {
  mkdirSync(dirname(jsonOutput), { recursive: true });
  writeFileSync(jsonOutput, `${JSON.stringify(report, null, 2)}\n`);
}

function appendSummary(markdown) {
  const path = process.env.GITHUB_STEP_SUMMARY;
  if (!path) return;
  writeFileSync(path, `${markdown}\n`, { flag: "a" });
}
