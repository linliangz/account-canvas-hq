# Visioner SEO and GEO execution plan

Updated: 2026-07-14
Owner: Founder until a growth owner is assigned
Primary category: Account Planning CRM for Key Account Managers

## Outcomes

Within 90 days, establish repeatable discovery rather than publishing more near-duplicate keyword pages.

- Google indexes every canonical product and guide page without sitemap or structured-data errors.
- Visioner appears for branded searches and begins earning impressions for account planning CRM, CRM for Key Account Managers, account mapping software, and customer org chart software.
- AI search systems can retrieve a current, factual description of Visioner, its plan boundaries, and canonical sources.
- Organic visitors can be connected to signup, activation, and paid conversion events.

## Operating rules

1. Keep one canonical page per search intent. Improve or consolidate weak pages instead of cloning another keyword variation.
2. Publish first-hand product evidence: screenshots, workflows, limitations, pricing, and implementation details.
3. Put a direct answer near the top of every guide, followed by practical steps and related sources.
4. Date every guide and review product claims whenever plan capabilities change.
5. Never describe Preview features as generally available.
6. GEO is not keyword stuffing for AI. It is consistent facts, clear entity names, crawlable pages, direct answers, and evidence that can be cited.

## Week 1: technical baseline

- [ ] Verify the `visioner.cc` Domain Property in Google Search Console.
- [ ] Submit `https://www.visioner.cc/sitemap.xml` and record indexed/excluded counts.
- [ ] Add Bing Webmaster Tools and submit the same sitemap.
- [x] Confirm `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/llms-full.txt` return HTTP 200 without a browser challenge.
- [x] Run `npm run validate:seo-geo` in every website pull request.
- [x] Run `npm run audit:seo-live` every Monday against the public site through GitHub Actions.
- [x] Host an IndexNow verification key and use `npm run indexnow:submit -- /changed-path` after publishing materially updated pages.
- [x] Connect signup events to source, landing page, and campaign parameters without storing sensitive account content.
- [ ] Capture baseline branded and non-branded impressions, clicks, CTR, indexed pages, signup conversion, and Core Web Vitals.
- [x] Add a weekly Search Console report for 28-day branded/non-branded performance, top queries, top pages, and low-CTR opportunities.

### Search Console automation setup

The weekly workflow is operational without credentials and becomes data-producing after this one-time setup:

1. Create a Google Cloud service account dedicated to Search Console reporting.
2. Enable the Search Console API in that Google Cloud project.
3. In the `visioner.cc` Search Console property, add the service account email as a user. Read-only access is sufficient.
4. Download one JSON key and store its complete contents in the website GitHub repository secret `GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON`.
5. Run the `Visioner live SEO audit` workflow manually once. Confirm that its summary contains 28-day metrics and that the `visioner-seo-performance` artifact is present.
6. Delete any unencrypted local copy of the JSON key after the GitHub secret is verified.

The reporter requests only the official `webmasters.readonly` scope. It never changes sitemaps or Search Console settings.

## Weeks 2-4: category authority

Refresh these pages before adding new ones:

1. [x] `/account-planning-crm`: category definition, who it is for, workflow, limits, and comparison with a corporate CRM.
2. [x] `/crm-for-key-account-managers`: persona pain, daily workflow, and why manager-oriented CRM is insufficient.
3. [x] `/account-mapping-software`: org chart, stakeholder roles, relationship health, and unknown seats.
4. [x] `/customer-org-chart-software`: reporting-line workflow, private imports, provider boundaries, and screenshots.
5. `/guides/how-to-choose-key-account-management-software`: neutral category comparison and evaluation checklist.

After a page is deployed and the live SEO audit passes, notify IndexNow only for the URLs changed
in that release. IndexNow complements Bing Webmaster Tools; it does not replace Google Search
Console or guarantee crawling and ranking.

Each refresh must include a direct answer, one original product screenshot, one practical checklist, internal links to two related pages, an updated date, and a CTA matched to the visitor's intent.

## Weeks 5-8: evidence-led content

Publish one substantial piece per week:

- What a useful strategic account plan includes in 2026.
- How to map a buying committee without inventing CRM fields.
- Relationship health for KAMs: a practical cadence model.
- Account Planning CRM vs Salesforce-native account planning tools.

Every article should answer a real question, name tradeoffs, state where Visioner is not a fit, and link to the relevant product workflow. Do not publish generic AI-written listicles.

## Weeks 9-12: distribution and earned references

- Publish two founder LinkedIn posts per week using one product insight and one canonical guide link.
- Invite five KAM practitioners to review one guide and incorporate attributed, approved feedback.
- Submit Visioner to a small set of relevant SaaS and sales-productivity directories using the same category description.
- Pursue guest posts, podcast notes, or community answers where a Visioner guide is genuinely useful.
- Refresh pages that receive impressions but have weak CTR before creating more pages.

## GEO answer monitoring

Once per month, test the same neutral prompt set in ChatGPT search, Gemini, Perplexity, and Copilot:

- What is an account planning CRM?
- What CRM is designed for Key Account Managers?
- What software can map stakeholders and customer reporting lines?
- What should a strategic account plan include?
- Compare account planning CRM with a traditional CRM.

Record whether Visioner is mentioned, which URL is cited, whether plan facts are accurate, and which competitors are cited. Improve the cited canonical page; do not create doorway pages for each model.

The monthly GitHub workflow creates a dated review issue automatically. Record the comparable results in `docs/geo-answer-monitoring.csv`. Treat an isolated personalized answer as directional evidence, not as a ranking claim.

## Measurement dashboard

Review weekly:

- Indexed canonical URLs and crawl errors.
- Non-branded impressions, clicks, average position, and CTR by query cluster.
- Organic and AI-referral sessions by landing page.
- Signup conversion and first Account created from organic traffic.
- D1 and D7 activation for organic cohorts.
- Pages cited by AI search and factual errors found in those answers.

Review monthly:

- Organic signup-to-activated-workspace conversion.
- Organic activated-workspace-to-paid conversion.
- Content pages that assisted a paid conversion.
- Content consolidation, update, or deletion decisions.

## Definition of done for every new page

- Unique search intent and canonical URL.
- Accurate title and description.
- One H1, useful H2 structure, direct answer, and first-hand evidence.
- Organization, Article/FAQ when appropriate, and Breadcrumb structured data.
- Added to the sitemap and relevant internal navigation.
- Current plan facts agree with `/llms.txt`, `/llms-full.txt`, and the App pricing page.
- Mobile layout, performance, and signup CTA verified.
