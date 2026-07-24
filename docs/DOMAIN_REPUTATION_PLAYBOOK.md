# Visioner Domain Reputation Playbook

## Purpose

Keep `visioner.cc` trustworthy, reachable, and easy to investigate when an ISP or
security vendor produces a false positive. This playbook covers the public
marketing domain only. It does not expose CRM customer data.

## Permanent Controls

1. Use `https://www.visioner.cc` as the canonical public URL.
2. Redirect all HTTP and apex-domain requests to the canonical HTTPS URL while
   preserving the full path and query string.
3. Keep TLS, HSTS, `nosniff`, referrer policy, and restricted browser permissions
   enabled on every public response.
4. Publish `/.well-known/security.txt` with a monitored security contact.
5. Keep Privacy, Terms, Support, robots.txt, and sitemap.xml publicly reachable
   without login or an interactive browser challenge.
6. Never apply a blanket Cloudflare challenge to public marketing pages. Use
   Turnstile only for sign-up, login, and high-risk writes, with email-code
   fallback where appropriate.
7. Require MFA for Cloudflare, GitHub, the domain registrar, and production email.
8. Keep DNS, source control, and Cloudflare access limited to named administrators.
9. Keep transactional and inbound-email workflows separated from marketing mail.
10. Maintain SPF, DKIM, and DMARC for every domain that sends Visioner email.

## Automated Daily Evidence

The `Domain reputation monitor` GitHub Action checks:

- HTTP and apex-domain canonical redirects.
- Homepage, Privacy, Terms, robots.txt, sitemap.xml, and security.txt status.
- Absence of Cloudflare challenge-page signatures on public content.
- HSTS, `nosniff`, referrer policy, canonical URL, and expected content types.

Each run uploads a JSON evidence artifact retained for 30 days. A critical
failure makes the workflow fail and sends the repository's normal Actions alert.

## Weekly Manual Review

Run this review every Monday and record the date, reviewer, and result:

- Google Search Console Security Issues and Manual Actions.
- Google Safe Browsing Site Status.
- Bing Webmaster Tools crawl and security reports.
- VirusTotal URL and domain reputation.
- URLVoid or a comparable multi-vendor reputation check.
- Cloudflare Security Events for challenge loops, unusual countries, and spikes.
- DNS changes, certificate status, GitHub deployments, and unexpected redirects.
- Resend/Zoho bounce rate, complaint rate, SPF, DKIM, and DMARC status.

## Release Checklist

- Production build passes.
- Domain monitor passes against staging where available.
- Public pages do not require Turnstile.
- No new third-party script was added without owner and purpose documentation.
- No browser-console secrets, API keys, or source maps expose sensitive values.
- Canonical links, sitemap, robots.txt, Privacy, Terms, and security.txt remain valid.
- Production smoke test and domain reputation monitor pass after deployment.

## False-Positive Response

1. Capture the warning page, timestamp, ISP/vendor, browser, country, and URL.
2. Confirm HTTPS, redirects, public pages, DNS, certificate, and Cloudflare events.
3. Run the domain monitor and preserve its JSON artifact.
4. Check Google, Bing, VirusTotal, and at least one multi-vendor reputation service.
5. Submit a false-positive appeal to the blocking ISP/vendor with:
   - canonical domain and affected URLs;
   - company/product purpose;
   - proof of domain ownership;
   - clean third-party scan results;
   - recent deployment SHA and monitor evidence;
   - security contact and remediation summary.
6. Record the case number and follow up after three business days.
7. Do not change domains to evade a block; repair or appeal the reputation record.

## Incident Log Template

| Field | Value |
| --- | --- |
| Detected at | |
| Reporter / network | |
| Affected URL | |
| Warning vendor | |
| Screenshot | |
| Monitor artifact | |
| Cloudflare evidence | |
| External scan results | |
| Appeal case number | |
| Resolution time | |
| Root cause / false positive | |
| Preventive action | |

## Service Targets

- Detect public availability or redirect failures within 24 hours.
- Acknowledge a seed-user access report within 4 business hours.
- Submit a false-positive appeal within 1 business day after verification.
- Preserve at least 30 days of automated evidence.
