# Visioner Trust / Reputation Audit

- Generated: 2026-07-24T09:06:57.186Z
- Score: **8/10**
- Measured maximum: 8/10
- Passed checks: 12
- Failed checks: 0
- Unmeasured checks: 1

## Scoring

| Criterion | Score | Maximum | Evidence |
| --- | ---: | ---: | --- |
| canonicalRedirects | 2.00 | 2 | 3/3 |
| transportAndHeaders | 2.00 | 2 | 2/2 |
| publicTrustPages | 2.00 | 2 | 5/5 |
| identityAndSupport | 2.00 | 2 | 2/2 |
| externalReputationEvidence | 0.00 | 2 | Not measured |

## Checks

| Result | Group | Check | Evidence |
| --- | --- | --- | --- |
| PASS | canonicalRedirects | http://www.visioner.cc | HTTP 308; https://www.visioner.cc/guides?source=trust-audit |
| PASS | canonicalRedirects | http://visioner.cc | HTTP 308; https://www.visioner.cc/guides?source=trust-audit |
| PASS | canonicalRedirects | https://visioner.cc | HTTP 308; https://www.visioner.cc/guides?source=trust-audit |
| PASS | transportAndHeaders | Conservative response headers | All expected headers passed |
| PASS | transportAndHeaders | TLS certificate | 69 days remaining; expires Oct  2 05:24:52 2026 GMT |
| PASS | publicTrustPages | /privacy | HTTP 200; marker=true |
| PASS | publicTrustPages | /terms | HTTP 200; marker=true |
| PASS | publicTrustPages | /support | HTTP 200; marker=true |
| PASS | publicTrustPages | /about | HTTP 200; marker=true |
| PASS | publicTrustPages | /.well-known/security.txt | HTTP 200; marker=true |
| PASS | identityAndSupport | Organization structured data | HTTP 200; Organization=true |
| PASS | identityAndSupport | Operator and support identity | operator=true; support=true |
| UNMEASURED | externalReputationEvidence | External reputation checks | No completed rows in baselines/2026-07-24-post-release/reputation-baseline.csv |

External reputation services are manual evidence. Missing rows remain unmeasured and
do not become a fabricated clean result.
