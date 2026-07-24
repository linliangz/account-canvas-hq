import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { parseCsv } from "./lib/csv.mjs";

const root = process.cwd();
const now = new Date();
const reportDate = (process.env.REPORT_DATE || now.toISOString().slice(0, 10)).trim();
const outputDir = path.join(root, "reports", "scorecard");
const scorecard = await readJson("config/seo-geo-scorecard.json");
const targets = await readJson("config/seo-geo-targets.json");
const technical = await readJson("reports/seo/latest.json");
const trust = await readJson("reports/trust/latest.json");
const geo = await readJson("reports/geo/latest.json", false);
const searchConsole = await readJson("artifacts/seo-geo-performance.json", false);
const baselineDir = process.env.BASELINE_DIR || path.join("baselines", reportDate);
const gscRow = await latestCsvRow(path.join(baselineDir, "gsc-baseline.csv"));
const bingRow = await latestCsvRow(path.join(baselineDir, "bing-baseline.csv"));
const organic = buildOrganicScore({ gscRow, bingRow, searchConsole, scorecard, targets });

const categories = {
  technicalSeo: category(
    "Technical SEO",
    technical?.technicalScore,
    scorecard.categories.technicalSeo.maximumScore,
    technical ? scorecard.categories.technicalSeo.maximumScore : 0,
    technical ? "measured" : "unmeasured",
    "Live technical audit",
  ),
  organicSearch: category(
    "Organic Search",
    organic.score,
    scorecard.categories.organicSearch.maximumScore,
    organic.measuredMaximum,
    organic.measuredMaximum === scorecard.categories.organicSearch.maximumScore
      ? "measured"
      : "partial",
    organic.evidence,
    organic.criteria,
  ),
  geo: category(
    "GEO",
    geo?.score,
    scorecard.categories.geo.maximumScore,
    geo ? scorecard.categories.geo.maximumScore : 0,
    geo ? "measured" : "unmeasured",
    geo ? `${geo.runs} completed answer-engine runs` : "No completed GEO benchmark rows",
  ),
  trustReputation: category(
    "Trust / Reputation",
    trust?.trustScore,
    scorecard.categories.trustReputation.maximumScore,
    trust?.measuredMaximum || 0,
    trust?.measuredMaximum === scorecard.categories.trustReputation.maximumScore
      ? "measured"
      : trust
        ? "partial"
        : "unmeasured",
    trust
      ? `${trust.summary.passed} passed; ${trust.summary.failed} failed; ${trust.summary.unmeasured} unmeasured`
      : "Trust audit missing",
  ),
};

const verifiedScore = round(Object.values(categories).reduce((sum, item) => sum + item.score, 0));
const measuredMaximum = round(
  Object.values(categories).reduce((sum, item) => sum + item.measuredMaximum, 0),
);
const report = {
  generatedAt: now.toISOString(),
  reportDate,
  methodologyVersion: scorecard.version,
  verifiedScore,
  maximumScore: scorecard.maximumScore,
  measuredMaximum,
  measurementCoverage: round(measuredMaximum / scorecard.maximumScore),
  normalizedMeasuredScore: measuredMaximum ? round((verifiedScore / measuredMaximum) * 100) : 0,
  interpretation:
    "verifiedScore is a conservative lower bound. Unmeasured evidence earns no points but is reported separately; normalizedMeasuredScore compares only measured criteria.",
  categories,
  missingEvidence: missingEvidence(categories, organic),
};

const categoryRows = Object.values(categories)
  .map(
    (item) =>
      `| ${item.label} | ${item.score.toFixed(2)} | ${item.maximum} | ${item.measuredMaximum} | ${item.status} | ${item.evidence.replaceAll("|", "\\|")} |`,
  )
  .join("\n");
const missingRows = report.missingEvidence.map((item) => `- ${item}`).join("\n");
const organicRows = Object.entries(organic.criteria)
  .map(
    ([name, item]) =>
      `| ${name} | ${item.score.toFixed(2)} | ${item.maximum} | ${item.measured ? item.evidence : "Not measured"} |`,
  )
  .join("\n");
