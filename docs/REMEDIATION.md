# Safe Equivalents (do not change until after the demo)

| Deliberate anti-pattern | Production direction |
| --- | --- |
| Shell command assembled from `req.query.host` | Avoid shell execution. Validate a hostname against an allowlist and use a dedicated library or `execFile` with fixed arguments. |
| File path from the request | Use server-generated IDs mapped to approved storage; canonicalize and constrain paths. |
| URL passed directly to `axios.get()` | Use a server-side allowlist of approved hosts and protocols; resolve and validate destinations before making an outbound request. |
| `eval` | Use a parser / allowlisted expression language, never dynamic JavaScript. |
| Open redirect | Allow only relative paths or an explicit allowlist of origins. |
| `cors()` | Set specific origins, methods, credentials, and headers needed by the application. |
| Hard-coded token | Revoke exposed credentials; obtain them from a secret manager or CI secret at runtime. |
| Old dependency pins | Upgrade and test the dependency; do not suppress an SCA risk without recorded ownership and justification. |
