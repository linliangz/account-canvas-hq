import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const roadmap = readFileSync("docs/seo-geo-90-day-roadmap.csv", "utf8");
const scorecard = readFileSync("docs/seo-geo-weekly-scorecard.csv", "utf8");
const markdownOutput = process.env.GROWTH_LINKS_MARKDOWN || "artifacts/growth-links.md";
const jsonOutput = process.env.GROWTH_LINKS_OUTPUT || "artifacts/growth-links.json";
const now = new Date(process.env.GROWTH_LINKS_DATE || Date.now());
const sprint = isoSprint(now);
const roadmapWeek = selectedRoadmapWeek(now);
const row = parseCsv(roadmap).find((entry) => Number(entry.week) === roadmapWeek);
if (!row) throw new Error(`No SEO/GEO roadmap row exists for week ${roadmapWeek}.`);

const campaign = `seo_geo_${sprint.toLowerCase().replace("-", "_")}`;
const links = [
  tracked("LinkedIn — practical KAM insight", "linkedin", "social", "founder_insight"),
  tracked("LinkedIn — product workflow", "linkedin", "social", "product_workflow"),
  tracked("KAM or sales community answer", "kam_community", "referral", "helpful_answer"),
  tracked("Practicing KAM review request", "kam_review", "outreach", "practitioner_review"),
];

const report = {
  generatedAt: now.toISOString(),
  sprint,
  roadmapWeek,
  campaign,
  primaryGoal: row.primary_goal,
  canonicalPage: row.canonical_page,
  productEvidence: row.product_evidence,
  distribution: row.distribution,
  measurement: row.measurement,
  links,
  privacyBoundary: "Campaign metadata only; never add names, email addresses, or account data.",
};

mkdirSync(dirname(markdownOutput), { recursive: true });
mkdirSync(dirname(jsonOutput), { recursive: true });
writeFileSync(jsonOutput, `${JSON.stringify(report, null, 2)}\n`);
const markdown = renderMarkdown(report);
writeFileSync(markdownOutput, markdown);
console.log(markdown);

function tracked(label, source, medium, content) {
  const url = new URL(row.canonical_page);
  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", campaign);
  url.searchParams.set("utm_content", content);
  return { label, source, medium, content, url: url.toString() };
}

function selectedRoadmapWeek(date) {
  const explicit = Number(process.env.VISIONER_GROWTH_ROADMAP_WEEK || 0);
  if (explicit >= 1 && explicit <= 12) return explicit;
  const firstDataRow = scorecard.split(/\r?\n/).find((line, index) => index > 0 && line.trim());
  const start = firstDataRow?.split(",")[0];
  const startDate = start ? new Date(`${start}T00:00:00Z`) : date;
  const elapsed = Math.max(0, date.getTime() - startDate.getTime());
  return Math.min(12, Math.floor(elapsed / 604_800_000) + 1);
}

function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  const normalized = source.replace(/^\uFEFF/, "");
  for (let index = 0; index < normalized.length; index += 1) {
    const character = normalized[index];
    if (quoted) {
      if (character === '"' && normalized[index + 1] === '"') {
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

function isoSprint(date) {
  const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((utc.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${utc.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function renderMarkdown(report) {
  const rows = report.links.map((link) => `| ${link.label} | \`${link.url}\` |`).join("\n");
  return `## Tracked distribution links

${report.sprint} · roadmap week ${report.roadmapWeek}: **${report.primaryGoal}**

Canonical page: ${report.canonicalPage}

### This week's execution brief

- **Evidence to add:** ${report.productEvidence}
- **Distribution commitment:** ${report.distribution}
- **Measurement:** ${report.measurement}

Use these four angles:

1. **Practical KAM insight:** explain the operating problem in your own experience; include one concrete lesson and one limitation. Link only if the page helps the reader continue.
2. **Product workflow:** show the evidence above as a before → action → outcome workflow. Do not invent customer results.
3. **Community contribution:** answer a real question first. Do not lead with Visioner or paste promotional copy.
4. **Practitioner review:** ask one KAM to challenge the workflow. Record objections; request permission before quoting anyone.

| Channel | Use this URL |
| --- | --- |
${rows}

Use the matching URL in each channel. Do not remove its UTM parameters and never add customer identity to a URL.

### Seven-day evidence

- [ ] LinkedIn insight URL and impressions:
- [ ] LinkedIn workflow URL and impressions:
- [ ] Community contribution URL and useful replies:
- [ ] KAM review completed; objection recorded privately:
- [ ] Attributed visits, signups, and first Accounts:
- [ ] Decision: keep, strengthen evidence, revise snippet, consolidate, or retire:
`;
}
