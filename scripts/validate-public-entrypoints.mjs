const DEFAULT_LANDING_URL = "https://www.visioner.cc";
const DEFAULT_APP_URL = "https://app.visioner.cc";

const landingUrl = cleanBaseUrl(process.env.VISIONER_LANDING_URL || DEFAULT_LANDING_URL);
const appUrl = cleanBaseUrl(process.env.VISIONER_APP_URL || DEFAULT_APP_URL);
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

const home = await fetchText(urlFor(landingUrl, "/"));

assert(home.includes("CRM for Key Account Managers"), "Landing page must retain the KAM headline.");
assertCanonical(home, `${landingUrl}/`, "Landing page");
assert(
  home.includes('property="og:url"') && home.includes(`${landingUrl}/`),
  "Landing page must include og:url metadata.",
);
assert(home.includes('"@type":"Organization"'), "Landing page must include Organization JSON-LD.");
assert(home.includes('"@type":"WebSite"'), "Landing page must include WebSite JSON-LD.");
assert(
  home.includes('"@type":"SoftwareApplication"') && home.includes("Visioner CRM"),
  "Landing page must include Visioner CRM SoftwareApplication JSON-LD.",
);
assert(
  home.includes("A Typical Day for a KAM"),
  "Landing page must include the KAM daily workflow story.",
);
assert(home.includes(`${appUrl}/signup`), "Landing page must link Start for Free to signup.");
assert(
  home.includes(`${appUrl}/`) || home.includes("Open Web App"),
  "Landing page must link back to the hosted web app.",
);
assert(
  !/intent=download|Download Mac/i.test(home),
  "Landing page must not advertise Mac downloads in the SaaS-first launch.",
);
assert(
  home.includes(`${appUrl}/pricing?plan=basic`),
  "Landing page must link Basic plan CTA to app pricing.",
);
assert(
  /https:\/\/app\.visioner\.cc\/signup\?plan=pro/.test(home),
  "Landing page must link Pro waitlist CTA to signup.",
);
assert(
  !/lovable\.app|lovable\.dev/i.test(home),
  "Landing page must not expose Lovable project URLs.",
);

const appHome = await fetchText(urlFor(appUrl, "/"));
assert(appHome.includes("Visioner CRM"), "Web app root must render Visioner CRM shell.");

await checkPage("/privacy", "Privacy Policy");
await checkPage("/terms", "Terms of Service");
await checkPage("/support", "support@visioner.cc");
const aboutPage = await checkPage("/about", "Visioner is an Account Planning CRM for Key Account Managers");
assert(home.includes("/about"), "Landing page must internally link to /about.");
assertCanonical(aboutPage, urlFor(landingUrl, "/about"), "/about");
assert(
  aboutPage.includes('"@type":"AboutPage"') && aboutPage.includes('"@type":"BreadcrumbList"'),
  "/about must include AboutPage and BreadcrumbList JSON-LD.",
);
await checkPage("/robots.txt", "Sitemap: https://www.visioner.cc/sitemap.xml");
await checkPage("/sitemap.xml", "https://www.visioner.cc/");
const llmsText = await checkPage("/llms.txt", "Account Planning CRM for Key Account Managers");
assert(
  llmsText.includes("Visioner V1.0 is SaaS-first") && llmsText.includes("https://app.visioner.cc/"),
  "/llms.txt must explain the SaaS-first app and web app URL.",
);
const manifest = await checkPage("/site.webmanifest", "Visioner CRM");
assert(
  manifest.includes('"categories"') && manifest.includes('"business"'),
  "/site.webmanifest must describe Visioner as a business web app.",
);
assert(home.includes('/llms.txt'), "Landing page must expose /llms.txt as alternate context.");
assert(home.includes('/site.webmanifest'), "Landing page must link the web app manifest.");

