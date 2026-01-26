## 2025-10-09 - Added Security Headers to Static Assets
**Vulnerability:** Static assets (frontend application) were served without security headers (CSP, HSTS, X-Frame-Options), leaving them vulnerable to XSS, clickjacking, and other attacks. The API routes had headers, but the main app did not.
**Learning:** `env.ASSETS.fetch` in Cloudflare Workers returns the raw asset response. You must manually wrap it or modify it to add security headers if you are intercepting requests in a Worker.
**Prevention:** Use a centralized `applySecurityHeaders` function to wrap all outgoing responses, including those from `env.ASSETS`.