const markdown = `# Visioner SEO / GEO 100-point Scorecard

- Generated: ${report.generatedAt}
- Verified lower-bound score: **${verifiedScore}/${report.maximumScore}**
- Measured evidence: **${measuredMaximum}/${report.maximumScore} points**
- Score across measured criteria: **${report.normalizedMeasuredScore}/100**
- Measurement coverage: **${Math.round(report.measurementCoverage * 100)}%**

The lower-bound score never treats missing Search Console, Bing, reputation, or
answer-engine evidence as a positive result. Use the measured-criteria score to judge
site quality, and measurement coverage to judge whether the operating system is complete.

## Categories

| Category | Score | Maximum | Measured maximum | Status | Evidence |
| --- | ---: | ---: | ---: | --- | --- |
${categoryRows}

## Organic Search detail

| Criterion | Score | Maximum | Evidence |
| --- | ---: | ---: | --- |
${organicRows}

## Evidence still required

${missingRows || "- None"}

## Fixed cadence

- Weekly: technical, trust, Search Console, Bing baseline, and 100-point score.
- Monthly: ${targets.geoPrompts.length} fixed prompts × ${targets.geoEngines.length} engines × ${targets.benchmarkRunsPerPrompt} clean-session runs.
- Quarterly: consolidate or retire pages with no impressions, useful citations, links, or qualified conversions.
`;

await mkdir(outputDir, { recursive: true });
await Promise.all([
  writeFile(path.join(outputDir, "latest.json"), `${JSON.stringify(report, null, 2)}\n`),
  writeFile(path.join(outputDir, "latest.md"), markdown),
  writeFile(path.join(outputDir, `${reportDate}.json`), `${JSON.stringify(report, null, 2)}\n`),
  writeFile(path.join(outputDir, `${reportDate}.md`), markdown),
]);

console.log(
  `SEO / GEO verified score: ${verifiedScore}/${report.maximumScore}; measured ${measuredMaximum}/${report.maximumScore}`,
);

