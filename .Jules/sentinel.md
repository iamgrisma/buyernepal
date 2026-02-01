# Sentinel's Journal

## 2025-05-22 - [Worker Asset Serving Bypass]
**Vulnerability:** Security headers added in the Worker were not applied to static assets.
**Learning:** Cloudflare Workers with `assets` binding serve matching static files directly from the edge cache *before* invoking the Worker script. Worker logic only executes for non-matching routes or when explicitly falling back.
**Prevention:** Always use a `_headers` file in the build output directory (e.g., `public/_headers`) to enforce security headers on static assets served by the runtime.
