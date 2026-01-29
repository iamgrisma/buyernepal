## 2024-05-23 - Admin Login Accessibility Improvements
**Learning:** Adding a password visibility toggle significantly improves usability, but requires careful accessibility implementation (ARIA labels, keyboard focus). Also, ensuring all inputs have associated labels via `htmlFor` and `id` is critical for screen readers.
**Action:** When implementing form fields, always include `htmlFor` and `id`. For password fields, consider adding a toggle by default.

## 2024-05-24 - Toast Notification Accessibility
**Learning:** Toast notifications often lack ARIA roles (`role="status"`) and dismiss buttons, making them inaccessible to screen readers and frustrating for users who want to clear them. Adding `pointer-events-none` to the container and `pointer-events-auto` to the toasts allows users to click elements behind the empty space of the toast container.
**Action:** Always include `role="status"` or `role="alert"` for toasts, ensure they are dismissible via keyboard, and manage pointer events to avoid blocking UI.

## 2024-05-25 - Admin Form Accessibility
**Learning:** Verified that implementing `htmlFor` and `id` attributes properly links labels to inputs, which is critical for click targets and screen readers. Also, modal dialogs require `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` to be correctly announced.
**Action:** Enforce strict Label-Input association in all future forms and use a standard accessible Modal component or attributes.
