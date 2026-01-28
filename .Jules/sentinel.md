## 2025-10-26 - Cloudflare Worker Security Headers Pattern
**Vulnerability:** Missing security headers (CSP, HSTS, etc.) on static assets served via `env.ASSETS`.
**Learning:** In Cloudflare Workers with `assets` binding, static assets are served programmatically via `env.ASSETS.fetch`. Security headers must be explicitly applied to the response object returned by this fetch call, as they are not automatically added by the platform for the `assets` binding in this configuration.
**Prevention:** Use a centralized `applySecurityHeaders` wrapper function around `env.ASSETS.fetch` calls in the Worker entry point (`src/index.ts`).
