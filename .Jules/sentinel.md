## 2025-05-18 - Missing Security Headers on Static Assets
**Vulnerability:** The Cloudflare Worker served static assets (frontend) via `env.ASSETS.fetch` without applying any security headers (CSP, HSTS, etc.), leaving the client-side application exposed.
**Learning:** In Cloudflare Workers, `env.ASSETS.fetch` returns a raw Response object. Global security headers must be explicitly applied to this response, not just to custom API responses.
**Prevention:** Always wrap `env.ASSETS.fetch` calls with a helper function that applies a baseline security policy (CSP, HSTS, X-Frame-Options).
