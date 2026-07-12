# Google Search Console Submission Checklist

Last updated: July 12, 2026

Purpose: make `Visioner`, `Visioner CRM`, and the core Account Planning CRM pages discoverable in Google as quickly as possible after launch.

## 1. Verify The Domain Property

- Create a Google Search Console Domain Property for `visioner.cc`.
- Use DNS verification.
- Add the TXT record in Cloudflare DNS for `visioner.cc`.
- Keep the TXT record after verification; do not delete it.

## 2. Submit The Sitemap

Submit this sitemap:

```text
https://www.visioner.cc/sitemap.xml
```

Current sitemap coverage:

- Homepage
- Privacy, Terms, Support
- `llms.txt` for AI crawler context
- `site.webmanifest` for web app identity
- 14 keyword landing pages
- Guides hub
- 4 educational guide pages

## 3. Request Indexing For Priority URLs

Use URL Inspection and request indexing in this order.

### Brand And Category Pages

```text
https://www.visioner.cc/
https://www.visioner.cc/account-planning-crm
https://www.visioner.cc/crm-for-key-account-managers
https://www.visioner.cc/key-account-management-crm
https://www.visioner.cc/key-account-management-software
https://www.visioner.cc/key-account-manager-tools
```

### Feature Pages

```text
https://www.visioner.cc/account-mapping-software
https://www.visioner.cc/customer-org-chart-software
https://www.visioner.cc/stakeholder-mapping-crm
https://www.visioner.cc/relationship-mapping-software
https://www.visioner.cc/account-plan-template
https://www.visioner.cc/traditional-crm-vs-account-planning-crm
```

### Guide Pages

```text
https://www.visioner.cc/guides
https://www.visioner.cc/guides/account-mapping-guide-for-key-account-managers
https://www.visioner.cc/guides/what-should-an-account-plan-include
https://www.visioner.cc/guides/how-to-map-stakeholders-in-a-strategic-account
https://www.visioner.cc/guides/crm-for-key-account-managers
```

## 4. First Checks After Submission

Check after 24-48 hours:

- Pages show as discovered or crawled in Search Console.
- Sitemap is read successfully.
- Homepage appears for a `site:visioner.cc Visioner CRM` query.

Check after 3-7 days:

- Indexed page count.
- Queries that generate first impressions.
- Whether Google is showing `Visioner`, `Visioner CRM`, or page titles as expected.

## 5. Weekly Metrics

Track every Monday:

- Indexed pages
- Impressions by query
- Clicks by query
- Top pages by impressions
- Homepage to signup clicks
- Keyword page to signup clicks
- Free signups by source

## 6. External Signals To Create

Google will not trust a brand only because the site exists. Create early external references:

- Add `https://www.visioner.cc` to both GitHub repo About sections.
- Create a LinkedIn company page and link back to the homepage.
- Publish founder LinkedIn posts using the drafts in `docs/visioner-founder-launch-content.md`.
- Submit to startup directories and SaaS directories.
- Ask beta users, advisors, or founder friends to mention Visioner in posts or newsletters.
- When submitting to directories, use the exact phrase "Account Planning CRM for Key Account Managers" in the product description.

## 7. Minimum Success Criteria

The initial SEO setup is healthy when:

- `https://www.visioner.cc/sitemap.xml` is accepted in Search Console.
- Homepage is indexed.
- At least 10 keyword or guide pages are indexed.
- `site:visioner.cc Visioner CRM` returns the homepage.
- Search Console shows first impressions for KAM, account planning, account mapping, or stakeholder mapping queries.
