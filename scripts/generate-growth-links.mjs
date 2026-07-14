import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const roadmap = readFileSync("docs/seo-geo-90-day-roadmap.csv", "utf8");
const scorecard = readFileSync("docs/seo-geo-weekly-scorecard.csv", "utf8");
const markdownOutput = process.env.GROWTH_LINKS_MARKDOWN || "artifacts/growth-links.md";
const jsonOutput = process.env.GROWTH_LINKS_OUTPUT || "artifacts/growth-links.json";
const now = new Date(process.env.GROWTH_LINKS_DATE || Date.now());
const sprint = isoSprint(now);
const roadmapWeek = selectedRoadmapWeek(now);
const row = roadmapRow(roadmapWeek);
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
  primaryGoal: row.primaryGoal,
  canonicalPage: row.canonicalPage,
  productEvidence: row.productEvidence,
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
  const url = new URL(row.canonicalPage);
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

function roadmapRow(week) {
  for (const line of roadmap.split(/\r?\n/)) {
    const match = line.match(
      /^(\d+),"([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)",([^,]+),([^,]+)$/,
    );
    if (Number(match?.[1]) === week) {
      return {
        primaryGoal: match[2],
        canonicalPage: match[3],
        productEvidence: match[4],
        distribution: match[5],
        measurement: match[6],
      };
    }
  }
  return null;
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
