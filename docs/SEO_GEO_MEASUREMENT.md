# Visioner SEO and GEO Measurement Standard

## Objective

Measure whether Visioner is becoming easier to discover, easier for search and
answer engines to understand, and more likely to produce qualified SaaS trials.
Do not use page count or keyword stuffing as success metrics.

## Weekly scorecard

Record the same seven measures every Monday:

| Metric | Source | Baseline | 90-day target |
| --- | --- | --- | --- |
| Valid indexed canonical pages | Google Search Console | Record first clean week | 100% of submitted canonical pages |
| Non-brand search impressions | Search Console | Record first clean week | Positive 4-week trend |
| Qualified organic clicks | Search Console + app analytics | Record first clean week | Positive 4-week trend |
| `signup_started` from organic | Visioner analytics | Record first clean week | Improve conversion, not raw traffic |
| `signup_completed` from organic | Visioner analytics | Record first clean week | At least 50% of organic signup starts |
| Citation presence in answer engines | Manual prompt set | Record first clean week | Visioner cited in 3 of 10 tracked prompts |
| Domain trust checks passed | GitHub workflow | First successful report | 100% daily pass rate |

## SEO test set

Track these query families, not only exact-match rankings:

1. CRM for Key Account Managers
2. account planning CRM
3. key account management software
4. stakeholder mapping for strategic accounts
5. customer org chart software
6. relationship health CRM
7. account plan software for KAM
8. strategic account management tools

For each family, record impressions, clicks, average position, landing page, and
signup conversion. Compare rolling four-week windows to reduce daily noise.

## GEO test set

Run the same prompts monthly in ChatGPT, Perplexity, Gemini, and Copilot:

1. What CRM is designed specifically for Key Account Managers?
2. What tools help a KAM build an account plan and stakeholder map?
3. What is a lightweight alternative to Salesforce for strategic account work?
4. What software tracks relationship health across a customer organization?
5. What is the best account planning CRM for an individual KAM?
6. How can I map a buying committee and decision chain?
7. Which CRM combines tasks, projects, org charts, and account intelligence?
8. What software can enrich a customer org chart with THE ORG or Apollo?
9. What is a good daily workspace for enterprise account managers?
10. What tools create an always-presentable account plan?

For every engine and prompt, record:

- Whether Visioner is mentioned.
- Whether `visioner.cc` is cited.
- Whether the description is accurate.
- Which competitors are cited.
- Which source page appears to support the answer.

## Content acceptance criteria

A new public page should ship only when it:

- Answers one clear KAM question better than an existing page.
- Includes an identifiable author or company source, updated date, and direct
  product evidence.
- Links to a relevant product workflow and one related guide.
- Uses one canonical URL and appears in the sitemap.
- Has a unique title, description, H1, and social preview.
- Contains no unsupported market-share, customer, or performance claim.
- Can be summarized accurately without relying on hidden content.

## Evidence cadence

- Daily: automated domain trust report.
- Weekly: Search Console and signup scorecard.
- Monthly: GEO prompt set and competitor citation review.
- Quarterly: remove or consolidate pages that attract no impressions, useful
  citations, backlinks, or qualified sessions.