function buildOrganicScore({ gscRow, bingRow, searchConsole, scorecard, targets }) {
  const weights = scorecard.categories.organicSearch.criteria;
  const thresholds = scorecard.day90Thresholds;
  const gscConnected = searchConsole?.status === "connected" || Boolean(gscRow);
  const bingConnected = Boolean(bingRow);
  const gsc = gscRow || {};
  const api = searchConsole?.status === "connected" ? searchConsole : null;
  const targetQueries = targets.targetQueries || targets.targets || [];
  const priorityMatches = api
    ? new Set(
        (api.topQueries || [])
          .filter((row) =>
            targetQueries.some(
              (target) => target.query.toLowerCase() === String(row.key || "").toLowerCase(),
            ),
          )
          .map((row) => String(row.key).toLowerCase()),
      ).size
    : number(gsc.priority_queries_with_impressions);
  const submitted = number(gsc.submitted_urls);
  const indexed = number(gsc.indexed_urls);
  const nonBrandImpressions = api
    ? number(api.nonBranded?.current?.impressions)
    : number(gsc.nonbrand_impressions);
  const organicClicks = api
    ? number(api.nonBranded?.current?.clicks)
    : number(gsc.nonbrand_clicks || gsc.organic_clicks);
  const signupStarts = number(gsc.organic_signup_starts);
  const signupCompletions = number(gsc.organic_signup_completions);

  const definitions = {
    measurementConnection: {
      maximum: weights.measurementConnection,
      measured: true,
      rate: (Number(gscConnected) * 2 + Number(bingConnected)) / 3,
      evidence: `GSC=${gscConnected ? "connected" : "missing"}; Bing=${bingConnected ? "connected" : "missing"}`,
    },
    indexCoverage: {
      maximum: weights.indexCoverage,
      measured: submitted > 0,
      rate: submitted ? Math.min(1, indexed / submitted / thresholds.indexCoverage) : 0,
      evidence: submitted
        ? `${indexed}/${submitted} canonical URLs indexed`
        : "Index coverage not supplied",
    },
    priorityQueryCoverage: {
      maximum: weights.priorityQueryCoverage,
      measured: gscConnected,
      rate: Math.min(1, priorityMatches / thresholds.priorityQueriesWithImpressions),
      evidence: `${priorityMatches}/${thresholds.priorityQueriesWithImpressions} priority queries with impressions`,
    },
    nonBrandVisibility: {
      maximum: weights.nonBrandVisibility,
      measured: gscConnected,
      rate: Math.min(1, nonBrandImpressions / thresholds.nonBrandImpressions28d),
      evidence: `${nonBrandImpressions}/${thresholds.nonBrandImpressions28d} non-brand impressions in 28 days`,
    },
    qualifiedOrganicTraffic: {
      maximum: weights.qualifiedOrganicTraffic,
      measured: gscConnected,
      rate: Math.min(1, organicClicks / thresholds.qualifiedOrganicClicks28d),
      evidence: `${organicClicks}/${thresholds.qualifiedOrganicClicks28d} non-brand clicks in 28 days`,
    },
    organicConversion: {
      maximum: weights.organicConversion,
      measured: Boolean(gsc.measured_at) && (signupStarts > 0 || signupCompletions > 0),
      rate: Math.min(1, signupCompletions / thresholds.organicSignupCompletions28d),
      evidence: `${signupCompletions}/${thresholds.organicSignupCompletions28d} completed organic signups; ${signupStarts} starts`,
    },
  };

  let measuredMaximum = 0;
  let score = 0;
  for (const item of Object.values(definitions)) {
    item.rate = round(Math.max(0, Math.min(1, item.rate)));
    item.score = item.measured ? round(item.maximum * item.rate) : 0;
    if (item.measured) measuredMaximum += item.maximum;
    score += item.score;
  }
  return {
    score: round(score),
    measuredMaximum: round(measuredMaximum),
    criteria: definitions,
    evidence: `GSC=${gscConnected ? "ready" : "missing"}; Bing=${bingConnected ? "ready" : "missing"}`,
  };
}

function category(label, score, maximum, measuredMaximum, status, evidence, criteria) {
  return {
    label,
    score: round(number(score)),
    maximum,
    measuredMaximum: round(number(measuredMaximum)),
    status,
    evidence,
    ...(criteria ? { criteria } : {}),
  };
}

function missingEvidence(categories, organic) {
  const missing = [];
  if (categories.technicalSeo.status === "unmeasured")
    missing.push("Run the live technical audit.");
  if (!organic.criteria.indexCoverage.measured)
    missing.push("Export GSC indexed/submitted URL coverage into the GSC baseline CSV.");
  if (!organic.criteria.measurementConnection.evidence.includes("Bing=connected"))
    missing.push("Verify Bing Webmaster Tools and complete the Bing baseline CSV.");
  if (!organic.criteria.organicConversion.measured)
    missing.push("Add organic signup starts and completions from privacy-safe attribution.");
  if (categories.geo.status === "unmeasured")
    missing.push("Complete the fixed GEO benchmark rows with response and citation evidence.");
  if (categories.trustReputation.status !== "measured")
    missing.push(
      "Record Google/Bing security and third-party reputation checks in the reputation CSV.",
    );
  return missing;
}

async function latestCsvRow(relativePath) {
  try {
    const rows = parseCsv(await readFile(path.join(root, relativePath), "utf8")).filter(
      (row) => row.measured_at,
    );
    return rows.at(-1) || null;
  } catch {
    return null;
  }
}

async function readJson(relativePath, required = true) {
  const absolute = path.join(root, relativePath);
  try {
    await access(absolute);
    return JSON.parse(await readFile(absolute, "utf8"));
  } catch (error) {
    if (required)
      throw new Error(`Required report missing or invalid: ${relativePath}`, { cause: error });
    return null;
  }
}

function number(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function round(value, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}
