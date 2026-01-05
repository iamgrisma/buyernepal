## 2024-05-22 - Centralized Security Headers for Workers
**Vulnerability:** Static assets served via `env.ASSETS` lacked security headers (CSP, HSTS, X-Frame-Options), leaving the React frontend vulnerable to attacks like Clickjacking and potentially XSS if not properly isolated.
**Learning:** Cloudflare Workers using `env.ASSETS` do not automatically inherit or apply security headers to the static files they serve. Developers must explicitly wrap the `env.ASSETS.fetch` response to add these headers.
**Prevention:** Implement a centralized `applySecurityHeaders` helper and wrap all `env.ASSETS.fetch` returns with it. Ensure distinct CSPs for API (strict) vs Frontend (permissive enough for React/Vite but still secure).
