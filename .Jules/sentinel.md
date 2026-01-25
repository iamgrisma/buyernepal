# Sentinel's Journal

## 2026-01-25 - Static Asset Header Bypass
**Vulnerability:** `wrangler dev` (and potentially Cloudflare Assets) serves static assets before the Worker can intercept, bypassing security headers applied in the Worker.
**Learning:** Applying headers only in the Worker is insufficient for projects using `assets` binding or Pages.
**Prevention:** Include a `public/_headers` (or `_headers` in output dir) with security headers to ensure they are applied by the hosting layer.
