# Visioner Domain Reputation Response Playbook

## Purpose

This playbook protects the public reputation of `visioner.cc` and provides a
repeatable response when a browser, ISP, DNS provider, or security vendor
incorrectly blocks the website.

## Canonical public surface

- Primary website: `https://www.visioner.cc`
- SaaS application: `https://app.visioner.cc`
- Staging application: `https://staging.app.visioner.cc`
- Security contact: `support@visioner.cc`
- Security disclosure file:
  `https://www.visioner.cc/.well-known/security.txt`

All requests for `visioner.cc` and insecure HTTP website URLs must redirect in
one hop to the equivalent `https://www.visioner.cc` URL. Do not publish or
promote alternate Pages, Lovable, preview, shortened, or raw-IP URLs.

## Daily automated checks

The `Trust and domain health` GitHub Actions workflow checks:

- HTTPS availability and the Visioner brand response
- One-hop apex and HTTP redirects
- HSTS and baseline browser security headers
- `robots.txt`, `sitemap.xml`, and `security.txt`
- Production and staging application availability

A failed run is an incident signal and should be investigated before making
unrelated production changes.

## Incident response

1. Record the exact blocked URL, date, time, country, ISP, browser, security
   product, warning text, and a screenshot.
2. Confirm whether the blocked URL uses HTTP, the apex domain, `www`, `app`, or
   another subdomain.
3. Run the automated trust workflow manually and preserve the run URL.
4. Confirm DNS, TLS certificate validity, canonical redirects, and the public
   security files from a network outside the affected ISP.
5. Check Google Search Console, Bing Webmaster Tools, Google Safe Browsing,
   VirusTotal, and vendor-specific reputation portals.
6. Submit a false-positive review to the blocking vendor. Include the canonical
   HTTPS URL, business purpose, contact details, evidence of clean scans, and
   the GitHub health-run URL.
7. Avoid changing domains or deploying speculative workarounds while the
   review is open. Such changes can fragment reputation signals.
8. Retest after the vendor's stated review window and record the result.

## Preventive controls

- Keep Privacy, Terms, Support, and company identity reachable without login.
- Keep all production dependencies patched and remove abandoned scripts,
  preview domains, and third-party badges.
- Do not serve mixed HTTP content, open redirects, arbitrary user HTML, or
  untrusted file downloads from the marketing domain.
- Keep authentication, admin, and user-generated content on `app.visioner.cc`,
  not the marketing website.
- Do not use `visioner.cc` for unsolicited bulk email. Keep transactional mail
  authenticated with SPF, DKIM, and DMARC, and monitor bounce/complaint rates.
- Never expose API keys, admin tokens, source maps containing secrets, or
  private customer data in public assets.
- Use the canonical `www` URL consistently in schema, social profiles,
  directories, search consoles, and outbound links.

## Review cadence

### Weekly

- Review failed GitHub health runs and Cloudflare security events.
- Review new dependencies and production deploy history.
- Verify that marketing CTAs still point only to official Visioner domains.

### Monthly

- Review Google Search Console and Bing Webmaster Tools security notices.
- Check domain reputation with at least two independent scanners.
- Review DMARC, mail complaints, and bounce trends.
- Confirm that Privacy, Terms, Support, `security.txt`, and the sitemap remain
  public and accurate.

### Quarterly

- Rotate privileged tokens and review Cloudflare/GitHub account access.
- Review DNS records and remove unused subdomains.
- Run a dependency and exposed-secret audit.
- Update this playbook and the `security.txt` expiry date when needed.

## False-positive appeal evidence package

Prepare one folder containing:

- Warning screenshot and affected network details
- Canonical URL and redirect trace
- TLS and security-header results
- Google/Bing security status screenshots
- Independent clean-scan links
- Business description and legal entity
- Privacy, Terms, Support, and `security.txt` links
- Recent deployment commit and successful health workflow
- A short statement that Visioner is an account-planning SaaS and does not
  distribute executables or unsolicited marketing email from the website
