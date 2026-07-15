import { createSign } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const siteUrl = process.env.SEO_GSC_SITE_URL?.trim() || "sc-domain:visioner.cc";
const outputPath = process.env.SEO_REPORT_OUTPUT || "artifacts/seo-geo-performance.json";
const required = process.env.SEO_GSC_REQUIRED === "true";
const providedAccessToken = process.env.GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN?.trim();
const credentialsJson =
  process.env.GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON?.trim() ||
  readOptional(process.env.GOOGLE_APPLICATION_CREDENTIALS);

if (!providedAccessToken && !credentialsJson) {
  const message =
    "Search Console performance reporting is ready but not connected. Configure GitHub Workload Identity Federation or provide a local Search Console service-account credential.";
  console.log(message);
  if (process.env.GITHUB_ACTIONS === "true") {
    console.log(`::warning title=Search Console reporting inactive::${message}`);
  }
  appendSummary(`## Visioner SEO/GEO performance\n\n⚪ ${message}\n`);
  writeReport({
    status: "not_connected",
    generatedAt: new Date().toISOString(),
    property: siteUrl,
    message,
  });
  if (required) process.exit(1);
  process.exit(0);
}

let accessToken = providedAccessToken;
if (!accessToken) {
  let credentials;
  try {
    credentials = JSON.parse(credentialsJson);
  } catch {
    throw new Error("GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON must contain valid JSON.");
  }

  if (!credentials.client_email || !credentials.private_key) {
    throw new Error("Search Console service-account JSON is missing client_email or private_key.");
  }
  accessToken = await createAccessToken(credentials);
}
const ranges = completedRanges(28, 3);
const current = await fetchPeriod(accessToken, ranges.current);
const previous = await fetchPeriod(accessToken, ranges.previous);
const report = buildReport(current, previous, ranges);

writeReport(report);
const markdown = renderMarkdown(report);
console.log(markdown);
appendSummary(markdown);

async function createAccessToken(serviceAccount) {
  const tokenUri = serviceAccount.token_uri || "https://oauth2.googleapis.com/token";
  const issuedAt = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT", kid: serviceAccount.private_key_id };
  const claims = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: tokenUri,
    iat: issuedAt,
    exp: issuedAt + 3600,
  };
  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const assertion = `${unsigned}.${signer.sign(serviceAccount.private_key).toString("base64url")}`;
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion,
  });
  const response = await fetch(tokenUri, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  const payload = await response.json();
  if (!response.ok || !payload.access_token) {
    throw new Error(
      `Google OAuth failed (${response.status}): ${payload.error_description || payload.error}`,
    );
  }
  return payload.access_token;
}

async function fetchPeriod(accessToken, range) {
  const [totals, queries, pages] = await Promise.all([
    querySearchConsole(accessToken, range, []),
    querySearchConsole(accessToken, range, ["query"], 500),
    querySearchConsole(accessToken, range, ["page"], 500),
  ]);
  return {
    totals: metric(totals.rows?.[0]),
    queries: (queries.rows || []).map(row),
    pages: (pages.rows || []).map(row),
  };
}

async function querySearchConsole(accessToken, range, dimensions, rowLimit = 1) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      startDate: range.start,
      endDate: range.end,
      dimensions,
      type: "web",
      dataState: "final",
      rowLimit,
      aggregationType: dimensions.includes("page") ? "auto" : "byProperty",
    }),
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(
      `Search Console query failed (${response.status}): ${payload.error?.message || "Unknown error"}`,
    );
  }
  return payload;
}

function buildReport(current, previous, ranges) {
  const branded = aggregate(
    current.queries.filter((item) => /\bvisioner(?:\s+crm)?\b/i.test(item.key)),
  );
  const previousBranded = aggregate(
    previous.queries.filter((item) => /\bvisioner(?:\s+crm)?\b/i.test(item.key)),
  );
  const nonBranded = subtract(current.totals, branded);
  const previousNonBranded = subtract(previous.totals, previousBranded);
  return {
    status: "connected",
    generatedAt: new Date().toISOString(),
    property: siteUrl,
    ranges,
    totals: compareMetrics(current.totals, previous.totals),
    branded: compareMetrics(branded, previousBranded),
    nonBranded: compareMetrics(nonBranded, previousNonBranded),
    topQueries: current.queries.slice(0, 15),
    topPages: current.pages.slice(0, 15),
    opportunities: current.queries
      .filter((item) => item.impressions >= 5 && item.ctr < 0.03 && item.position <= 20)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 10),
  };
}

function writeReport(report) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
}

