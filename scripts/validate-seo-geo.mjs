import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

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
const weeklyGrowthSprint = read(".github/workflows/growth-weekly-sprint.yml");
const roadmap = read("docs/seo-geo-90-day-roadmap.csv");
const founderRunbook = read("docs/visioner-seo-geo-founder-runbook.md");
const marketingLinks = read("src/lib/marketing-links.ts");
const performanceReport = read("scripts/report-seo-geo-performance.mjs");
const growthReport = read("scripts/report-growth-performance.mjs");
const growthLinks = read("scripts/generate-growth-links.mjs");
const weeklyBrief = read("scripts/generate-seo-geo-weekly-brief.mjs");
const attribution = read("src/components/MarketingAttribution.tsx");
const weeklyAudit = read(".github/workflows/seo-live-audit.yml");
const monthlyGeoReview = read(".github/workflows/geo-monthly-review.yml");
const geoScorecard = read("docs/geo-answer-monitoring.csv");
const directoryKit = read("docs/visioner-directory-submission-kit.md");
const liveSeoAudit = read("scripts/audit-live-seo.mjs");
const sitemapGenerator = read("scripts/generate-sitemap.mjs");
const buyerGuide = read("src/routes/guides/how-to-choose-key-account-management-software.tsx");
const evaluationScorecard = read(
  "public/resources/key-account-management-software-evaluation-scorecard.csv",
);

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
assert(
  roadmap.includes("Connect measurement baseline") &&
    roadmap.includes("Consolidate and decide") &&
    roadmap.split("\n").filter(Boolean).length === 13,
  "SEO/GEO must have a 12-week owner, evidence, distribution, and measurement roadmap.",
);
assert(
  weeklyBrief.includes("seo-geo-90-day-roadmap.csv") &&
    weeklyGrowthSprint.includes("generate-seo-geo-weekly-brief.mjs"),
  "The weekly growth task must link to the 90-day execution roadmap.",
);
assert(
  founderRunbook.includes("Weekly two-hour cycle") &&
    founderRunbook.includes("One-time indexing gate") &&
    founderRunbook.includes("Monthly GEO cycle") &&
    founderRunbook.includes("Decision rules") &&
    weeklyBrief.includes("15 min — Evidence") &&
    weeklyBrief.includes("60 min — Distribution") &&
    weeklyGrowthSprint.includes("visioner-seo-geo-founder-runbook.md"),
  "SEO/GEO must provide a time-boxed founder runbook and include it in every weekly growth artifact.",
);
assert(
  weeklyGrowthSprint.includes("Visioner weekly growth sprint") &&
    weeklyGrowthSprint.includes("audit-live-seo.mjs") &&
    weeklyGrowthSprint.includes("report-seo-geo-performance.mjs") &&
    weeklyBrief.includes("seo-geo-weekly-scorecard.csv") &&
    weeklyBrief.includes("practicing KAM") &&
    weeklyBrief.includes("GEO discipline"),
  "SEO/GEO must have a weekly execution loop for measurement, canonical-page evidence, distribution, and practitioner feedback.",
);
assert(
  growthReport.includes("/api/admin/growth-performance") &&
    growthReport.includes("Product acquisition baseline") &&
    growthReport.includes("Privacy boundary") &&
    weeklyGrowthSprint.includes("VISIONER_ADMIN_TOKEN") &&
    weeklyGrowthSprint.includes("visioner-growth-performance") &&
    weeklyGrowthSprint.includes("seo-geo-weekly-brief.md") &&
    weeklyGrowthSprint.includes("gh issue comment"),
  "The weekly growth sprint must attach privacy-safe signup, first-Account, and paid conversion evidence.",
);
assert(
  growthLinks.includes("utm_source") &&
    growthLinks.includes("utm_medium") &&
    growthLinks.includes("utm_campaign") &&
    growthLinks.includes("utm_content") &&
    growthLinks.includes("privacyBoundary") &&
    growthLinks.includes("productEvidence") &&
    growthLinks.includes("Seven-day evidence") &&
    growthLinks.includes("Do not invent customer results") &&
    weeklyGrowthSprint.includes("generate-growth-links.mjs") &&
    weeklyGrowthSprint.includes("growth-links.md"),
  "Every weekly sprint must provide a focused evidence brief, channel-specific tracked links, and a seven-day decision record.",
);
assert(
  attribution.includes("sessionStorage") &&
    attribution.includes('destination.hostname !== "app.visioner.cc"') &&
    attribution.includes('destination.searchParams.set("landing_path"') &&
    root.match(/^\s*<Outlet \/>/gm)?.length === 1,
  "External campaign attribution must survive the website-to-signup handoff without duplicate route rendering.",
);
assert(new Set(sitemapUrls).size === sitemapUrls.length, "Sitemap URLs must be unique.");
const sitemapCheck = spawnSync(process.execPath, ["scripts/generate-sitemap.mjs", "--check"], {
  encoding: "utf8",
});
assert(
  sitemapCheck.status === 0,
  sitemapCheck.stderr.trim() || sitemapCheck.stdout.trim() || "Generated sitemap is stale.",
);
assert(
  sitemapGenerator.includes("createFileRoute") && sitemapGenerator.includes("gitDate"),
  "Sitemap generation must discover public routes and use reviewed or Git modification dates.",
);
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
  directoryKit.includes("Free, Basic, Pro, and Team") &&
    directoryKit.includes("Apollo contact enrichment remains Preview") &&
    directoryKit.includes("private BYOK integration"),
  "Directory and external-reference copy must match current plan and provider boundaries.",
);

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
  home.includes('marketingSignupUrl("homepage_pricing", "pro", "/pricing?plan=pro")'),
  "Home must attribute Pro signup and continue to hosted pricing.",
);
assert(
  home.includes('marketingSignupUrl("homepage_pricing", "team", "/pricing?plan=team")'),
  "Home must attribute Team signup and continue to hosted pricing.",
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
  performanceReport.includes("Search Console reporting inactive") &&
    performanceReport.includes('process.env.GITHUB_ACTIONS === "true"'),
  "Missing Search Console credentials must be visible as a GitHub Actions warning, not a silent no-op.",
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
assert(
  liveSeoAudit.includes("https://app.visioner.cc") &&
    liveSeoAudit.includes("sharedPlanFacts") &&
    liveSeoAudit.includes("Create account for Basic") &&
    liveSeoAudit.includes("Public product facts agree"),
  "The live SEO/GEO audit must catch pricing and entitlement facts drifting between the website, app, and LLM context.",
);
assert(
  buyerGuide.includes("/resources/key-account-management-software-evaluation-scorecard.csv") &&
    buyerGuide.includes("No email form and no vendor is pre-scored") &&
    evaluationScorecard.includes("Daily usefulness for the KAM") &&
    evaluationScorecard.includes("TOTAL,100"),
  "The KAM software buyer guide must offer a neutral, ungated evaluation scorecard.",
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
