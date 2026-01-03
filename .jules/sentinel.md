## 2025-01-03 - Missing Security Headers in SPA
**Vulnerability:** The React application served via `env.ASSETS` lacked security headers (CSP, HSTS, X-Frame-Options) because the Worker only applied them to `/api` routes.
**Learning:** Cloudflare Workers acting as a proxy for static assets must explicitly modify the asset response to add security headers; they are not inherited automatically from the Worker context or applied by default in all configurations.
**Prevention:** Implement a centralized `applySecurityHeaders` function and wrap ALL responses in the Worker, including those from `env.ASSETS.fetch`.
