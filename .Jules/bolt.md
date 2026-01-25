# Bolt's Journal

## 2024-05-22 - [First Run]
**Learning:** Initial setup of Bolt's journal.
**Action:** Will record critical performance learnings here.

## 2025-05-22 - [Regex Optimization Failure]
**Learning:** Replacing multiple `replace()` calls with a single `replace()` using a callback was significantly slower (~30-40%) in Node/V8 for a string with frequent matches. V8's native string replacement is highly optimized compared to JS callbacks.
**Action:** Avoid replacing multiple simple string replacements with a single regex callback unless the string is very large and matches are rare, or if correctness requires it (to avoid double-escaping).

## 2026-01-25 - [Homepage API Waterfall]
**Learning:** The `HomePage` component triggers three separate fetch requests (`/api/settings`, `/api/categories`, `/api/products`) in parallel. While parallel, this increases connection overhead and is susceptible to waterfall effects if one request stalls.
**Action:** Future optimization should combine these into a single `/api/homepage-data` endpoint to reduce round-trips and improve LCP.
