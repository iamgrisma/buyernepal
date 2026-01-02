## 2026-01-02 - LCP vs Lazy Loading
**Learning:** Applying `loading="lazy"` blindly to all images in a list can hurt LCP if the first few images are above the fold.
**Action:** Use conditional logic (e.g., `index < 4 ? "eager" : "lazy"`) to eager load the first row and lazy load the rest.
