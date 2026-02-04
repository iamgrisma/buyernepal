## 2025-02-21 - Stored XSS in Homepage Settings
**Vulnerability:** Found `dangerouslySetInnerHTML` being used with unsanitized `settings.homepage_html` from the database in `HomePage.tsx`.
**Learning:** Even internal settings managed by admins can be a vector for Stored XSS if not sanitized, potentially affecting all users. The codebase previously lacked any HTML sanitization library.
**Prevention:** Established `dompurify` as the standard sanitization library. Future usages of `dangerouslySetInnerHTML` must wrap content in `DOMPurify.sanitize()`.
