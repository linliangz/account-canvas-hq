import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { parseCsv } from "./lib/csv.mjs";

const root = process.cwd();
const inputPath = process.argv[2] || path.join(root, "docs", "templates", "geo-benchmark.csv");
const outputDir = path.join(root, "reports", "geo");
const now = new Date();
const dateStamp = now.toISOString().slice(0, 10);

const asBool = (value) => /^(1|true|yes|y)$/i.test(String(value || "").trim());
const asScore = (value) => {
  const score = Number(value);
  return Number.isFinite(score) ? Math.max(0, Math.min(1, score)) : 0;
};

const raw = await readFile(inputPath, "utf8");
const rows = parseCsv(raw).filter(
  (row) => row.measured_at && row.engine && row.prompt_id && row.run,
);

if (rows.length === 0) {
  console.error("No completed GEO benchmark rows found. Fill the CSV template, then rerun.");
  process.exit(2);
}

const totals = rows.reduce(
  (acc, row) => {
    acc.mentions += Number(asBool(row.mentioned));
    acc.citations += Number(asBool(row.cited));
    acc.links += Number(asBool(row.linked));
    acc.positioning += asScore(row.positioning_accuracy);
    acc.landingFit += asScore(row.landing_page_fit);
    return acc;
  },
  { mentions: 0, citations: 0, links: 0, positioning: 0, landingFit: 0 },
);

const count = rows.length;
const rates = {
  mentionRate: totals.mentions / count,
  citationRate: totals.citations / count,
  linkedCitationRate: totals.links / count,
  positioningAccuracy: totals.positioning / count,
  landingPageFit: totals.landingFit / count,
};
const score = Math.round(
  rates.mentionRate * 8 +
    rates.citationRate * 8 +
    rates.linkedCitationRate * 5 +
    rates.positioningAccuracy * 4 +
    rates.landingPageFit * 5,
);

const engines = [...new Set(rows.map((row) => row.engine))].sort().map((engine) => {
  const subset = rows.filter((row) => row.engine === engine);
  const metric = (key, parser = asBool) =>
    subset.reduce((sum, row) => sum + Number(parser(row[key])), 0) / subset.length;
  return {
    engine,
    runs: subset.length,
    mentionRate: metric("mentioned"),
    citationRate: metric("cited"),
    linkedCitationRate: metric("linked"),
    positioningAccuracy: metric("positioning_accuracy", asScore),
    landingPageFit: metric("landing_page_fit", asScore),
  };
});

const percent = (value) => `${Math.round(value * 100)}%`;
const report = {
  generatedAt: now.toISOString(),
  input: path.relative(root, inputPath),
  score,
  scoreMaximum: 30,
  runs: count,
  rates,
  engines,
  rows,
};

const engineRows = engines
  .map(
    (item) =>
      `| ${item.engine} | ${item.runs} | ${percent(item.mentionRate)} | ${percent(item.citationRate)} | ${percent(item.linkedCitationRate)} | ${percent(item.positioningAccuracy)} | ${percent(item.landingPageFit)} |`,
  )
  .join("\n");

const markdown = `# Visioner GEO Benchmark

- Generated: ${report.generatedAt}
- Evidence rows: ${count}
- GEO score: **${score}/30**
- Mention rate: ${percent(rates.mentionRate)}
- Citation rate: ${percent(rates.citationRate)}
- Linked citation rate: ${percent(rates.linkedCitationRate)}
- Positioning accuracy: ${percent(rates.positioningAccuracy)}
- Landing-page fit: ${percent(rates.landingPageFit)}

## By Engine

| Engine | Runs | Mention | Citation | Linked | Positioning | Landing fit |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
${engineRows}

## Method

Run every fixed prompt three times per engine in a clean session. Record only visible evidence. A brand mention without a supporting source is not a citation; a citation without a clickable Visioner URL is not a linked citation. Positioning accuracy and landing-page fit use values from 0 to 1.
`;

await mkdir(outputDir, { recursive: true });
await Promise.all([
  writeFile(path.join(outputDir, "latest.json"), JSON.stringify(report, null, 2) + "\n"),
  writeFile(path.join(outputDir, "latest.md"), markdown),
  writeFile(path.join(outputDir, `${dateStamp}.json`), JSON.stringify(report, null, 2) + "\n"),
  writeFile(path.join(outputDir, `${dateStamp}.md`), markdown),
]);

console.log(`GEO score: ${score}/30 from ${count} evidence rows`);
