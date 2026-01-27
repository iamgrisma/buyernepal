## 2025-10-18 - Centralized Security Headers
**Vulnerability:** Inconsistent application of security headers across API and Frontend routes.
**Learning:** Cloudflare Workers handling both API and static assets (`env.ASSETS`) need explicit header application on both paths. `env.ASSETS.fetch` returns a response without custom security headers by default.
**Prevention:** Use a centralized `applySecurityHeaders` wrapper for all `Response` objects before returning them from the Worker's `fetch` handler.
