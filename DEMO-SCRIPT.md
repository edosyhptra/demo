# Presenter Script (15–20 minutes)

## 1. Baseline: scan main (2 min)

Run the GitHub Actions workflow or local scanner after the project exists in SonarQube. Start at the Overview and state: “This is intentionally unsafe code, so a failed Quality Gate is a successful demo result.” Show the gate conditions on **new code**.

## 2. Core SAST and taint flow (4 min)

Open the issue on `/diagnostics/ping`. The source is an HTTP query parameter; the sink is `child_process.exec`. Explain that taint analysis follows data, not just a keyword. Repeat briefly with `/documents` for a path traversal / arbitrary file-read discussion.

## 3. Security Hotspots (3 min)

Navigate to Security Hotspots. Pick CORS or the open redirect. Mark neither safe nor fixed until the team knows permitted origins / redirect destinations. This distinguishes a review-required hotspot from a confirmed vulnerability.

## 4. Secrets and remediation (2 min)

Show the fake token-shaped string. Emphasize it is inert, but real credentials must be revoked immediately, removed from history, and supplied at runtime via a secret manager or CI secret. Do not demonstrate real credentials.

## 5. Advanced Security: SCA, risks, SBOM, Advanced SAST (5 min)

With an Enterprise Server license plus Advanced Security, open **Dependencies** and then **Dependency Risks**. Filter a direct dependency risk, explain severity and upgrade path, and export a CycloneDX or SPDX SBOM. Mention that SCA uses manifests and lockfiles; Advanced SAST extends analysis into the open-source dependency interaction surface.

## 6. PR enforcement (3 min)

Create branch `demo/new-risk`, add an insecure code line, and open a PR. The GitHub workflow runs tests, coverage, SBOM generation, and Sonar analysis. Its Quality Gate check blocks merge until the introduced issue is fixed. Analyze `main` first so the target-branch baseline exists.
