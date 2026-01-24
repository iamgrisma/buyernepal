# Bolt's Journal

## 2024-05-22 - [First Run]
**Learning:** Initial setup of Bolt's journal.
**Action:** Will record critical performance learnings here.

## 2025-05-22 - [Regex Optimization Failure]
**Learning:** Replacing multiple `replace()` calls with a single `replace()` using a callback was significantly slower (~30-40%) in Node/V8 for a string with frequent matches. V8's native string replacement is highly optimized compared to JS callbacks.
**Action:** Avoid replacing multiple simple string replacements with a single regex callback unless the string is very large and matches are rare, or if correctness requires it (to avoid double-escaping).

## 2026-01-24 - [SPA Navigation Optimization]
**Learning:** The application was using standard `<a>` tags for internal navigation, causing full page reloads and defeating the purpose of the Single Page Application architecture. This resulted in unnecessary network requests and slower navigation.
**Action:** Replace `<a>` tags with `Link` components from `react-router-dom` for all internal routes to enable instant client-side transitions.
