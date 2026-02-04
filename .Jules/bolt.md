# Bolt's Journal

## 2024-05-22 - [First Run]
**Learning:** Initial setup of Bolt's journal.
**Action:** Will record critical performance learnings here.

## 2025-05-22 - [Regex Optimization Failure]
**Learning:** Replacing multiple `replace()` calls with a single `replace()` using a callback was significantly slower (~30-40%) in Node/V8 for a string with frequent matches. V8's native string replacement is highly optimized compared to JS callbacks.
**Action:** Avoid replacing multiple simple string replacements with a single regex callback unless the string is very large and matches are rare, or if correctness requires it (to avoid double-escaping).

## 2025-02-03 - [Lazy Loading Images]
**Learning:** Adding `loading="lazy"` to images in a list view is a low-hanging fruit for performance. Verified with Playwright by checking DOM attributes.
**Action:** Include `loading="lazy"` and `decoding="async"` by default for all images that are not LCP candidates.

## 2026-02-04 - [Client-Side Navigation Anti-Pattern]
**Learning:** Found usage of standard `<a>` tags for internal routes (`/`, `/admin/login`) in a React SPA. This causes full page reloads, negating SPA benefits and re-executing scripts unnecessarily.
**Action:** Always verify navigation links use `Link` from `react-router-dom` for internal routes to ensure instant navigation.
