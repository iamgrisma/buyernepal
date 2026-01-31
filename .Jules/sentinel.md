## 2025-10-27 - [Cloudflare Assets Binding Bypasses Worker Fetch]
**Vulnerability:** The application was missing security headers (CSP, HSTS) on the main frontend because the `src/index.ts` Worker code was bypassed for static assets.
**Learning:** When using the `assets` binding in `wrangler.json`, requests for static files (the React app) are handled by the Asset Server *before* the Worker's `fetch()` handler. Security logic placed in the Worker is ineffective for the frontend.
**Prevention:** Use a `public/_headers` (or `dist/_headers`) file to define security headers for static assets served via the Assets binding. Do not rely on Worker middleware for static asset security headers in this architecture.
