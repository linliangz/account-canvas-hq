# Visioner SEO/GEO founder runbook

Updated: 2026-07-14  
Owner: Founder  
Time budget: two focused hours per week, plus one 45-minute one-time setup

This runbook turns the 90-day plan into a small operating routine. The goal is not more pages. The
goal is to make one canonical answer easier to discover, more useful to a KAM, and more likely to
produce an activated Visioner workspace.

## One-time indexing gate — 45 minutes

Complete this before interpreting rankings or impressions.

1. ~~Verify the `visioner.cc` Domain Property in Google Search Console with a DNS TXT record.~~ Completed 2026-07-14.
2. Submit `https://www.visioner.cc/sitemap.xml` and record the accepted URL count. Resubmitted successfully 2026-07-14; wait for asynchronous processing before recording discovered pages.
3. Create a read-only Search Console service account and save its JSON key in the website GitHub
   secret `GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON`.
4. Add `visioner.cc` to Bing Webmaster Tools by importing the Search Console property or using DNS
   verification, then submit the same sitemap.
5. Run the `Visioner live SEO audit` GitHub workflow once and confirm that its artifact contains
   Search Console data rather than `Manual setup required`.
6. Delete any unencrypted local service-account JSON file after the GitHub secret works.

Current live baseline: 6 non-branded impressions, 0 clicks, and average position 58. Google page-indexing data is still processing. These values establish measurement; they are not yet evidence for changing titles or creating more pages.

Completion evidence belongs in GitHub issue
[`One-time SEO indexing gate — Search Console and Bing`](https://github.com/linliangz/account-canvas-hq/issues/2).

## Weekly two-hour cycle

### 1. Read evidence — 15 minutes

- Open the current `SEO/GEO growth sprint` GitHub issue.
- Read technical audit status, non-brand impressions and clicks, signup-to-first-Account activation,
  and paid conversions.
- Treat an unconnected source as missing, never as zero.
- Choose one canonical page only. Do not split attention across the entire site.

### 2. Improve one canonical answer — 30 minutes

Make one evidence-led improvement named in the 12-week roadmap:

- replace an outdated screenshot;
- add a direct answer to a real KAM question;
- state a meaningful limitation or not-fit case;
- clarify one workflow with before → action → outcome;
- incorporate one approved practitioner objection or quote;
- improve a title or description only when Search Console shows impressions with weak CTR.

Run `npm run validate:seo-geo` and `npm run audit:seo-live` before publishing. Notify IndexNow only
for materially changed URLs. Do not create a near-duplicate keyword page.

### 3. Distribute useful evidence — 60 minutes

- Publish one founder insight on LinkedIn using the tracked `founder_insight` URL.
- Publish or schedule one product workflow using the tracked `product_workflow` URL.
- Answer one real KAM or strategic-account question before mentioning Visioner; use the tracked
  community URL only when the canonical page genuinely helps.
- Ask one practicing KAM to challenge the workflow. Ask for criticism, not endorsement.

Never publish invented outcomes, customer identities, private account data, or unapproved quotes.

### 4. Record the decision — 15 minutes

Add the following evidence to the weekly GitHub issue:

- public post and contribution URLs;
- impressions, useful replies, and objections;
- attributed visits, signups, first Accounts, and paid conversions;
- one decision: keep, strengthen evidence, improve snippet, consolidate, or retire.

Update `docs/seo-geo-weekly-scorecard.csv` only with measured values. Leave unavailable metrics blank.

## Monthly GEO cycle — 45 minutes

Use the exact neutral prompts in the monthly GEO GitHub issue across ChatGPT Search, Gemini,
Perplexity, and Copilot. Record:

- whether Visioner is mentioned;
- the cited URL;
- whether product and plan facts are accurate;
- which competitors are cited;
- one improvement to an existing canonical page.

Do not create pages for individual AI systems. GEO work should improve the same source a human
visitor would use: direct answers, consistent product facts, original evidence, clear limitations,
current dates, and crawlable URLs.

## Decision rules

- **Indexed but no impressions after 28 days:** improve internal links and distribution; do not clone
  the page.
- **Impressions but CTR below 1% after at least 100 impressions:** test the title and description.
- **Visits but no signup:** strengthen the page-to-product CTA and show the relevant workflow.
- **Signups but no first Account:** fix onboarding or promise mismatch before driving more traffic.
- **AI answer cites Visioner incorrectly:** correct the canonical page, pricing facts, `llms.txt`, and
  `llms-full.txt` together.
- **No useful evidence after two refresh cycles:** consolidate or retire the page.

## 90-day success evidence

The 90-day plan is working when Visioner can show all of the following without personal or customer
content:

- branded search is indexed;
- non-brand impressions and clicks are growing from named query clusters;
- organic or AI-referral visitors create accounts and a first Account;
- at least a small number of those activated workspaces convert to paid;
- practitioners give repeatable objections or describe the same daily KAM problem;
- AI systems cite accurate Visioner category or workflow facts from canonical pages.

Rankings are an outcome, not a weekly task. The weekly task is one better answer, one distribution
cycle, one practitioner review, and one measured decision.
