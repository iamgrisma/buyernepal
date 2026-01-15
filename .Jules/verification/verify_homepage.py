import re
from playwright.sync_api import sync_playwright

def verify_homepage_images_and_links():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Mock API responses
        page.route("**/api/settings", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"settings": {"site_title": "Bolt Verified Store", "site_description": "Performance Optimized"}}'
        ))
        page.route("**/api/categories", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"categories": [{"id": 1, "name": "Electronics", "slug": "electronics"}, {"id": 2, "name": "Books", "slug": "books"}]}'
        ))
        page.route("**/api/products", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"products": [' + ','.join([
                f'{{"id": {i}, "name": "Product {i}", "description": "Desc {i}", "price": {10+i}, "image_url": "https://via.placeholder.com/150", "affiliate_url": "http://example.com"}}' for i in range(1, 6)
            ]) + ']}'
        ))

        # We need to serve the built assets.
        # Since we ran `pnpm build`, the `dist` folder exists.
        # However, `wrangler dev` serves it.
        # Alternatively, we can use `python -m http.server` to serve `dist`.
        # Let's assume the user runs `pnpm dev` or similar in background,
        # OR we can just try to run against the dev server if it was running.
        # But we don't have a long running process tool active right now.
        # So I will start a python http server in the background in the next step,
        # but for this script to work, it needs a URL.
        # I'll assume http://localhost:8080 is where I'll serve `dist`.

        try:
            page.goto("http://localhost:8080")

            # Wait for content
            page.wait_for_selector("text=Featured Products")

            # Verify Links
            # Check if internal links are present (we can't easily verify client-side routing in static server mode
            # without correct history fallback, but we can check the DOM)
            # React Router Links render as <a> tags.
            # We can check if they work by clicking and seeing if it tries to go to the URL.

            # Verify Image Attributes
            # Get the first product image (should be eager)
            first_image = page.locator(".card img").first
            loading_attr = first_image.get_attribute("loading")
            priority_attr = first_image.get_attribute("fetchPriority")

            print(f"First Image Loading: {loading_attr}")
            print(f"First Image Priority: {priority_attr}")

            if loading_attr != "eager":
                print("FAILURE: First image should be eager")

            # Get the 5th image (should be lazy)
            fifth_image = page.locator(".card img").nth(4)
            lazy_loading_attr = fifth_image.get_attribute("loading")
            lazy_priority_attr = fifth_image.get_attribute("fetchPriority")

            print(f"Fifth Image Loading: {lazy_loading_attr}")
            print(f"Fifth Image Priority: {lazy_priority_attr}")

            if lazy_loading_attr != "lazy":
                print("FAILURE: Fifth image should be lazy")

            # Screenshot
            page.screenshot(path=".Jules/verification/homepage_opt.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_homepage_images_and_links()
