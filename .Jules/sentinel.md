## 2025-01-24 - Missing Security Headers on Static Assets
**Vulnerability:** Static assets served via `env.ASSETS` in Cloudflare Workers do not inherit security headers by default.
**Learning:** Workers act as a proxy. If you don't explicitly wrap the `env.ASSETS.fetch` response, the browser receives the raw asset headers, missing critical protections like CSP and HSTS.
**Prevention:** Always wrap `env.ASSETS.fetch` calls with a helper that applies a baseline security policy.