function renderMarkdown(report) {
  const metricLine = (label, value) =>
    `| ${label} | ${integer(value.current.clicks)} | ${integer(value.current.impressions)} | ${percent(value.current.ctr)} | ${decimal(value.current.position)} | ${delta(value.change.impressions)} |`;
  const topRows = report.topQueries
    .slice(0, 10)
    .map(
      (item) =>
        `| ${escapeCell(item.key)} | ${integer(item.clicks)} | ${integer(item.impressions)} | ${percent(item.ctr)} | ${decimal(item.position)} |`,
    )
    .join("\n");
  const pageRows = report.topPages
    .slice(0, 8)
    .map(
      (item) =>
        `| ${escapeCell(shortPage(item.key))} | ${integer(item.clicks)} | ${integer(item.impressions)} | ${percent(item.ctr)} | ${decimal(item.position)} |`,
    )
    .join("\n");
  const opportunityRows = report.opportunities.length
    ? report.opportunities
        .map(
          (item) =>
            `| ${escapeCell(item.key)} | ${integer(item.impressions)} | ${percent(item.ctr)} | ${decimal(item.position)} |`,
        )
        .join("\n")
    : "| No qualifying query yet | 0 | — | — |";

  return `## Visioner SEO/GEO performance

Search Console property: \`${report.property}\`  
Current period: ${report.ranges.current.start} to ${report.ranges.current.end}  
Comparison period: ${report.ranges.previous.start} to ${report.ranges.previous.end}

| Segment | Clicks | Impressions | CTR | Position | Impression change |
| --- | ---: | ---: | ---: | ---: | ---: |
${metricLine("All search", report.totals)}
${metricLine("Branded", report.branded)}
${metricLine("Non-branded", report.nonBranded)}

### Top queries
| Query | Clicks | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
${topRows || "| No Search Console data yet | 0 | 0 | — | — |"}

### Top landing pages
| Page | Clicks | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
${pageRows || "| No Search Console data yet | 0 | 0 | — | — |"}

### CTR opportunities
Queries with at least 5 impressions, position 20 or better, and CTR below 3%.

| Query | Impressions | CTR | Position |
| --- | ---: | ---: | ---: |
${opportunityRows}
`;
}

function completedRanges(days, lagDays) {
  const end = shiftUtc(new Date(), -lagDays);
  const currentStart = shiftUtc(end, -(days - 1));
  const previousEnd = shiftUtc(currentStart, -1);
  const previousStart = shiftUtc(previousEnd, -(days - 1));
  return {
    current: { start: isoDate(currentStart), end: isoDate(end) },
    previous: { start: isoDate(previousStart), end: isoDate(previousEnd) },
  };
}

function row(item) {
  return { key: item.keys?.[0] || "", ...metric(item) };
}

function metric(item = {}) {
  return {
    clicks: Number(item.clicks || 0),
    impressions: Number(item.impressions || 0),
    ctr: Number(item.ctr || 0),
    position: Number(item.position || 0),
  };
}

function aggregate(items) {
  const clicks = items.reduce((sum, item) => sum + item.clicks, 0);
  const impressions = items.reduce((sum, item) => sum + item.impressions, 0);
  const weightedPosition = items.reduce((sum, item) => sum + item.position * item.impressions, 0);
  return {
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : 0,
    position: impressions ? weightedPosition / impressions : 0,
  };
}

function subtract(total, subset) {
  const clicks = Math.max(0, total.clicks - subset.clicks);
  const impressions = Math.max(0, total.impressions - subset.impressions);
  return {
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : 0,
    position: total.position,
  };
}

function compareMetrics(current, previous) {
  return {
    current,
    previous,
    change: {
      clicks: relativeChange(current.clicks, previous.clicks),
      impressions: relativeChange(current.impressions, previous.impressions),
      ctr: relativeChange(current.ctr, previous.ctr),
      position: current.position - previous.position,
    },
  };
}

function relativeChange(current, previous) {
  if (!previous) return current ? null : 0;
  return (current - previous) / previous;
}

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

function shiftUtc(date, days) {
  const shifted = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  shifted.setUTCDate(shifted.getUTCDate() + days);
  return shifted;
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function integer(value) {
  return Math.round(value).toLocaleString("en-US");
}

function decimal(value) {
  return value ? value.toFixed(1) : "—";
}

function percent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function delta(value) {
  if (value === null) return "New";
  const sign = value > 0 ? "+" : "";
  return `${sign}${(value * 100).toFixed(1)}%`;
}

function shortPage(value) {
  try {
    const url = new URL(value);
    return url.pathname || "/";
  } catch {
    return value;
  }
}

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

function readOptional(path) {
  if (!path) return "";
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}

function appendSummary(markdown) {
  const path = process.env.GITHUB_STEP_SUMMARY;
  if (!path) return;
  writeFileSync(path, `${markdown}\n`, { flag: "a" });
}
