## 2024-03-24 - Missing Security Headers on Frontend Assets
**Vulnerability:** The Cloudflare Worker was serving the React application via `env.ASSETS.fetch` without applying any security headers (CSP, HSTS, X-Frame-Options, etc.). The strict headers were only applied to the `/api` route.
**Learning:** In Cloudflare Workers with `env.ASSETS` (Workers Sites or Pages Assets), the static asset response is returned raw. Unlike some frameworks that might default to secure headers, here you must explicitly wrap the asset response to add them.
**Prevention:** Always wrap `env.ASSETS.fetch` calls with a helper function that applies a security policy appropriate for frontend assets (which often differs from the strict API policy).
