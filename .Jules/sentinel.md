## 2025-02-21 - Stored XSS in Homepage Settings
**Vulnerability:** Found `dangerouslySetInnerHTML` being used with unsanitized `settings.homepage_html` from the database in `HomePage.tsx`.
**Learning:** Even internal settings managed by admins can be a vector for Stored XSS if not sanitized, potentially affecting all users. The codebase previously lacked any HTML sanitization library.
**Prevention:** Established `dompurify` as the standard sanitization library. Future usages of `dangerouslySetInnerHTML` must wrap content in `DOMPurify.sanitize()`.

## 2025-02-21 - CSP Hardening for SPA Routes
**Vulnerability:** The default CSP for the SPA fallback route in `src/index.ts` included `unsafe-inline` and `unsafe-eval` in `script-src`. This is unnecessary for a Vite production build and increases XSS risk.
**Learning:** Initial configurations often permit `unsafe-inline` and `unsafe-eval` for development convenience or compatibility, but these should be audited and removed for production.
**Prevention:** Tightened `script-src` to `'self'` and added `base-uri 'self'` and `form-action 'self'` to the Content-Security-Policy header.