const sitemap = await fetchText(urlFor(landingUrl, "/sitemap.xml"));
const guidesIndex = await checkPage("/guides", "Practical guides for Key Account Managers");
assert(
  home.includes("/guides"),
  "Landing page must internally link to the guides index.",
);
assert(
  sitemap.includes(urlFor(landingUrl, "/guides")),
  "Sitemap must include /guides.",
);
assert(
  sitemap.includes(urlFor(landingUrl, "/about")),
  "Sitemap must include /about.",
);
assertCanonical(guidesIndex, urlFor(landingUrl, "/guides"), "/guides");
assert(
  guidesIndex.includes('"@type":"CollectionPage"') && guidesIndex.includes('"@type":"BreadcrumbList"'),
  "/guides must include CollectionPage and BreadcrumbList JSON-LD.",
);

const seoPages = [
  ["/crm-for-key-account-managers", "CRM for Key Account Managers"],
  ["/key-account-management-crm", "Key Account Management CRM"],
  ["/key-account-management-software", "Key Account Management Software"],
  ["/key-account-manager-tools", "Key Account Manager Tools"],
  ["/account-planning-crm", "Account Planning CRM"],
  ["/account-planning-software", "Account Planning Software"],
  ["/key-account-planning-software", "Key Account Planning Software"],
  ["/strategic-account-management-software", "Strategic Account Management Software"],
  ["/stakeholder-mapping-crm", "Stakeholder Mapping CRM"],
  ["/account-mapping-software", "Account Mapping Software"],
  ["/customer-org-chart-software", "Customer Org Chart Software"],
  ["/relationship-mapping-software", "Relationship Mapping Software"],
  ["/account-plan-template", "Account Plan Template"],
  ["/traditional-crm-vs-account-planning-crm", "Traditional CRM vs Account Planning CRM"],
  [
    "/guides/account-mapping-guide-for-key-account-managers",
    "Account Mapping Guide for Key Account Managers",
  ],
  ["/guides/what-should-an-account-plan-include", "What should an account plan include?"],
  [
    "/guides/how-to-map-stakeholders-in-a-strategic-account",
    "How to map stakeholders in a strategic account",
  ],
  [
    "/guides/crm-for-key-account-managers",
    "CRM for Key Account Managers: what traditional CRM misses",
  ],
];

for (const [path, expectedText] of seoPages) {
  const body = await checkPage(path, expectedText);
  assert(
    home.includes(path),
    `Landing page must internally link to SEO page ${path}.`,
  );
  assert(
    sitemap.includes(urlFor(landingUrl, path)),
    `Sitemap must include ${path}.`,
  );
  assertCanonical(body, urlFor(landingUrl, path), path);
  assert(
    body.includes('property="og:url"') && body.includes(urlFor(landingUrl, path)),
    `${path} must include og:url metadata.`,
  );
  if (path.startsWith("/guides/")) {
    assert(body.includes('"@type":"Article"'), `${path} must include Article JSON-LD.`);
    assert(body.includes('"@type":"BreadcrumbList"'), `${path} must include BreadcrumbList JSON-LD.`);
  } else {
    assert(body.includes('"@type":"FAQPage"'), `${path} must include FAQPage JSON-LD.`);
    assert(body.includes('"@type":"BreadcrumbList"'), `${path} must include BreadcrumbList JSON-LD.`);
  }
}

if (failures.length) {
  for (const message of failures) {
    console.error(`Failure: ${message}`);
  }
  process.exit(1);
}

console.log("Public entrypoint validation passed.");

async function checkPage(path, expectedText) {
  const body = await fetchText(urlFor(landingUrl, path));
  assert(body.includes(expectedText), `${path} must contain "${expectedText}".`);
  return body;
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }
  return response.text();
}

function cleanBaseUrl(value) {
  return String(value).replace(/\/+$/, "");
}

function urlFor(base, path) {
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function assertCanonical(body, expectedUrl, label) {
  const hrefs = [...body.matchAll(/<link[^>]+rel="canonical"[^>]*>/g)]
    .map((match) => match[0].match(/href="([^"]+)"/)?.[1])
    .filter(Boolean);
  assert(
    hrefs.length === 1 && hrefs[0] === expectedUrl,
    `${label} must include exactly one canonical URL: ${expectedUrl}. Found: ${hrefs.join(", ") || "none"}.`,
  );
}
