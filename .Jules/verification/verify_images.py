
import re
import json
from playwright.sync_api import sync_playwright

def verify_homepage_images():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Mock API responses
        page.route(re.compile(r".*/api/settings"), lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"settings": {"site_title": "Test Site", "site_description": "Test Description"}}'
        ))

        page.route(re.compile(r".*/api/categories"), lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"categories": [{"id": 1, "name": "Electronics", "slug": "electronics"}]}'
        ))

        # Mock 10 products to verify lazy loading logic
        products = []
        for i in range(1, 11):
            products.append({
                "id": i,
                "name": f"Product {i}",
                "description": "Description",
                "price": 100,
                "image_url": "https://via.placeholder.com/150",
                "affiliate_url": "#"
            })

        page.route(re.compile(r".*/api/products"), lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body=json.dumps({"products": products})
        ))

        # Navigate to the page
        try:
             page.goto("http://localhost:8787/")
        except Exception as e:
             print(f"Error navigating: {e}")
             return

        # Wait for products to load
        try:
            page.wait_for_selector(".card img", timeout=10000)
        except:
            print("Timed out waiting for images.")
            # Take screenshot to debug
            page.screenshot(path=".Jules/verification/debug_timeout.png")
            return

        # Get all images
        images = page.locator(".card img").all()

        print(f"Found {len(images)} product images.")

        for i, img in enumerate(images):
            loading = img.get_attribute("loading")
            fetch_priority = img.get_attribute("fetchpriority") # Note: fetchpriority is lowercase in DOM
            decoding = img.get_attribute("decoding")

            print(f"Image {i+1}: loading={loading}, fetchpriority={fetch_priority}, decoding={decoding}")

            if i < 4:
                if loading != "eager":
                    print(f"FAIL: Image {i+1} should be eager")
                if fetch_priority != "high":
                     print(f"FAIL: Image {i+1} should have high priority")
            else:
                if loading != "lazy":
                    print(f"FAIL: Image {i+1} should be lazy")

        page.screenshot(path=".Jules/verification/homepage_images.png")
        print("Screenshot saved to .Jules/verification/homepage_images.png")
        browser.close()

if __name__ == "__main__":
    verify_homepage_images()
