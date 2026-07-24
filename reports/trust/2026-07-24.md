# Visioner Trust / Reputation Audit

- Generated: 2026-07-24T08:57:38.477Z
- Score: **4.53/10**
- Measured maximum: 8/10
- Passed checks: 7
- Failed checks: 5
- Unmeasured checks: 1

## Scoring

| Criterion | Score | Maximum | Evidence |
| --- | ---: | ---: | --- |
| canonicalRedirects | 1.33 | 2 | 2/3 |
| transportAndHeaders | 1.00 | 2 | 1/2 |
| publicTrustPages | 1.20 | 2 | 3/5 |
| identityAndSupport | 1.00 | 2 | 1/2 |
| externalReputationEvidence | 0.00 | 2 | Not measured |

## Checks

| Result | Group | Check | Evidence |
| --- | --- | --- | --- |
| FAIL | canonicalRedirects | http://www.visioner.cc | HTTP 200; Location missing |
| PASS | canonicalRedirects | http://visioner.cc | HTTP 308; https://www.visioner.cc/guides?source=trust-audit |
| PASS | canonicalRedirects | https://visioner.cc | HTTP 308; https://www.visioner.cc/guides?source=trust-audit |
| FAIL | transportAndHeaders | Conservative response headers | Missing or invalid: strict-transport-security, x-content-type-options, x-frame-options, referrer-policy, permissions-policy |
| PASS | transportAndHeaders | TLS certificate | 69 days remaining; expires Oct  2 05:24:52 2026 GMT |
| PASS | publicTrustPages | /privacy | HTTP 200; marker=true |
| PASS | publicTrustPages | /terms | HTTP 200; marker=true |
| PASS | publicTrustPages | /support | HTTP 200; marker=true |
| FAIL | publicTrustPages | /about | HTTP 200; marker=false |
| FAIL | publicTrustPages | /.well-known/security.txt | HTTP 404; marker=false |
| PASS | identityAndSupport | Organization structured data | HTTP 200; Organization=true |
| FAIL | identityAndSupport | Operator and support identity | operator=false; support=true |
| UNMEASURED | externalReputationEvidence | External reputation checks | No completed rows in baselines/2026-07-24/reputation-baseline.csv |

External reputation services are manual evidence. Missing rows remain unmeasured and
do not become a fabricated clean result.
