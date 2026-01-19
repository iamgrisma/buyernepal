## 2024-05-23 - Admin Login Accessibility Improvements
**Learning:** Adding a password visibility toggle significantly improves usability, but requires careful accessibility implementation (ARIA labels, keyboard focus). Also, ensuring all inputs have associated labels via `htmlFor` and `id` is critical for screen readers.
**Action:** When implementing form fields, always include `htmlFor` and `id`. For password fields, consider adding a toggle by default.

## 2024-05-24 - Toast Notification Accessibility
**Learning:** Toast notifications often lack ARIA roles (`role="status"`) and dismiss buttons, making them inaccessible to screen readers and frustrating for users who want to clear them. Adding `pointer-events-none` to the container and `pointer-events-auto` to the toasts allows users to click elements behind the empty space of the toast container.
**Action:** Always include `role="status"` or `role="alert"` for toasts, ensure they are dismissible via keyboard, and manage pointer events to avoid blocking UI.

## 2026-01-19 - Standardized Accessible Loading State
**Learning:** Visual loading spinners are invisible to screen readers without `role="status"` and `sr-only` text. Inconsistent implementations (hardcoded spinners vs components) lead to fragmented accessibility coverage.
**Action:** Always use a reusable `<Loading />` component that includes `role="status"`, `aria-label`, and hidden text. Ensure it accepts a `className` prop for flexible positioning (full-screen vs widget).
