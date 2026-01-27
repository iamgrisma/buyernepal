## 2026-01-27 - Lazy Loading Images
**Learning:** Adding `loading="lazy"` and `decoding="async"` to `img` tags is a low-effort, high-impact optimization for lists of images, especially in React apps where images might be below the fold.
**Action:** Always check `img` tags in list views and add these attributes by default unless the image is critical/LCP.
