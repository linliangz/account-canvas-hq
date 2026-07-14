import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const roadmapPath = process.env.SEO_ROADMAP_PATH || "docs/seo-geo-90-day-roadmap.csv";
const scorecardPath = process.env.SEO_SCORECARD_PATH || "docs/seo-geo-weekly-scorecard.csv";
const liveAuditPath = process.env.SEO_LIVE_AUDIT_PATH || "artifacts/seo-live-audit.json";
const searchPath = process.env.SEO_SEARCH_REPORT_PATH || "artifacts/seo-geo-performance.json";
const growthPath = process.env.SEO_GROWTH_REPORT_PATH || "artifacts/growth-performance.json";
const outputJson = process.env.SEO_WEEKLY_BRIEF_OUTPUT || "artifacts/seo-geo-weekly-brief.json";
const outputMarkdown = process.env.SEO_WEEKLY_BRIEF_MARKDOWN || "artifacts/seo-geo-weekly-brief.md";
const now = new Date(process.env.SEO_BRIEF_DATE || Date.now());

const roadmap = parseCsv(readFileSync(roadmapPath, "utf8"));
const scorecard = parseCsv(readFileSync(scorecardPath, "utf8"));
const sprint = selectSprint(roadmap, scorecard, now);
const liveAudit = readJson(liveAuditPath);
const search = readJson(searchPath);
const growth = readJson(growthPath);
const report = buildReport({ sprint, liveAudit, search, growth, now });
const markdown = renderMarkdown(report);

writeFile(outputJson, `${JSON.stringify(report, null, 2)}\n`);
writeFile(outputMarkdown, markdown);
console.log(markdown);
appendSummary(markdown);

function buildReport({ sprint, liveAudit, search, growth, now }) {
  return {
    generatedAt: now.toISOString(),
    isoWeek: isoWeek(now),
    sprint,
    readiness: {
      liveSeo: status(
        liveAudit?.status === "passed",
        liveAudit ? `${liveAudit.checksPassed || 0} checks passed` : "Live audit artifact missing",
      ),
      searchConsole: status(
        search?.status === "connected",
        search?.status === "connected"
          ? `${integer(search.totals?.current?.impressions)} impressions in the current period`
          : "Manual setup required: verify Search Console and add its read-only service account secret",
      ),
      productAttribution: status(
        growth?.ok === true,
        growth?.ok === true
          ? `${integer(growth.totals?.signups)} signups and ${integer(growth.totals?.activated)} activated workspaces`
          : "Connect the aggregate Founder Ops token to include signup-to-paid evidence",
      ),
    },
    metrics:
      search?.status === "connected"
        ? {
            nonBrandImpressions: Number(search.nonBranded?.current?.impressions || 0),
            nonBrandClicks: Number(search.nonBranded?.current?.clicks || 0),
            topQuery: search.topQueries?.[0]?.key || "No query yet",
            topPage: search.topPages?.[0]?.key || "No page yet",
          }
        : null,
    acquisition:
      growth?.ok === true
        ? {
            signups: Number(growth.totals?.signups || 0),
            activated: Number(growth.totals?.activated || 0),
            paid: Number(growth.totals?.paid || 0),
          }
        : null,
  };
}

