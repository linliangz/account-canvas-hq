const siteUrl = "https://www.visioner.cc";
const host = "www.visioner.cc";
const key = "7bf05a60bd3e3df5ce23a3d651f0daca";
const keyLocation = `${siteUrl}/${key}.txt`;
const submittedPaths = process.argv.slice(2);

if (!submittedPaths.length) {
  console.error(
    "Provide only URLs that were added, updated, or deleted. Example: npm run indexnow:submit -- /account-planning-crm",
  );
  process.exit(1);
}

const urlList = submittedPaths.map((value) => {
  const url = new URL(value, siteUrl);
  if (url.protocol !== "https:" || url.host !== host) {
    throw new Error(`IndexNow URL must use the canonical Visioner host: ${value}`);
  }
  return url.toString();
});

const keyResponse = await fetch(keyLocation, {
  headers: { "user-agent": "VisionerIndexNow/1.0 (+https://www.visioner.cc/)" },
});
if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) {
  throw new Error(`IndexNow key verification file is not available at ${keyLocation}.`);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (![200, 202].includes(response.status)) {
  const detail = (await response.text()).trim();
  throw new Error(
    `IndexNow rejected the submission with ${response.status}${detail ? `: ${detail}` : ""}.`,
  );
}

console.log(
  `IndexNow accepted ${urlList.length} updated URL${urlList.length === 1 ? "" : "s"} (${response.status}).`,
);
urlList.forEach((url) => console.log(`- ${url}`));
