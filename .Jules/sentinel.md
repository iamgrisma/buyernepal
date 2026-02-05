## 2025-02-21 - Stored XSS in Homepage Settings
**Vulnerability:** Found `dangerouslySetInnerHTML` being used with unsanitized `settings.homepage_html` from the database in `HomePage.tsx`.
**Learning:** Even internal settings managed by admins can be a vector for Stored XSS if not sanitized, potentially affecting all users. The codebase previously lacked any HTML sanitization library.
**Prevention:** Established `dompurify` as the standard sanitization library. Future usages of `dangerouslySetInnerHTML` must wrap content in `DOMPurify.sanitize()`.

## 2026-02-05 - Insecure CSP Headers in Worker
**Vulnerability:** Found `script-src 'unsafe-inline' 'unsafe-eval'` in `src/index.ts`, enabling potential XSS and code injection attacks.
**Learning:** In Cloudflare Worker apps, CSP headers are defined programmatically in the response handler (`src/index.ts`) and must be manually tightened; they are not automatically managed by Vite/React.
**Prevention:** Removed unsafe directives. Future Worker implementations must default to `script-src 'self'` and avoid `unsafe-inline` unless strictly necessary (e.g., with nonces).
