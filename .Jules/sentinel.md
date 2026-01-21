# Sentinel's Journal

## 2026-01-21 - Missing Security Headers on Proxied Assets

**Vulnerability:** The `src/index.ts` file served the main application (frontend assets) via `env.ASSETS.fetch(request)` without modifying the response. While the `/api` route had strict security headers (CSP, HSTS, etc.) explicitly defined, the main application response was returned "as-is", leaving it vulnerable to XSS, Clickjacking, and other attacks due to missing headers.

**Learning:** When using Cloudflare Workers to proxy assets (via `env.ASSETS`), the worker is responsible for applying security headers to *all* responses, not just the ones it generates programmatically. Assets do not inherit headers from the worker context automatically.

**Prevention:** Implement a centralized `applySecurityHeaders(response)` helper function and wrap *all* outgoing responses with it, ensuring consistent security policy application across the entire application, regardless of whether the content is static or dynamic.
