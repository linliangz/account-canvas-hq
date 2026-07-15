# Visioner SEO and GEO execution plan

Updated: 2026-07-15
Owner: Founder until a growth owner is assigned
Primary category: Account Planning CRM for Key Account Managers

Weekly operating instructions: `docs/visioner-seo-geo-founder-runbook.md`

## Outcomes

Within 90 days, establish repeatable discovery rather than publishing more near-duplicate keyword pages.

- Google indexes every canonical product and guide page without sitemap or structured-data errors.
- Visioner appears for branded searches and begins earning impressions for account planning CRM, CRM for Key Account Managers, account mapping software, and customer org chart software.
- AI search systems can retrieve a current, factual description of Visioner, its plan boundaries, and canonical sources.
- Organic visitors can be connected to signup, activation, and paid conversion events.

### 90-day operating targets

These are execution targets, not ranking promises. Search demand, crawl timing, and AI answers are
outside Visioner's direct control.

| Checkpoint | Controllable target                                                                    | Evidence target                                                                                      |
| ---------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Day 14     | Search Console and Bing verified; sitemap accepted; weekly report connected            | Baseline indexed/excluded URLs and first branded-query record                                        |
| Day 30     | Four authority pages refreshed; eight founder posts; four practitioner review requests | Brand query indexed; first non-branded impressions recorded                                          |
| Day 60     | Four evidence-led guides distributed; eight useful community contributions             | At least 100 non-branded impressions in 28 days and five attributed organic signups                  |
| Day 90     | Twelve weekly cycles completed; weak pages refreshed or consolidated                   | At least 500 non-branded impressions in 28 days, ten organic signups, and three activated workspaces |

If evidence targets are missed, keep the execution cadence but change the page, distribution channel,
or positioning. Do not compensate by producing near-duplicate keyword pages.

## Operating rules

1. Keep one canonical page per search intent. Improve or consolidate weak pages instead of cloning another keyword variation.
2. Publish first-hand product evidence: screenshots, workflows, limitations, pricing, and implementation details.
3. Put a direct answer near the top of every guide, followed by practical steps and related sources.
4. Date every guide and review product claims whenever plan capabilities change.
5. Never describe Preview features as generally available.
6. GEO is not keyword stuffing for AI. It is consistent facts, clear entity names, crawlable pages, direct answers, and evidence that can be cited.
7. Redirect overlapping pages into the strongest canonical answer. On 2026-07-14, the duplicate KAM guide was consolidated into `/crm-for-key-account-managers` with a permanent redirect.

## Week 1: technical baseline

- [x] Verify the `visioner.cc` Domain Property in Google Search Console.
- [x] Submit `https://www.visioner.cc/sitemap.xml`. It was resubmitted successfully on 2026-07-14 after the first asynchronous fetch failed; keep this item under observation until Google reports discovered pages.
- [ ] Record indexed/excluded counts after Search Console finishes processing page-indexing data.
- [ ] Add Bing Webmaster Tools and submit the same sitemap.
- [x] Confirm `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/llms-full.txt` return HTTP 200 without a browser challenge.
- [x] Run `npm run validate:seo-geo` in every website pull request.
- [x] Run `npm run audit:seo-live` every Monday as part of the consolidated growth sprint.
- [x] Host an IndexNow verification key and use `npm run indexnow:submit -- /changed-path` after publishing materially updated pages.
- [x] Connect signup events to source, landing page, and campaign parameters without storing sensitive account content.
- [x] Capture the first search baseline: 6 non-branded impressions, 0 clicks, 0% CTR, and average position 58 on 2026-07-14. The first five queries were `account planning software`, `best key account management software`, `account mapping`, `account management software`, and `mapping accounts`.
- [ ] Add indexed/excluded pages, Core Web Vitals, and organic signup conversion after those reports contain data.
- [x] Add a weekly Search Console report for 28-day branded/non-branded performance, top queries, top pages, and low-CTR opportunities.

### First live baseline — 2026-07-14

