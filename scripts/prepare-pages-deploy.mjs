import { cpSync, existsSync, renameSync, rmSync, writeFileSync } from "node:fs";

const PUBLIC_DIR = ".output/public";
const SERVER_DIR = ".output/server";
const DIST_DIR = "dist";
const WORKER_DIR = `${DIST_DIR}/_worker.js`;

if (!existsSync(PUBLIC_DIR) || !existsSync(SERVER_DIR)) {
  console.error(
    "Missing .output build artifacts. Run npm run build before preparing Pages deploy.",
  );
  process.exit(1);
}

rmSync(DIST_DIR, { recursive: true, force: true });
cpSync(PUBLIC_DIR, DIST_DIR, { recursive: true });
cpSync(SERVER_DIR, WORKER_DIR, { recursive: true });

const workerEntry = `${WORKER_DIR}/index.mjs`;
if (existsSync(workerEntry)) {
  renameSync(workerEntry, `${WORKER_DIR}/index.js`);
}

writeFileSync(
  `${DIST_DIR}/_routes.json`,
  `${JSON.stringify(
    {
      version: 1,
      include: ["/*"],
      exclude: [
        "/assets/*",
        "/downloads/*",
        "/product-screenshots/*",
        "/visioner-*.svg",
        "/favicon*",
        "/robots.txt",
      ],
    },
    null,
    2,
  )}\n`,
);

console.log("Prepared Cloudflare Pages advanced-mode bundle in dist.");
