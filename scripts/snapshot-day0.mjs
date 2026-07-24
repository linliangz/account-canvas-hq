import { copyFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const date = (process.env.BASELINE_DATE || new Date().toISOString().slice(0, 10)).trim();
const destination = path.join(root, "baselines", date);
const reports = [
  ["reports/seo/latest.json", "day-0-technical.json"],
  ["reports/seo/latest.md", "day-0-technical.md"],
  ["reports/trust/latest.json", "day-0-trust.json"],
  ["reports/trust/latest.md", "day-0-trust.md"],
  ["reports/scorecard/latest.json", "day-0-scorecard.json"],
  ["reports/scorecard/latest.md", "day-0-scorecard.md"],
];

await mkdir(destination, { recursive: true });
await Promise.all(
  reports.map(([source, filename]) =>
    copyFile(path.join(root, source), path.join(destination, filename)),
  ),
);
await writeFile(
  path.join(destination, "README.md"),
  `# Visioner Day 0 baseline — ${date}

Captured against the production website before this SEO/GEO release.

- Technical SEO: see \`day-0-technical.md\`
- Trust / Reputation: see \`day-0-trust.md\`
- 100-point composite: see \`day-0-scorecard.md\`
- GSC, Bing, GEO, and reputation CSV files are evidence workbooks; blank cells are
  intentionally unmeasured and must not be interpreted as zero.
`,
);

console.log(`Preserved the Day 0 reports in ${destination}.`);
