import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const failures = [];
const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const home = read("src/routes/index.tsx");
const root = read("src/routes/__root.tsx");
const robots = read("public/robots.txt");
const sitemap = read("public/sitemap.xml");
const llms = read("public/llms.txt");
const llmsFull = read("public/llms-full.txt");
const marketingLinks = read("src/lib/marketing-links.ts");
const performanceReport = read("scripts/report-seo-geo-performance.mjs");
const weeklyAudit = read(".github/workflows/seo-live-audit.yml");
const monthlyGeoReview = read(".github/workflows/geo-monthly-review.yml");
const geoScorecard = read("docs/geo-answer-monitoring.csv");

const authorityRoutes = [
  "account-planning-crm.tsx",
  "crm-for-key-account-managers.tsx",
  "account-mapping-software.tsx",
  "customer-org-chart-software.tsx",
];

const requiredRoutes = [
  "/",
  "/about",
  "/account-planning-crm",
  "/crm-for-key-account-managers",
  "/key-account-management-crm",
  "/account-mapping-software",
  "/customer-org-chart-software",
  "/stakeholder-mapping-crm",
  "/relationship-mapping-software",
  "/guides",
  "/guides/account-mapping-guide-for-key-account-managers",
  "/guides/how-to-choose-key-account-management-software",
  "/guides/account-planning-crm-vs-key-account-management-platform",
  "/guides/key-account-manager-daily-workflow",
];

const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert(
  (sitemap.match(/<url>/g) ?? []).length === (sitemap.match(/<\/url>/g) ?? []).length,
  "Sitemap must have balanced url elements.",
);
assert(new Set(sitemapUrls).size === sitemapUrls.length, "Sitemap URLs must be unique.");
for (const path of requiredRoutes) {
  const expected = `https://www.visioner.cc${path === "/" ? "/" : path}`;
  assert(sitemapUrls.includes(expected), `Sitemap is missing ${expected}.`);
}

assert(robots.includes("User-agent: OAI-SearchBot"), "robots.txt must name OAI-SearchBot.");
assert(
  robots.includes("Sitemap: https://www.visioner.cc/sitemap.xml"),
  "robots.txt must expose the canonical sitemap.",
);
assert(
  root.includes('href: "/llms.txt"') && root.includes('href: "/llms-full.txt"'),
  "The site head must expose both LLM context files.",
);

for (const fact of [
  "Free: $0",
  "Basic: $12/month",
  "Pro: $29/month",
  "Team: $49/user/month",
  "Visioner is SaaS-first",
]) {
  assert(llms.includes(fact), `llms.txt is missing current fact: ${fact}.`);
}
for (const fact of [
  "Visioner product facts",
  "Last reviewed:",
  "THE ORG integration is BYOK",
  "Apollo contact enrichment remains a preview",
  "Citation guidance",
]) {
  assert(llmsFull.includes(fact), `llms-full.txt is missing: ${fact}.`);
}

assert(
  !/Pro and Team (are|stay).*(waitlist|coming-soon)/i.test(llms),
  "llms.txt must not describe available plans as waitlist-only.",
);
assert(!/Pro and\s+Team stay waitlist-only/i.test(home), "Home pricing copy is stale.");
assert(
  !/name="Pro"[\s\S]{0,180}badge="Coming soon"/.test(home),
  "Pro must not be marked Coming soon.",
);
assert(
  !/name="Team"[\s\S]{0,180}badge="Coming soon"/.test(home),
  "Team must not be marked Coming soon.",
);
assert(
  home.includes('href="https://app.visioner.cc/pricing?plan=pro"'),
  "Home must link Pro to hosted pricing.",
);
assert(
  home.includes('href="https://app.visioner.cc/pricing?plan=team"'),
  "Home must link Team to hosted pricing.",
);
assert(
  root.includes('name: "Pro"') && root.includes('name: "Team"'),
  "SoftwareApplication offers must include Pro and Team.",
);
assert(
  marketingLinks.includes('utm_source", "visioner.cc"') &&
    marketingLinks.includes('utm_medium", "website"') &&
    marketingLinks.includes("utm_campaign"),
  "Website signup links must preserve first-party acquisition attribution.",
);
assert(
  performanceReport.includes("webmasters.readonly") &&
    performanceReport.includes('["query"], 500') &&
    performanceReport.includes('["page"], 500') &&
    performanceReport.includes("nonBranded") &&
    performanceReport.includes("opportunities"),
  "Weekly reporting must use read-only Search Console data for query, page, non-branded, and CTR-opportunity analysis.",
);
assert(
  weeklyAudit.includes("GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON") &&
    weeklyAudit.includes("report-seo-geo-performance.mjs") &&
    weeklyAudit.includes("upload-artifact@v4"),
  "The weekly live audit must publish Search Console evidence when credentials are configured.",
);
assert(
  monthlyGeoReview.includes("schedule:") &&
    monthlyGeoReview.includes("GEO answer review") &&
    monthlyGeoReview.includes("issues: write") &&
    geoScorecard.includes("facts_accurate") &&
    geoScorecard.includes("cited_url"),
  "GEO monitoring must create a monthly review task and record citations plus factual accuracy.",
);

const guideDir = "src/routes/guides";
for (const file of readdirSync(guideDir).filter(
  (name) => name.endsWith(".tsx") && name !== "index.tsx",
)) {
  const source = read(join(guideDir, file));
  assert(source.includes("dateModified:"), `${file} must expose a reviewed date.`);
  assert(source.includes("summary:"), `${file} must provide a direct-answer summary.`);
  assert(source.includes("related:"), `${file} must link to related canonical content.`);
}

for (const file of authorityRoutes) {
  const source = read(join("src/routes", file));
  assert(source.includes("directAnswer:"), `${file} must provide a direct category answer.`);
  assert(source.includes("dateModified:"), `${file} must expose a reviewed date.`);
  assert(source.includes("evidence:"), `${file} must show current product evidence.`);
  assert(source.includes('type: "article"'), `${file} must publish article social metadata.`);
  assert(
    source.includes('image: "/product-screenshots/'),
    `${file} must use real product evidence for social sharing.`,
  );
}

if (failures.length) {
  failures.forEach((message) => console.error(`Failure: ${message}`));
  process.exit(1);
}

console.log(
  `SEO/GEO validation passed (${sitemapUrls.length} sitemap URLs and current plan facts).`,
);