- Domain Property: verified for `visioner.cc`.
- Search visibility: 6 impressions, 0 clicks, 0% CTR, average position 58.
- Query evidence: five early non-branded queries aligned with account planning and account mapping.
- Page indexing: Google is still processing data; unavailable is intentionally left blank in the scorecard.
- Sitemap: both the canonical `www` URL and apex URL returned HTTP 200 with valid XML. The apex sitemap was resubmitted successfully in Search Console after the first fetch failure.
- Product acquisition baseline: 3 signups, 1 activated workspace, and 1 paid workspace across all sources. Do not label these as organic until attribution data proves it.

The immediate decision is to improve and distribute the existing canonical account-planning pages. Six impressions are directional evidence, not enough volume for title or CTR experiments.

### Search Console automation

Search Console reporting is live through GitHub-to-Google Workload Identity Federation. GitHub
receives a short-lived `webmasters.readonly` token for each run; no service-account JSON key is
stored in GitHub or on a developer machine. The first keyless workflow passed on 2026-07-14 and the
weekly growth sprint produced a connected report on 2026-07-15.

Keep these safeguards in place:

1. Restrict the Workload Identity provider to `linliangz/account-canvas-hq`.
2. Keep the workflow scope at `webmasters.readonly`.
3. Do not add a long-lived Google credential unless keyless authentication is unavailable and the
   exception is documented.
4. Confirm every weekly artifact reports `connected` before interpreting missing values as zero.

### Product acquisition automation setup

The weekly sprint can also include a rolling 28-day signup-to-paid baseline without exposing user
identity or workspace content:

1. Add the existing Visioner Founder Ops token to the website repository secret
   `VISIONER_ADMIN_TOKEN`.
2. Run `Visioner weekly growth sprint` manually once.
3. Confirm that the issue includes signups, first Account, activation rate, paid conversion, and the
   source/campaign/landing breakdown.
4. Confirm that the `visioner-growth-performance` artifact contains aggregate data only.

Each sprint also generates `artifacts/growth-links.md` with one distinct tracked URL for the two
LinkedIn posts, community contribution, and KAM review request. Use those URLs exactly as generated.
It also generates `artifacts/seo-geo-content-kit.md`, containing week-specific drafts for those four
actions. The drafts include the week's product evidence, one meaningful limitation, and explicit
placeholders for founder experience; every placeholder must be replaced truthfully or removed before
publication.
The same artifact includes that week's required product evidence, distribution commitment,
measurement target, four content angles, and a seven-day decision record. This keeps execution
grounded in first-hand evidence rather than auto-publishing generic marketing copy.
The website keeps the latest campaign parameters in session storage and passes them to signup, so a
visitor may browse another Visioner page before registering without becoming `direct / unknown`.
Campaign URLs contain only channel metadata; never put a person's name, email, company, account, or
other customer information in UTM parameters.

The dedicated endpoint does not return names, email addresses, account names, customer domains,
prompts, or workspace content. Do not substitute the broader Founder Ops registrations endpoint in
growth automation.

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

Every Monday, the `Visioner weekly growth sprint` workflow creates one GitHub issue that turns this
plan into an operating checklist. Complete one canonical-page improvement, two founder LinkedIn
posts, one relevant community contribution, one KAM review request, and one measurement update.
The goal is one evidence-producing cycle per week, not a larger volume of lightly differentiated
pages.

Use the founder runbook's two-hour timebox: 15 minutes to read evidence, 30 minutes to improve one
canonical answer, 60 minutes to distribute useful evidence, and 15 minutes to record a decision.

Before creating or refreshing the issue, the workflow generates one consolidated operating brief from the live
technical audit, Search Console, aggregate signup-to-paid attribution, and the current row of the
12-week roadmap. Re-running the workflow in the same week updates the existing issue body instead of
adding duplicate comments. An unconnected source is labeled `Manual setup required`; it is never
converted to zero. The resulting JSON and Markdown artifacts are retained for 90 days, while the
manually updated scorecard remains the historical decision log.

The week-by-week owner, deliverable, and completion evidence are tracked in
`docs/seo-geo-90-day-roadmap.csv`. A row is complete only when its URL, distribution links, reviewer
feedback, and measured result are recorded in the weekly GitHub issue.

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
