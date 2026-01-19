
import re
from playwright.sync_api import sync_playwright

def verify_admin_product_form():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Mock API responses
        page.route(re.compile(r".*/api/auth/me"), lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"id": 1, "username": "admin", "role": "admin"}'
        ))

        page.route(re.compile(r".*/api/admin/products$"), lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"products": [{"id": 1, "name": "Test Product", "description": "Desc", "price": 10.0, "category_id": 1, "is_active": 1, "image_url": "https://example.com/img.jpg"}]}'
        ))

        page.route(re.compile(r".*/api/admin/categories"), lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"categories": [{"id": 1, "name": "Test Category"}]}'
        ))

        # Mock form submission to delay response so we can see "Saving..." state if possible
        # But capturing "Saving..." state in screenshot is hard due to timing.
        # We will focus on verifying accessibility attributes first.

        # Navigate to Admin Products
        # We need to bypass login check logic in AdminLayout if present, but since we mock /api/auth/me, it should work.
        # However, we are running against local dev server.
        page.goto("http://localhost:8787/admin/products")

        # Wait for content
        page.wait_for_selector("text=Test Product")

        # Click Add Product
        page.click("text=+ Add Product")

        # Wait for modal
        page.wait_for_selector("role=dialog")

        # Verify Accessibility Attributes
        dialog = page.locator("role=dialog")
        modal_label = dialog.get_attribute("aria-labelledby")
        modal_role = dialog.get_attribute("role")
        aria_modal = dialog.get_attribute("aria-modal")

        print(f"Role: {modal_role}")
        print(f"Aria-Modal: {aria_modal}")
        print(f"Aria-LabelledBy: {modal_label}")

        # Verify Label Association
        name_input = page.locator("id=name")
        name_label = page.locator("label[for='name']")

        if name_input.count() > 0 and name_label.count() > 0:
            print("Name input and label associated correctly.")
        else:
            print("Name input or label missing association.")

        # Take screenshot of the modal
        page.screenshot(path=".Jules/verification/admin_product_modal.png")

        browser.close()

if __name__ == "__main__":
    verify_admin_product_form()
