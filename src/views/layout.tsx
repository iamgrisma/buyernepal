import { FC, PropsWithChildren } from 'hono/jsx';
import { storefrontCss } from './styles';

interface LayoutProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  jsonLd?: Record<string, any>;
  customHead?: string;
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  title = 'BuyerNepal — Shop Smarter',
  description = 'BuyerNepal — discover useful products, compare prices and shop smarter in Nepal.',
  image = 'https://buyernepal.pages.dev/og-image.jpg',
  url = 'https://buyernepal.pages.dev',
  type = 'website',
  jsonLd,
  customHead,
  children
}) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#111827" />
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <title>{title}</title>

        {/* OpenGraph & Social Sharing Cards */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={type} />
        <meta property="og:site_name" content="BuyerNepal" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Google Rich Snippets JSON-LD */}
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}

        {/* Font Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Fast Inlined Critical CSS */}
        <style dangerouslySetInnerHTML={{ __html: storefrontCss }} />

        {customHead && <div dangerouslySetInnerHTML={{ __html: customHead }} />}
      </head>
      <body>
        {children}

        {/* Lightweight Production Vanilla JS for Search, Drawer, & Admin Tabs */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                // Mobile Drawer Menu Control
                const menuBtn = document.getElementById('mobileMenuBtn');
                const closeBtn = document.getElementById('closeMobileMenuBtn');
                const drawer = document.getElementById('mobileDrawer');
                const backdrop = document.getElementById('mobileDrawerBackdrop');

                function openDrawer() {
                  if (drawer) drawer.classList.add('open');
                  if (backdrop) backdrop.classList.add('open');
                  document.body.style.overflow = 'hidden';
                }
                function closeDrawer() {
                  if (drawer) drawer.classList.remove('open');
                  if (backdrop) backdrop.classList.remove('open');
                  document.body.style.overflow = '';
                }

                if (menuBtn) menuBtn.addEventListener('click', openDrawer);
                if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
                if (backdrop) backdrop.addEventListener('click', closeDrawer);
                document.addEventListener('keydown', (e) => {
                  if (e.key === 'Escape') closeDrawer();
                });

                // Client-side real-time search
                const searchInput = document.getElementById('searchInput');
                const clearSearchBtn = document.getElementById('clearSearchBtn');
                const productCards = document.querySelectorAll('.product-card');
                const searchCount = document.getElementById('searchCount');

                if (searchInput) {
                  searchInput.addEventListener('input', (e) => {
                    const q = e.target.value.trim().toLowerCase();
                    if (clearSearchBtn) clearSearchBtn.style.display = q ? 'inline-block' : 'none';
                    let visible = 0;
                    productCards.forEach((card) => {
                      const name = (card.getAttribute('data-name') || '').toLowerCase();
                      const desc = (card.getAttribute('data-desc') || '').toLowerCase();
                      const match = !q || name.includes(q) || desc.includes(q);
                      card.style.display = match ? 'flex' : 'none';
                      if (match) visible++;
                    });
                    if (searchCount) {
                      searchCount.textContent = q ? visible + ' found' : productCards.length + ' items';
                    }
                  });

                  if (clearSearchBtn) {
                    clearSearchBtn.addEventListener('click', () => {
                      searchInput.value = '';
                      searchInput.dispatchEvent(new Event('input'));
                      searchInput.focus();
                    });
                  }
                }

                // Admin Dashboard Tab Switching
                const tabBtns = document.querySelectorAll('.admin-tab-btn');
                const tabPanes = document.querySelectorAll('.admin-tab-pane');
                tabBtns.forEach((btn) => {
                  btn.addEventListener('click', () => {
                    const targetTab = btn.getAttribute('data-tab');
                    tabBtns.forEach((b) => b.classList.remove('active'));
                    tabPanes.forEach((p) => p.style.display = 'none');
                    btn.classList.add('active');
                    const activePane = document.getElementById('tab-' + targetTab);
                    if (activePane) activePane.style.display = 'block';
                  });
                });
              });
            `
          }}
        />
      </body>
    </html>
  );
};
