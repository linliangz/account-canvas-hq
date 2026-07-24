import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const config = JSON.parse(
  await readFile(path.join(root, "config", "seo-geo-targets.json"), "utf8"),
);
const scorecard = JSON.parse(
  await readFile(path.join(root, "config", "seo-geo-scorecard.json"), "utf8"),
);
const origin = (process.env.SITE_URL || config.canonicalOrigin).replace(/\/+$/, "");
const now = new Date();
const dateStamp = (process.env.REPORT_DATE || now.toISOString().slice(0, 10)).trim();
const outputDir = path.join(root, "reports", "seo");
const userAgent = "Visioner-SEO-Audit/2.0 (+https://www.visioner.cc/llms.txt)";
const targetQueries = config.targetQueries || config.targets || [];

function round(value, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function ratio(passed, total) {
  return total ? passed / total : 0;
}

function normalizeUrl(value, base = origin) {
  try {
    const url = new URL(value, base);
    url.hash = "";
    return url.toString();
  } catch {
    return "";
  }
}

function comparableUrl(value) {
  try {
    const url = new URL(value, origin);
    url.hash = "";
    url.hostname = url.hostname.toLowerCase();
    if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
    return url.toString();
  } catch {
    return "";
  }
}

function attributes(tag) {
  const result = {};
  const expression = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  for (const match of tag.matchAll(expression)) {
    const name = match[1].toLowerCase();
    if (name.startsWith("<")) continue;
    result[name] = match[2] ?? match[3] ?? match[4] ?? "";
  }
  return result;
}

function tagsOf(html, tag) {
  return html.match(new RegExp(`<${tag}\\b[^>]*>`, "gi")) || [];
}

function textOf(html, tag) {
  const match = html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return (match?.[1] || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function metaContent(html, key, expected) {
  for (const tag of tagsOf(html, "meta")) {
    const attrs = attributes(tag);
    if ((attrs[key] || "").toLowerCase() === expected.toLowerCase()) {
      return (attrs.content || "").trim();
    }
  }
  return "";
}

function linkHref(html, relation) {
  for (const tag of tagsOf(html, "link")) {
    const attrs = attributes(tag);
    const rels = (attrs.rel || "").toLowerCase().split(/\s+/);
    if (rels.includes(relation)) return (attrs.href || "").trim();
  }
  return "";
}

function schemaTypes(html) {
  const blocks = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  const types = new Set();
  let invalidBlocks = 0;
  const visit = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    const type = node["@type"];
    if (Array.isArray(type)) type.forEach((item) => types.add(String(item)));
    else if (type) types.add(String(type));
    Object.values(node).forEach(visit);
  };
  for (const block of blocks) {
    try {
      visit(JSON.parse(block[1]));
    } catch {
      invalidBlocks += 1;
    }
  }
  return { types: [...types].sort(), blocks: blocks.length, invalidBlocks };
}

function imageSummary(html) {
  const images = tagsOf(html, "img").map((tag) => attributes(tag));
  const missing = images.filter((item) => !Object.hasOwn(item, "alt"));
  const emptyDecorative = images.filter(
    (item) =>
      Object.hasOwn(item, "alt") &&
      item.alt === "" &&
      (item.role === "presentation" || item["aria-hidden"] === "true"),
  );
  return {
    total: images.length,
    withAlt: images.length - missing.length,
    missingAlt: missing.length,
    emptyDecorative: emptyDecorative.length,
    missingSources: missing.map((item) => item.src || "(unknown)"),
  };
}

function internalLinks(html, pageUrl) {
  const links = [];
  for (const tag of tagsOf(html, "a")) {
    const href = attributes(tag).href;
    if (!href || /^(mailto:|tel:|javascript:|#)/i.test(href)) continue;
    const resolved = normalizeUrl(href, pageUrl);
    if (!resolved) continue;
    const url = new URL(resolved);
    if (url.origin === new URL(origin).origin) links.push(url.pathname.replace(/\/+$/, "") || "/");
  }
  return [...new Set(links)];
}

async function fetchText(url, redirect = "follow") {
  const started = performance.now();
  try {
    const response = await fetch(url, {
      redirect,
      headers: { "user-agent": userAgent, accept: "*/*" },
      signal: AbortSignal.timeout(15_000),
    });
    const body = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      finalUrl: response.url,
      location: response.headers.get("location") || "",
      contentType: response.headers.get("content-type") || "",
      cacheControl: response.headers.get("cache-control") || "",
      elapsedMs: Math.round(performance.now() - started),
      headers: Object.fromEntries(response.headers),
      body,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      finalUrl: url,
      location: "",
      contentType: "",
      cacheControl: "",
      elapsedMs: Math.round(performance.now() - started),
      headers: {},
      body: "",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

const [sitemapResponse, robotsResponse] = await Promise.all([
  fetchText(`${origin}/sitemap.xml`),
  fetchText(`${origin}/robots.txt`),
]);
const sitemapLocations = [...sitemapResponse.body.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)]
  .map((match) => normalizeUrl(match[1]))
  .filter(Boolean);
const targetUrls = targetQueries.map((target) => normalizeUrl(target.landingPage)).filter(Boolean);
const urls = [...new Set([`${origin}/`, ...sitemapLocations, ...targetUrls])];

const pages = await Promise.all(
  urls.map(async (url) => {
    const response = await fetchText(url);
    const html = response.body;
    const title = textOf(html, "title");
    const description = metaContent(html, "name", "description");
    const robots = metaContent(html, "name", "robots").toLowerCase();
    const canonicalRaw = linkHref(html, "canonical");
    const canonical = canonicalRaw ? normalizeUrl(canonicalRaw, response.finalUrl) : "";
    const h1Count = tagsOf(html, "h1").length;
    const h1 = textOf(html, "h1");
    const htmlTag = tagsOf(html, "html")[0] || "";
    const lang = attributes(htmlTag).lang || "";
    const favicon = linkHref(html, "icon") || linkHref(html, "shortcut");
    const manifest = linkHref(html, "manifest");
    const schema = schemaTypes(html);
    const images = imageSummary(html);
    const links = internalLinks(html, response.finalUrl);
    const pathname = new URL(url).pathname;
    const isGuide = pathname.startsWith("/guides/");
    const hasGuideIndexLink = !isGuide || links.includes("/guides");
    const hasCommercialLink =
      !isGuide ||
      links.some(
        (item) =>
          item !== "/" &&
          !item.startsWith("/guides") &&
          !["/privacy", "/terms", "/support", "/about", "/account-deletion"].includes(item),
      );
    const issues = [];

    if (response.status !== 200)
      issues.push({ severity: "critical", code: "HTTP_STATUS", detail: String(response.status) });
    if (!response.contentType.includes("text/html"))
      issues.push({ severity: "critical", code: "CONTENT_TYPE", detail: response.contentType });
    if (!title) issues.push({ severity: "critical", code: "TITLE_MISSING" });
    else if (title.length < 25 || title.length > 65)
      issues.push({ severity: "warning", code: "TITLE_LENGTH", detail: String(title.length) });
    if (!description) issues.push({ severity: "critical", code: "DESCRIPTION_MISSING" });
    else if (description.length < 70 || description.length > 170)
      issues.push({
        severity: "warning",
        code: "DESCRIPTION_LENGTH",
        detail: String(description.length),
      });
    if (!canonical) issues.push({ severity: "critical", code: "CANONICAL_MISSING" });
    else if (comparableUrl(canonical) !== comparableUrl(response.finalUrl))
      issues.push({ severity: "critical", code: "CANONICAL_MISMATCH", detail: canonical });
    if (canonical && new URL(canonical).origin !== new URL(origin).origin)
      issues.push({ severity: "critical", code: "CANONICAL_HOST", detail: canonical });
    if (robots.includes("noindex"))
      issues.push({ severity: "critical", code: "NOINDEX", detail: robots });
    if (h1Count !== 1)
      issues.push({ severity: "critical", code: "H1_COUNT", detail: String(h1Count) });
    if (!lang) issues.push({ severity: "warning", code: "LANG_MISSING" });
    if (!favicon) issues.push({ severity: "warning", code: "FAVICON_LINK_MISSING" });
    if (!manifest) issues.push({ severity: "warning", code: "MANIFEST_LINK_MISSING" });
    if (schema.invalidBlocks)
      issues.push({
        severity: "critical",
        code: "INVALID_JSON_LD",
        detail: String(schema.invalidBlocks),
      });
    if (!schema.blocks) issues.push({ severity: "warning", code: "SCHEMA_MISSING" });
    if (images.missingAlt)
      issues.push({
        severity: "critical",
        code: "IMAGE_ALT_MISSING",
        detail: images.missingSources.join(", "),
      });
    if (!hasGuideIndexLink) issues.push({ severity: "warning", code: "GUIDE_INDEX_LINK_MISSING" });
    if (!hasCommercialLink)
      issues.push({ severity: "warning", code: "GUIDE_COMMERCIAL_LINK_MISSING" });
    if (response.elapsedMs > 2_000)
      issues.push({
        severity: "warning",
        code: "SLOW_RESPONSE",
        detail: `${response.elapsedMs}ms`,
      });

    return {
      url,
      status: response.status,
      finalUrl: response.finalUrl,
      elapsedMs: response.elapsedMs,
      contentType: response.contentType,
      title,
      titleLength: title.length,
      description,
      descriptionLength: description.length,
      canonical,
      h1,
      h1Count,
      lang,
      robots,
      favicon,
      manifest,
      schemaTypes: schema.types,
      schemaBlocks: schema.blocks,
      invalidSchemaBlocks: schema.invalidBlocks,
      images,
      internalLinks: links,
      isGuide,
      hasGuideIndexLink,
      hasCommercialLink,
      issues,
    };
  }),
);

const redirects = await Promise.all(
  [
    `http://${new URL(origin).hostname.replace(/^www\./, "")}/guides?source=seo-audit`,
    `https://${new URL(origin).hostname.replace(/^www\./, "")}/guides?source=seo-audit`,
    `http://${new URL(origin).hostname}/guides?source=seo-audit`,
  ].map(async (source) => {
    const response = await fetchText(source, "manual");
    const expected = `${origin}/guides?source=seo-audit`;
    const location = response.location ? normalizeUrl(response.location, source) : "";
    return {
      source,
      status: response.status,
      location,
      expected,
      passed:
        [301, 308].includes(response.status) && comparableUrl(location) === comparableUrl(expected),
    };
  }),
);

const homepage = pages.find((page) => comparableUrl(page.url) === comparableUrl(`${origin}/`));
const assetUrls = [
  homepage?.favicon && normalizeUrl(homepage.favicon, origin),
  homepage?.manifest && normalizeUrl(homepage.manifest, origin),
  `${origin}/favicon.ico`,
  `${origin}/favicon-192x192.png`,
  `${origin}/favicon-512x512.png`,
  `${origin}/apple-touch-icon.png`,
].filter(Boolean);
const assets = await Promise.all(
  [...new Set(assetUrls)].map(async (url) => {
    const response = await fetchText(url);
    return {
      url,
      status: response.status,
      contentType: response.contentType,
      passed: response.status === 200,
    };
  }),
);

const criticalIssues = pages.flatMap((page) =>
  page.issues
    .filter((issue) => issue.severity === "critical")
    .map((issue) => ({ url: page.url, ...issue })),
);
const warningIssues = pages.flatMap((page) =>
  page.issues
    .filter((issue) => issue.severity === "warning")
    .map((issue) => ({ url: page.url, ...issue })),
);
const sitemapChecks = {
  status: sitemapResponse.status,
  contentType: sitemapResponse.contentType,
  isXml: sitemapResponse.contentType.includes("xml") && sitemapResponse.body.includes("<urlset"),
  urlCount: sitemapLocations.length,
  unique: new Set(sitemapLocations).size === sitemapLocations.length,
  allCanonicalOrigin:
    sitemapLocations.length > 0 &&
    sitemapLocations.every((url) => new URL(url).origin === new URL(origin).origin),
  targetCoverage: targetUrls.length
    ? ratio(
        targetUrls.filter((url) =>
          sitemapLocations.some((location) => comparableUrl(location) === comparableUrl(url)),
        ).length,
        targetUrls.length,
      )
    : 0,
};
const robotsChecks = {
  status: robotsResponse.status,
  contentType: robotsResponse.contentType,
  mentionsSitemap: robotsResponse.body
    .toLowerCase()
    .includes(`sitemap: ${origin}/sitemap.xml`.toLowerCase()),
  blocksAll: /user-agent:\s*\*[\s\S]*?disallow:\s*\/\s*(?:\n|$)/i.test(robotsResponse.body),
};

const weights = scorecard.categories.technicalSeo.criteria;
const count = (predicate) => pages.filter(predicate).length;
const guidePages = pages.filter((page) => page.isGuide);
const totalImages = pages.reduce((sum, page) => sum + page.images.total, 0);
const imagesWithAlt = pages.reduce((sum, page) => sum + page.images.withAlt, 0);
const criteria = {
  crawlDiscovery: {
    maximum: weights.crawlDiscovery,
    rate:
      [
        sitemapChecks.status === 200 && sitemapChecks.isXml,
        sitemapChecks.unique && sitemapChecks.allCanonicalOrigin,
        robotsChecks.status === 200 && robotsChecks.mentionsSitemap,
        !robotsChecks.blocksAll,
      ].filter(Boolean).length / 4,
  },
  canonicalization: {
    maximum: weights.canonicalization,
    rate:
      ratio(redirects.filter((item) => item.passed).length, redirects.length) * 0.6 +
      ratio(
        count(
          (page) =>
            Boolean(page.canonical) &&
            comparableUrl(page.canonical) === comparableUrl(page.finalUrl),
        ),
        pages.length,
      ) *
        0.4,
  },
  pageAvailability: {
    maximum: weights.pageAvailability,
    rate: ratio(
      count((page) => page.status === 200),
      pages.length,
    ),
  },
  metadataAndH1: {
    maximum: weights.metadataAndH1,
    rate:
      ratio(
        count((page) => page.titleLength >= 25 && page.titleLength <= 65),
        pages.length,
      ) *
        0.4 +
      ratio(
        count((page) => page.descriptionLength >= 70 && page.descriptionLength <= 170),
        pages.length,
      ) *
        0.3 +
      ratio(
        count((page) => page.h1Count === 1),
        pages.length,
      ) *
        0.3,
  },
  structuredData: {
    maximum: weights.structuredData,
    rate:
      ratio(
        count((page) => page.invalidSchemaBlocks === 0),
        pages.length,
      ) *
        (2 / 3) +
      ratio(
        count((page) => page.schemaBlocks > 0),
        pages.length,
      ) *
        (1 / 3),
  },
  faviconAndManifest: {
    maximum: weights.faviconAndManifest,
    rate:
      ratio(assets.filter((asset) => asset.passed).length, assets.length) * (2 / 3) +
      ratio(
        count((page) => Boolean(page.favicon) && Boolean(page.manifest)),
        pages.length,
      ) *
        (1 / 3),
  },
  imageAlternatives: {
    maximum: weights.imageAlternatives,
    rate: totalImages ? ratio(imagesWithAlt, totalImages) : 1,
  },
  guideDiscoveryAndLinks: {
    maximum: weights.guideDiscoveryAndLinks,
    rate:
      sitemapChecks.targetCoverage * (1 / 3) +
      ratio(
        count((page) => !page.isGuide || page.hasGuideIndexLink),
        pages.length,
      ) *
        (1 / 3) +
      ratio(
        count((page) => !page.isGuide || page.hasCommercialLink),
        pages.length,
      ) *
        (1 / 3),
  },
};
for (const criterion of Object.values(criteria)) {
  criterion.rate = round(Math.max(0, Math.min(1, criterion.rate)), 4);
  criterion.score = round(criterion.maximum * criterion.rate);
}
const technicalScore = round(Object.values(criteria).reduce((sum, item) => sum + item.score, 0));

const report = {
  generatedAt: now.toISOString(),
  reportDate: dateStamp,
  origin,
  technicalScore,
  scoreMaximum: scorecard.categories.technicalSeo.maximumScore,
  criteria,
  summary: {
    auditedPages: pages.length,
    guidePages: guidePages.length,
    images: totalImages,
    imagesMissingAlt: totalImages - imagesWithAlt,
    criticalIssues: criticalIssues.length,
    warnings: warningIssues.length,
  },
  sitemap: sitemapChecks,
  robots: robotsChecks,
  redirects,
  assets,
  criticalIssues,
  warningIssues,
  pages,
};

const criterionRows = Object.entries(criteria)
  .map(
    ([name, item]) =>
      `| ${name} | ${item.score.toFixed(2)} | ${item.maximum} | ${Math.round(item.rate * 100)}% |`,
  )
  .join("\n");
const issueRows = [...criticalIssues, ...warningIssues]
  .map(
    (issue) =>
      `| ${issue.severity} | ${issue.code} | ${issue.url} | ${(issue.detail || "").replaceAll("|", "\\|")} |`,
  )
  .join("\n");
const redirectRows = redirects
  .map(
    (item) =>
      `| ${item.passed ? "PASS" : "FAIL"} | ${item.source} | ${item.status} | ${item.location || "-"} |`,
  )
  .join("\n");
const markdown = `# Visioner Technical SEO Audit

- Generated: ${report.generatedAt}
- Origin: ${origin}
- Technical score: **${technicalScore}/${report.scoreMaximum}**
- Audited pages: ${pages.length}
- Critical issues: ${criticalIssues.length}
- Warnings: ${warningIssues.length}
- Sitemap URLs: ${sitemapChecks.urlCount}
- Target landing-page coverage: ${Math.round(sitemapChecks.targetCoverage * 100)}%
- Image alt coverage: ${totalImages ? Math.round((imagesWithAlt / totalImages) * 100) : 100}%

## Scoring

| Criterion | Score | Maximum | Pass rate |
| --- | ---: | ---: | ---: |
${criterionRows}

## Canonical redirects

| Result | Source | Status | Location |
| --- | --- | ---: | --- |
${redirectRows}

## Issues

| Severity | Code | URL | Detail |
| --- | --- | --- | --- |
${issueRows || "| - | No issues detected | - | - |"}

## Evidence boundary

This report checks the live technical surface: sitemap, robots, HTTP status, canonical,
metadata, H1, JSON-LD, favicons, manifest, image alternatives, and guide discovery links.
Search index coverage, rankings, clicks, and answer-engine citations come from their
separate evidence sources and are never inferred here.
`;

await mkdir(outputDir, { recursive: true });
await Promise.all([
  writeFile(path.join(outputDir, "latest.json"), `${JSON.stringify(report, null, 2)}\n`),
  writeFile(path.join(outputDir, "latest.md"), markdown),
  writeFile(path.join(outputDir, `${dateStamp}.json`), `${JSON.stringify(report, null, 2)}\n`),
  writeFile(path.join(outputDir, `${dateStamp}.md`), markdown),
]);

console.log(`Technical SEO score: ${technicalScore}/${report.scoreMaximum}`);
console.log(
  `Pages: ${pages.length}; critical: ${criticalIssues.length}; warnings: ${warningIssues.length}`,
);
if (criticalIssues.length > 0 || redirects.some((item) => !item.passed)) process.exitCode = 1;
