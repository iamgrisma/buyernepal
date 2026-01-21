## 2024-05-23 - Admin Login Accessibility Improvements
**Learning:** Adding a password visibility toggle significantly improves usability, but requires careful accessibility implementation (ARIA labels, keyboard focus). Also, ensuring all inputs have associated labels via `htmlFor` and `id` is critical for screen readers.
**Action:** When implementing form fields, always include `htmlFor` and `id`. For password fields, consider adding a toggle by default.

## 2024-05-24 - Toast Notification Accessibility
**Learning:** Toast notifications often lack ARIA roles (`role="status"`) and dismiss buttons, making them inaccessible to screen readers and frustrating for users who want to clear them. Adding `pointer-events-none` to the container and `pointer-events-auto` to the toasts allows users to click elements behind the empty space of the toast container.
**Action:** Always include `role="status"` or `role="alert"` for toasts, ensure they are dismissible via keyboard, and manage pointer events to avoid blocking UI.

## 2025-02-23 - Image LCP and External Links
**Learning:** Adding `loading='lazy'` and `fetchPriority` attributes to images in a list can significantly improve LCP, but ensure the first few are eager/high priority. Also, indicating external links with icons and accessible labels is a small but high-impact UX win.
**Action:** Always optimize image loading strategy for lists (first 4 eager, rest lazy) and ensure external links have `aria-label` indicating "opens in new tab" along with a visual indicator.
