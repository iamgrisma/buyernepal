
import re
from playwright.sync_api import sync_playwright, expect

def verify_image_optimization():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Mock API response for products
        products_mock = {
            "products": [
                {
                    "id": i,
                    "name": f"Product {i}",
                    "description": "Desc",
                    "price": 100,
                    "image_url": f"https://via.placeholder.com/150?text=Product+{i}",
                    "affiliate_url": "#"
                } for i in range(1, 10) # 9 products
            ]
        }

        # Mock API requests
        page.route("**/api/products", lambda route: route.fulfill(json=products_mock))
        page.route("**/api/settings", lambda route: route.fulfill(json={"settings": {"site_title": "Test Site"}}))
        page.route("**/api/categories", lambda route: route.fulfill(json={"categories": []}))

        try:
            # Navigate to home
            page.goto("http://localhost:8787")

            # Wait for products to load
            page.wait_for_selector(".card img")

            # Get all product images
            images = page.locator(".card img").all()
            print(f"Found {len(images)} images")

            if len(images) == 0:
                print("No images found!")
                exit(1)

            # Check first 4 images
            for i in range(4):
                img = images[i]
                loading = img.get_attribute("loading")
                priority = img.get_attribute("fetchpriority") # React renders as fetchpriority in DOM
                decoding = img.get_attribute("decoding")

                print(f"Image {i}: loading={loading}, fetchpriority={priority}, decoding={decoding}")

                if loading != "eager":
                    print(f"FAIL: Image {i} loading should be eager, got {loading}")
                if priority != "high":
                     print(f"FAIL: Image {i} fetchpriority should be high, got {priority}")
                if decoding != "async":
                     print(f"FAIL: Image {i} decoding should be async, got {decoding}")

            # Check 5th image (index 4)
            img5 = images[4]
            loading = img5.get_attribute("loading")
            priority = img5.get_attribute("fetchpriority")
            decoding = img5.get_attribute("decoding")

            print(f"Image 4: loading={loading}, fetchpriority={priority}, decoding={decoding}")

            if loading != "lazy":
                print(f"FAIL: Image 4 loading should be lazy, got {loading}")
            if priority != "auto" and priority is not None:
                # Note: React might omit 'auto' or set it. Browsers default to auto if missing.
                # If it's explicitly 'auto', that's fine. If it's null, that's also 'auto'.
                # But our code explicitly sets 'auto', so we expect 'auto'.
                print(f"FAIL: Image 4 fetchpriority should be auto, got {priority}")

            page.screenshot(path="verification/verification.png")
            print("Verification screenshot saved.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_image_optimization()
