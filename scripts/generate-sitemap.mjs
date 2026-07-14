import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { spawnSync } from "node:child_process";

const siteUrl = "https://www.visioner.cc";
const routesRoot = "src/routes";
const outputPath = "public/sitemap.xml";
const checkOnly = process.argv.includes("--check");
const existingDates = existingLastModifiedDates();

const routes = routeFiles(routesRoot)
  .map((file) => routeRecord(file))
  .filter(Boolean)
  .sort((left, right) => {
    if (left.path === "/") return -1;
    if (right.path === "/") return 1;
    return left.path.localeCompare(right.path);
  });

const duplicate = routes.find(
  (route, index) => routes.findIndex((item) => item.path === route.path) !== index,
);
if (duplicate) fail(`Duplicate public route found: ${duplicate.path}`);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.flatMap((route) => [
    "  <url>",
    `    <loc>${siteUrl}${route.path}</loc>`,
    `    <lastmod>${route.lastModified}</lastmod>`,
    `    <changefreq>${route.changeFrequency}</changefreq>`,
    `    <priority>${route.priority}</priority>`,
    "  </url>",
  ]),
  "</urlset>",
  "",
].join("\n");

if (checkOnly) {
  const current = readFileSync(outputPath, "utf8");
  if (current !== xml) {
    fail("public/sitemap.xml is stale. Run npm run generate:sitemap and commit the result.");
  }
  console.log(`Sitemap is current (${routes.length} public routes).`);
} else {
  writeFileSync(outputPath, xml);
  console.log(`Generated ${outputPath} with ${routes.length} public routes.`);
}

function routeFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return routeFiles(path);
    if (!entry.isFile() || !entry.name.endsWith(".tsx") || entry.name === "__root.tsx") return [];
    return [path];
  });
}

function routeRecord(file) {
  const source = readFileSync(file, "utf8");
  const match = source.match(/createFileRoute\(\s*["']([^"']+)["']\s*,?\s*\)/);
  if (!match) return null;
  const path = normalizePath(match[1]);
  if (path.includes("$") || path.includes("*")) return null;
  return {
    path,
    lastModified: reviewedDate(source) || gitDate(file, path),
    changeFrequency:
      path === "/" || path === "/guides" || !path.startsWith("/guides/") ? "weekly" : "monthly",
    priority: priority(path),
  };
}

function normalizePath(value) {
  if (value === "/") return "/";
  return value.replace(/\/+$/, "");
}

function reviewedDate(source) {
  return source.match(/dateModified:\s*["'](\d{4}-\d{2}-\d{2})["']/)?.[1] || "";
}

function gitDate(file, path) {
  const result = spawnSync("git", ["log", "-1", "--format=%cs", "--", relative(".", file)], {
    encoding: "utf8",
  });
  const value = result.status === 0 ? result.stdout.trim() : "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return existingDates.get(path) || new Date().toISOString().slice(0, 10);
}

function existingLastModifiedDates() {
  if (!existsSync(outputPath)) return new Map();
  const xml = readFileSync(outputPath, "utf8");
  return new Map(
    [
      ...xml.matchAll(
        /<url>\s*<loc>https:\/\/www\.visioner\.cc([^<]*)<\/loc>\s*<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/g,
      ),
    ].map((match) => [normalizePath(match[1] || "/"), match[2]]),
  );
}

function priority(path) {
  const exact = {
    "/": "1.0",
    "/about": "0.75",
    "/account-planning-crm": "0.9",
    "/crm-for-key-account-managers": "0.9",
    "/key-account-management-crm": "0.9",
    "/key-account-management-software": "0.88",
    "/account-planning-software": "0.86",
    "/key-account-planning-software": "0.86",
    "/key-account-manager-tools": "0.84",
    "/account-mapping-software": "0.82",
    "/customer-org-chart-software": "0.82",
    "/relationship-mapping-software": "0.8",
    "/stakeholder-mapping-crm": "0.8",
    "/strategic-account-management-software": "0.8",
    "/guides": "0.78",
    "/traditional-crm-vs-account-planning-crm": "0.76",
    "/account-plan-template": "0.75",
    "/privacy": "0.4",
    "/terms": "0.4",
    "/support": "0.4",
  };
  return exact[path] || (path.startsWith("/guides/") ? "0.72" : "0.7");
}

function fail(message) {
  console.error(`Sitemap generation failed: ${message}`);
  process.exit(1);
}
