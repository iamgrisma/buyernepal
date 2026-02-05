## 2024-05-23 - Admin Login Accessibility Improvements
**Learning:** Adding a password visibility toggle significantly improves usability, but requires careful accessibility implementation (ARIA labels, keyboard focus). Also, ensuring all inputs have associated labels via `htmlFor` and `id` is critical for screen readers.
**Action:** When implementing form fields, always include `htmlFor` and `id`. For password fields, consider adding a toggle by default.

## 2024-05-24 - Toast Notification Accessibility
**Learning:** Toast notifications often lack ARIA roles (`role="status"`) and dismiss buttons, making them inaccessible to screen readers and frustrating for users who want to clear them. Adding `pointer-events-none` to the container and `pointer-events-auto` to the toasts allows users to click elements behind the empty space of the toast container.
**Action:** Always include `role="status"` or `role="alert"` for toasts, ensure they are dismissible via keyboard, and manage pointer events to avoid blocking UI.

## 2026-02-03 - Persistent Loading States & Playwright Navigation
**Learning:** When verifying persistent loading states (like "Saving..." on a button) with Playwright, mocking the API route to hang (return nothing) is an effective strategy. Additionally, in local Worker environments (like `wrangler dev`), navigating directly to deep links might trigger server-side redirects to the root (SPA fallback behavior). Using `history.pushState` in the browser context allows bypassing these redirects to reach the target route reliably.
**Action:** Use `page.route(url, lambda route: None)` to test loading states. Use client-side navigation injection for reliable deep linking in SPA verification scripts.

## 2026-02-05 - Admin Form Patterns
**Learning:** Admin forms should consistently use a local `isSubmitting` state to disable buttons and show feedback (e.g., "Saving...") immediately upon submission, preventing double-clicks and uncertainty. Also, generic IDs like `name` or `description` should be avoided in favor of specific ones (e.g., `category-name`) to prevent potential collisions, though strict label association via `htmlFor` is the priority.
**Action:** Standardize `isSubmitting` state in all admin forms and prefix input IDs with the entity name (e.g., `product-name`).
