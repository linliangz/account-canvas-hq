# Visioner 100-point SEO / GEO scorecard

The score is an operating instrument, not a marketing claim. Every point must be
traceable to a live audit, Search Console/Bing export, answer-engine response, or
dated reputation check.

## Score structure

| Category | Points | What earns the points |
| --- | ---: | --- |
| Technical SEO | 30 | Crawl discovery 4; canonicalization 5; availability 4; metadata/H1 5; structured data 3; favicon/manifest 3; image alternatives 3; guide discovery/internal links 3 |
| Organic Search | 30 | Measurement connection 3; index coverage 7; priority-query coverage 7; non-brand visibility 5; qualified clicks 4; organic conversion 4 |
| GEO | 30 | Brand mention 8; citation 8; linked citation 5; positioning accuracy 4; landing-page fit 5 |
| Trust / Reputation | 10 | Canonical redirects 2; TLS/security headers 2; public trust pages 2; identity/support 2; external reputation evidence 2 |
| **Total** | **100** | |

The machine-readable source of truth is
`config/seo-geo-scorecard.json`. Do not change weights only in this document.

## Two numbers must always be reported

1. **Verified lower-bound score / 100**: unmeasured evidence earns no points.
2. **Measured-criteria score / 100**: earned points divided only by the maximum
   that had evidence.

Also report measurement coverage. For example, `34/100 verified`, `85/100 across
measured criteria`, and `40% evidence coverage` is honest; reporting `85/100` alone
would hide missing GSC, Bing, or GEO evidence.

## Day 0 and weekly operation

1. Run `npm run baseline:seo-geo` to create dated workbooks.
2. Run `npm run audit:technical` and `npm run audit:trust` against production.
3. Export Google Search Console and Bing data into the dated CSV files.
4. Complete the fixed GEO prompt workbook only from visible responses and citations.
5. Run `npm run audit:scorecard`.
6. Keep the dated JSON and Markdown in `reports/`; `latest.*` is the current view.

The Monday GitHub Action repeats the live checks, refreshes Search Console when its
read-only identity is available, saves artifacts, and commits report history.

## Evidence rules

- Missing is not zero traffic, zero citations, or a clean reputation result. It is
  reported as unmeasured and earns no verified points.
- Do not infer index coverage from the sitemap or rank from an unauthenticated search.
- A GEO mention is not a citation. A citation is not linked unless a visible URL is
  clickable in the answer.
- Use the same ten neutral prompts, four engines, and three clean-session runs each
  month. Do not personalize the prompt to force Visioner into the answer.
- Never enter invented customers, market position, rankings, or performance results.

## 90-day thresholds

| Metric | Threshold |
| --- | ---: |
| Indexed canonical URL coverage | at least 95% |
| Priority queries with impressions | at least 6 |
| Non-brand impressions in 28 days | at least 100 |
| Qualified non-brand clicks in 28 days | at least 20 |
| Completed organic signups in 28 days | at least 5 |
| GEO mention rate | at least 15% |
| GEO positioning accuracy when mentioned | at least 90% |
| Material unsupported claims | 0 |

Thresholds are targets, not current results. Change them only after a reviewed
baseline and keep the prior report history intact.
