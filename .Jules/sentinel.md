## 2025-05-24 - Static Assets Bypass Worker
**Vulnerability:** Security headers added in Worker `fetch` handler were not applied to static assets served via `assets` binding in `wrangler.json`.
**Learning:** Cloudflare Workers with `assets` binding serve static files directly, bypassing the Worker. This leaves the most critical asset (`index.html`) unprotected by Worker-level security headers.
**Prevention:** Always use `public/_headers` (or `_headers` in output dir) to define security headers for static assets when using `assets` binding.
