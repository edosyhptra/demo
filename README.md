# SonarQube Security Demo

> **Purposefully insecure training application.** Its vulnerable routes and fake token are demo fixtures only. Do not deploy, expose, or reuse them.

A compact Node.js project for demonstrating SonarQube SAST, Security Hotspots, taint analysis, secret detection, Quality Gates, CI/PR analysis, and (with Advanced Security) SCA, SBOM, dependency risks, and Advanced SAST.

## What is deliberately included

| SonarQube capability | Demo location / expected conversation |
| --- | --- |
| SAST and taint analysis | `GET /diagnostics/ping` passes `req.query.host` to `exec`; `GET /documents` passes `req.query.path` to `readFileSync`. |
| Security Hotspots | permissive CORS, `eval`, open redirect, and weak crypto in `src/server.js`. Review each finding in SonarQube rather than blindly resolving it. |
| Secret detection | fake, inert GitHub PAT and Slack-token-shaped values in `src/demo-secrets.js`; neither can authenticate anywhere. |
| Code quality | concentrated branching in `decideCreditBand`; intentionally limited test coverage. |
| SCA / dependency risks | pinned old package versions in `package.json` and resolved dependency graph in `package-lock.json`. |
| SBOM | `npm run sbom` produces `reports/sbom.cdx.json`; Advanced Security can also export CycloneDX or SPDX from its Dependencies view. |
| CI + PR workflow | `.github/workflows/sonarqube.yml` tests, scans, and lets the repository receive the Quality Gate result. |
| Advanced SAST candidate | `GET /integrations/preview` passes `req.query.url` into the `axios` dependency, creating an application-to-open-source code boundary for analysis. A finding is dependent on the licensed server's analyzer/rules; do not label it Advanced SAST unless the scan confirms it. |

## Setup

1. Use Node.js 20 or later, then run `npm install` once to produce the lockfile.
2. Create a SonarQube project using the key in `sonar-project.properties`.
3. Add `SONAR_TOKEN` as a GitHub Actions secret and `SONAR_HOST_URL` as an Actions variable. For a local scan, export both variables and run `npm run test:coverage && npm run scan`. Do not pass `-Dsonar.sources=.`: the project configuration already separates `src/` from `test/`.
4. Analyze `main` before opening a PR. Create a small PR that adds or edits an insecure route; the workflow reports only new-code results and the PR Quality Gate.

## Secret Detection demo

`src/demo-secrets.js` contains deliberately invented token-shaped strings for this training project only. After scanning, use **Issues** and filter **Language: Secrets** (or search for `secret`) to show the findings. Explain that a real exposed credential must be revoked, removed from code and history, and replaced by a runtime secret from a secret manager; simply deleting the line is not sufficient.

## Quality Gate suggested for the demo

Create **BTPN Demo Gate** and associate it with this project:

- New blocker issues: `> 0` fails
- New vulnerabilities: `> 0` fails
- New security hotspots reviewed: `< 100%` fails
- New coverage: `< 80%` fails
- New duplicated lines density: `> 3%` fails

The provided code should initially fail; that is the intended teaching moment. Fix or remove the demo fixtures before adopting any part of the project.

## Advanced Security prerequisite

For SonarQube Server, Advanced Security is an Enterprise add-on and SCA must be enabled by an instance administrator under **Administration > Configuration > General Settings > Advanced Security**. The server needs outbound access for current dependency intelligence. Ensure the project includes `package.json` and `package-lock.json` (generated below).

## Suggested live demo order

1. Run the main-branch scan and show Issues, Security Hotspots, measures, and the failed gate.
2. Open `/diagnostics/ping` and trace `host` as untrusted input to OS command execution (taint path).
3. Review the CORS or redirect hotspot and explain why it needs context-driven review.
4. Filter Security issues for the fake secret, then explain secure secret storage in CI.
5. In **Dependencies / Dependency Risks**, filter direct vs transitive risk and inspect a remediation recommendation.
6. Export an SBOM from SonarQube and compare it with the local CycloneDX artifact.
7. Open a PR that introduces one new issue, watch the GitHub check fail, then fix it and show the gate passing.

See [DEMO-SCRIPT.md](DEMO-SCRIPT.md) for presenter-ready wording and [docs/REMEDIATION.md](docs/REMEDIATION.md) for safe equivalents.
