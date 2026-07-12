import { existsSync, readFileSync, writeFileSync } from "node:fs";

const CONFIG_PATH = ".output/server/wrangler.json";

if (!existsSync(CONFIG_PATH)) {
  console.error(`${CONFIG_PATH} is missing. Run npm run build before deploying.`);
  process.exit(1);
}

const config = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
config.name = "visioner-cc-landing";
config.workers_dev = false;
config.routes = [
  { pattern: "www.visioner.cc/*", zone_name: "visioner.cc" },
  { pattern: "visioner.cc/*", zone_name: "visioner.cc" },
];

writeFileSync(CONFIG_PATH, `${JSON.stringify(config, null, 2)}\n`);
console.log("Prepared Cloudflare Worker deploy config for visioner-cc-landing routes.");
