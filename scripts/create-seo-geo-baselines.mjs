import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { csvEscape } from "./lib/csv.mjs";

const root = process.cwd();
const config = JSON.parse(
  await readFile(path.join(root, "config", "seo-geo-targets.json"), "utf8"),
);
const day = (process.env.BASELINE_DATE || new Date().toISOString().slice(0, 10)).trim();
const outputDir = path.join(root, "baselines", day);
const templatesDir = path.join(root, "docs", "templates");

await mkdir(outputDir, { recursive: true });

for (const name of ["gsc-baseline.csv", "bing-baseline.csv", "reputation-baseline.csv"]) {
  const source = await readFile(path.join(templatesDir, name), "utf8");
  await writeFile(path.join(outputDir, name), source);
}

const headers = [
  "measured_at",
  "engine",
  "model",
  "prompt_id",
  "run",
  "prompt",
  "expected_landing_page",
  "mentioned",
  "cited",
  "linked",
  "positioning_accuracy",
  "landing_page_fit",
  "cited_url",
  "competitors",
  "unsupported_claim",
  "response_url",
  "screenshot_path",
  "notes",
];
const rows = [];
for (const prompt of config.geoPrompts) {
  for (const engine of config.geoEngines) {
    for (let run = 1; run <= config.benchmarkRunsPerPrompt; run += 1) {
      rows.push([
        "",
        engine,
        "",
        prompt.id,
        run,
        prompt.prompt,
        prompt.expectedLandingPage,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]);
    }
  }
}

const geoCsv = [headers.join(","), ...rows.map((row) => row.map(csvEscape).join(",")), ""].join(
  "\n",
);
await Promise.all([
  writeFile(path.join(outputDir, "geo-benchmark.csv"), geoCsv),
  writeFile(path.join(templatesDir, "geo-benchmark.csv"), geoCsv),
]);

console.log(
  `Created ${outputDir} with ${config.geoPrompts.length} prompts × ${config.geoEngines.length} engines × ${config.benchmarkRunsPerPrompt} runs.`,
);
