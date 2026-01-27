## 2024-05-23 - Admin Login Accessibility Improvements
**Learning:** Adding a password visibility toggle significantly improves usability, but requires careful accessibility implementation (ARIA labels, keyboard focus). Also, ensuring all inputs have associated labels via `htmlFor` and `id` is critical for screen readers.
**Action:** When implementing form fields, always include `htmlFor` and `id`. For password fields, consider adding a toggle by default.

## 2024-05-24 - Toast Notification Accessibility
**Learning:** Toast notifications often lack ARIA roles (`role="status"`) and dismiss buttons, making them inaccessible to screen readers and frustrating for users who want to clear them. Adding `pointer-events-none` to the container and `pointer-events-auto` to the toasts allows users to click elements behind the empty space of the toast container.
**Action:** Always include `role="status"` or `role="alert"` for toasts, ensure they are dismissible via keyboard, and manage pointer events to avoid blocking UI.

## 2025-05-15 - SPA Navigation vs Anchor Tags
**Learning:** In a Cloudflare Worker + React SPA setup, using standard `<a>` tags for internal navigation causes a full page reload, negating the performance benefits of the SPA architecture and providing a jarring user experience.
**Action:** Always verify that internal navigation links use `Link` from `react-router-dom` (or equivalent) to ensure smooth client-side transitions.

## 2025-05-15 - Image Loading Strategies
**Learning:** Product grids often load many images simultaneously. Omitting `loading="lazy"` and `decoding="async"` impacts Initial Page Load and LCP scores.
**Action:** Default to lazy loading for images below the fold or in grids.