function renderMarkdown(report) {
  const { sprint, readiness, metrics, acquisition } = report;
  const measurement = metrics
    ? `| Non-brand impressions | ${integer(metrics.nonBrandImpressions)} |\n| Non-brand clicks | ${integer(metrics.nonBrandClicks)} |\n| Top query | ${cell(metrics.topQuery)} |\n| Top landing page | ${cell(shortUrl(metrics.topPage))} |`
    : "| Search metrics | Manual setup required; do not enter zeroes in the scorecard |";
  const product = acquisition
    ? `| Signups | ${integer(acquisition.signups)} |\n| Activated workspaces | ${integer(acquisition.activated)} |\n| Paid | ${integer(acquisition.paid)} |`
    : "| Product acquisition | Admin aggregate reporting is not connected |";

  return `# Visioner SEO/GEO weekly operating brief — ${report.isoWeek}

Generated ${report.generatedAt.slice(0, 10)}. This brief reports missing evidence as missing; it never substitutes zero for an unconnected source.

## Evidence readiness

| Source | State | Evidence |
| --- | --- | --- |
${readinessRow("Live technical SEO", readiness.liveSeo)}
${readinessRow("Google Search Console", readiness.searchConsole)}
${readinessRow("Signup-to-paid attribution", readiness.productAttribution)}

## This week's focus

**Week ${sprint.week}: ${sprint.primary_goal}**  
Canonical page: ${markdownLink(sprint.canonical_page)}  
Current roadmap state: ${sprint.status}

- Product evidence: ${sprint.product_evidence}
- Distribution: ${sprint.distribution}
- Measurement: ${sprint.measurement}
- Owner: ${sprint.owner}

## Current evidence

| Search | Value |
| --- | --- |
${measurement}

| Product | Value |
| --- | ---: |
${product}

## Execution checklist

- [ ] Complete any manual setup shown above before interpreting missing metrics.
- [ ] Improve the canonical page with the named first-hand product evidence; do not create a near-duplicate keyword page.
- [ ] Verify title, direct answer, internal links, current screenshot, structured data, mobile layout, and one clear signup CTA.
- [ ] Complete the planned distribution using tracked links from the growth artifact.
- [ ] Ask one practicing KAM for specific feedback and record approved evidence or objections.
- [ ] Add one dated row to \`docs/seo-geo-weekly-scorecard.csv\` only after real metrics are available.
- [ ] Record links and choose one decision: keep, improve snippet, strengthen evidence, consolidate, or retire.

## GEO discipline

- Keep product facts consistent across the canonical page, pricing, \`llms.txt\`, and \`llms-full.txt\`.
- Prefer direct answers, named limitations, dated screenshots, and original practitioner evidence over generic AI copy.
- Run the fixed neutral prompt set monthly; record citations and factual errors in \`docs/geo-answer-monitoring.csv\`.
`;
}

function selectSprint(roadmap, scorecard, date) {
  if (!roadmap.length) throw new Error("SEO roadmap has no rows.");
  const baseline = scorecard[0]?.week_start
    ? startOfIsoWeek(new Date(`${scorecard[0].week_start}T00:00:00Z`))
    : startOfIsoWeek(date);
  const elapsed = Math.max(0, Math.floor((startOfIsoWeek(date) - baseline) / 604800000));
  return roadmap[Math.min(elapsed, roadmap.length - 1)];
}

function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') quoted = false;
      else field += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      if (row.some((value) => value.length)) rows.push(row);
      row = [];
      field = "";
    } else field += character;
  }
  if (field.length || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  const [headers, ...values] = rows;
  return values.map((columns) =>
    Object.fromEntries(headers.map((header, index) => [header, columns[index] || ""])),
  );
}

function startOfIsoWeek(date) {
  const result = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = result.getUTCDay() || 7;
  result.setUTCDate(result.getUTCDate() - day + 1);
  return result;
}

function isoWeek(date) {
  const current = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = current.getUTCDay() || 7;
  current.setUTCDate(current.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(current.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((current - yearStart) / 86400000 + 1) / 7);
  return `${current.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function status(ready, detail) {
  return { state: ready ? "ready" : "manual_setup_required", detail };
}

function readinessRow(label, value) {
  return `| ${label} | ${value.state === "ready" ? "Ready" : "Manual setup required"} | ${cell(value.detail)} |`;
}

function markdownLink(value) {
  return value?.startsWith("http") ? `[${value}](${value})` : value || "Not assigned";
}

function shortUrl(value) {
  try {
    return new URL(value).pathname || "/";
  } catch {
    return value;
  }
}

function cell(value) {
  return String(value || "-")
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");
}

function integer(value) {
  return Math.round(Number(value || 0)).toLocaleString("en-US");
}

function readJson(path) {
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8"));
}

function writeFile(path, contents) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents);
}

function appendSummary(markdown) {
  const path = process.env.GITHUB_STEP_SUMMARY;
  if (!path) return;
  writeFileSync(path, `${markdown}\n`, { flag: "a" });
}
