## 2024-04-14 - Missing Security Headers on Static Assets
**Vulnerability:** The React application served via `env.ASSETS` in Cloudflare Workers did not inherit security headers (CSP, HSTS, X-Content-Type-Options) because the worker code returned the raw asset response.
**Learning:** `env.ASSETS.fetch` returns a response directly from the asset store. To apply security headers, we must wrap this response and explicitly set the headers in the Worker code before returning it to the client.
**Prevention:** Created `src/security.ts` to centralize header logic and updated `src/index.ts` to wrap all responses (API and static assets) with `applySecurityHeaders`.
