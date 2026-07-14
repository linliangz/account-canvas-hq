const baseUrl = (process.env.SEO_AUDIT_BASE_URL || "https://www.visioner.cc").replace(/\/$/, "");
const canonicalBaseUrl = (process.env.SEO_CANONICAL_BASE_URL || "https://www.visioner.cc").replace(
  /\/$/,
  "",
);

const pages = [
  {
    path: "/account-planning-crm",
    title: "Account Planning CRM | Visioner",
    image: "/product-screenshots/visioner-account-overview.png",
    answerMarker: "Direct answer",
  },
  {
    path: "/crm-for-key-account-managers",
    title: "CRM for Key Account Managers | Visioner",
    image: "/product-screenshots/visioner-portfolio-home.png",
    answerMarker: "Direct answer",
  },
  {
    path: "/account-mapping-software",
    title: "Account Mapping Software | Visioner",
    image: "/product-screenshots/visioner-org-chart.png",
    answerMarker: "Direct answer",
  },
  {
    path: "/customer-org-chart-software",
    title: "Customer Org Chart Software | Visioner",
    image: "/product-screenshots/visioner-org-chart.png",
    answerMarker: "Direct answer",
  },
  {
    path: "/guides/how-to-choose-key-account-management-software",
    title: "How to Choose Key Account Management Software | Visioner",
    image: "/product-screenshots/visioner-account-overview.png",
    answerMarker: "Quick answer",
  },
];

const failures = [];
const pass = (message) => console.log(`PASS ${message}`);
const fail = (message) => {
  failures.push(message);
  console.error(`FAIL ${message}`);
};

async function fetchText(path) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { "user-agent": "VisionerSEOAudit/1.0 (+https://www.visioner.cc/)" },
    redirect: "follow",
  });
  const text = await response.text();
  if (!response.ok) fail(`${path} returned ${response.status}.`);
  else pass(`${path} returned ${response.status}.`);
  return text;
}

const robots = await fetchText("/robots.txt");
if (robots.includes(`Sitemap: ${canonicalBaseUrl}/sitemap.xml`))
  pass("robots.txt exposes the sitemap.");
else fail("robots.txt does not expose the canonical sitemap.");

const sitemap = await fetchText("/sitemap.xml");
for (const page of pages) {
  const url = `${canonicalBaseUrl}${page.path}`;
  if (sitemap.includes(`<loc>${url}</loc>`)) pass(`${page.path} is present in the sitemap.`);
  else fail(`${page.path} is missing from the sitemap.`);

  const html = await fetchText(page.path);
  const expectedImage = `${canonicalBaseUrl}${page.image}`;
  const checks = [
    [html.includes(`<title>${page.title}</title>`), "title"],
    [html.includes(`rel=\"canonical\" href=\"${url}\"`), "canonical URL"],
    [
      /<meta[^>]+property=["']og:type["'][^>]+content=["']article["'][^>]*>/i.test(html) ||
        /<meta[^>]+content=["']article["'][^>]+property=["']og:type["'][^>]*>/i.test(html),
      "article Open Graph type",
    ],
    [html.includes(expectedImage), "real product social image"],
    [html.includes(page.answerMarker), "direct answer content"],
    [
      html.includes('\\\"@type\\\":\\\"Article\\\"') || html.includes('"@type":"Article"'),
      "Article structured data",
    ],
  ];
  for (const [condition, label] of checks) {
    if (condition) pass(`${page.path} exposes ${label}.`);
    else fail(`${page.path} is missing ${label}.`);
  }
}

if (failures.length) {
  console.error(`\nLive SEO audit failed with ${failures.length} issue(s).`);
  process.exit(1);
}

console.log(`\nLive SEO audit passed for ${pages.length} authority pages.`);
