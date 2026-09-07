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

        {/* Fast Anti-Flash Theme Engine */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('bn_theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch(e) {}
              })();
            `
          }}
        />

        {/* Fast Inlined Critical CSS */}
        <style dangerouslySetInnerHTML={{ __html: storefrontCss }} />

        {customHead && <div dangerouslySetInnerHTML={{ __html: customHead }} />}
      </head>
      <body>
        {children}

        {/* 2026 Production Client Engine: Theme, Currency, Wishlist, Compare, Delivery & Tabs */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                // 1. Toast Notification Helper
                function showToast(msg) {
                  const toast = document.getElementById('toastMessage');
                  const toastText = document.getElementById('toastText');
                  if (toast && toastText) {
                    toastText.textContent = msg;
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 3200);
                  }
                }
                window.bnShowToast = showToast;

                // 2. Dark Mode Toggle
                const themeBtn = document.getElementById('themeToggleBtn');
                const themeIcon = document.getElementById('themeIcon');
                function updateThemeIcon() {
                  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                  if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
                }
                updateThemeIcon();

                if (themeBtn) {
                  themeBtn.addEventListener('click', () => {
                    const current = document.documentElement.getAttribute('data-theme');
                    const next = current === 'dark' ? 'light' : 'dark';
                    document.documentElement.setAttribute('data-theme', next);
                    localStorage.setItem('bn_theme', next);
                    updateThemeIcon();
                    showToast(next === 'dark' ? 'OLED Dark Mode Enabled 🌙' : 'Light Mode Enabled ☀️');
                  });
                }

                // 3. Multi-Currency Switcher Engine (NPR, USD, INR)
                const currencyBtns = document.querySelectorAll('.currency-btn');
                const rates = { NPR: 1, USD: 0.00752, INR: 0.625 };
                const symbols = { NPR: 'Rs. ', USD: '$', INR: '₹' };
                let currentCurrency = localStorage.getItem('bn_currency') || 'NPR';

                function setCurrency(cur) {
                  currentCurrency = cur;
                  localStorage.setItem('bn_currency', cur);
                  currencyBtns.forEach(b => {
                    b.classList.toggle('active', b.getAttribute('data-currency') === cur);
                  });

                  // Recalculate all prices on page
                  document.querySelectorAll('[data-base-npr]').forEach(el => {
                    const baseNpr = parseFloat(el.getAttribute('data-base-npr') || '0');
                    if (baseNpr > 0) {
                      const converted = Math.round(baseNpr * rates[cur]);
                      el.textContent = symbols[cur] + converted.toLocaleString();
                    }
                  });
                }
                setCurrency(currentCurrency);

                currencyBtns.forEach(btn => {
                  btn.addEventListener('click', () => {
                    const c = btn.getAttribute('data-currency');
                    if (c && rates[c]) {
                      setCurrency(c);
                      showToast('Prices converted to ' + c + ' ' + (c === 'NPR' ? '🇳🇵' : c === 'USD' ? '🇺🇸' : '🇮🇳'));
                    }
                  });
                });

                // 4. Wishlist Sliding Drawer & LocalStorage Engine
                let wishlist = [];
                try {
                  wishlist = JSON.parse(localStorage.getItem('bn_wishlist') || '[]');
                } catch(e) { wishlist = []; }

                const wishlistBadge = document.getElementById('wishlistCountBadge');
                const wishlistSubCount = document.getElementById('wishlistSubCount');
                const wishlistItemsList = document.getElementById('wishlistItemsList');
                const wishlistDrawer = document.getElementById('wishlistDrawer');
                const wishlistBackdrop = document.getElementById('wishlistDrawerBackdrop');
                const openWishlistBtn = document.getElementById('openWishlistBtn');
                const closeWishlistBtn = document.getElementById('closeWishlistBtn');
                const clearWishlistBtn = document.getElementById('clearWishlistBtn');
                const wishlistTotalEl = document.getElementById('wishlistTotalValue');

                function renderWishlist() {
                  const count = wishlist.length;
                  if (wishlistBadge) {
                    wishlistBadge.textContent = count;
                    wishlistBadge.style.display = count > 0 ? 'grid' : 'none';
                  }
                  if (wishlistSubCount) {
                    wishlistSubCount.textContent = count + (count === 1 ? ' deal saved' : ' deals saved');
                  }

                  // Update heart button states across products
                  document.querySelectorAll('.btn-wishlist-add').forEach(btn => {
                    const id = parseInt(btn.getAttribute('data-id') || '0', 10);
                    const isSaved = wishlist.some(item => item.id === id);
                    btn.classList.toggle('active', isSaved);
                  });

                  if (!wishlistItemsList) return;

                  if (count === 0) {
                    wishlistItemsList.innerHTML = \`
                      <div class="wishlist-empty" style="text-align: center; padding: 40px 20px; color: var(--muted);">
                        <span style="font-size: 36px; display: block; margin-bottom: 12px;">❤️</span>
                        <strong style="display: block; color: var(--ink);">Your wishlist is empty</strong>
                        <p style="font-size: 13px; margin-top: 6px;">Click the heart icon on any product to save it here for later.</p>
                      </div>
                    \`;
                    if (wishlistTotalEl) wishlistTotalEl.textContent = 'Rs. 0';
                    return;
                  }

                  let total = 0;
                  wishlistItemsList.innerHTML = wishlist.map(item => {
                    total += item.price;
                    return \`
                      <div class="wishlist-item">
                        <img src="\${item.image}" alt="\${item.name}" />
                        <div class="wishlist-item-info">
                          <a href="\${item.url}" class="wishlist-item-title">\${item.name}</a>
                          <div class="wishlist-item-price">Rs. \${item.price.toLocaleString()}</div>
                          <div style="display: flex; gap: 8px; margin-top: 6px;">
                            <a href="\${item.url}" class="product-buy" style="padding: 4px 10px; font-size: 11px;">View Deal ↗</a>
                            <button type="button" class="filter-pill remove-wishlist-btn" data-id="\${item.id}" style="padding: 4px 8px; font-size: 11px;">Remove</button>
                          </div>
                        </div>
                      </div>
                    \`;
                  }).join('');

                  if (wishlistTotalEl) wishlistTotalEl.textContent = 'Rs. ' + total.toLocaleString();

                  // Wire remove buttons
                  wishlistItemsList.querySelectorAll('.remove-wishlist-btn').forEach(b => {
                    b.addEventListener('click', () => {
                      const id = parseInt(b.getAttribute('data-id') || '0', 10);
                      wishlist = wishlist.filter(i => i.id !== id);
                      localStorage.setItem('bn_wishlist', JSON.stringify(wishlist));
                      renderWishlist();
                      showToast('Item removed from wishlist');
                    });
                  });
                }

                function openWishlist() {
                  if (wishlistDrawer && wishlistBackdrop) {
                    wishlistDrawer.classList.add('open');
                    wishlistBackdrop.classList.add('open');
                    document.body.style.overflow = 'hidden';
                  }
                }
                function closeWishlist() {
                  if (wishlistDrawer && wishlistBackdrop) {
                    wishlistDrawer.classList.remove('open');
                    wishlistBackdrop.classList.remove('open');
                    document.body.style.overflow = '';
                  }
                }

                if (openWishlistBtn) openWishlistBtn.addEventListener('click', openWishlist);
                if (closeWishlistBtn) closeWishlistBtn.addEventListener('click', closeWishlist);
                if (wishlistBackdrop) wishlistBackdrop.addEventListener('click', closeWishlist);
                if (clearWishlistBtn) {
                  clearWishlistBtn.addEventListener('click', () => {
                    wishlist = [];
                    localStorage.setItem('bn_wishlist', JSON.stringify(wishlist));
                    renderWishlist();
                    showToast('Wishlist cleared');
                  });
                }

                // Global Wishlist Add/Remove Trigger
                document.addEventListener('click', (e) => {
                  const btn = e.target.closest('.btn-wishlist-add');
                  if (!btn) return;
                  e.preventDefault();
                  e.stopPropagation();

                  const id = parseInt(btn.getAttribute('data-id') || '0', 10);
                  const name = btn.getAttribute('data-name') || '';
                  const price = parseFloat(btn.getAttribute('data-price') || '0');
                  const image = btn.getAttribute('data-image') || '';
                  const url = btn.getAttribute('data-url') || ('/product/' + id);

                  const existsIdx = wishlist.findIndex(i => i.id === id);
                  if (existsIdx > -1) {
                    wishlist.splice(existsIdx, 1);
                    showToast('Removed from saved wishlist');
                  } else {
                    wishlist.push({ id, name, price, image, url });
                    showToast('Saved "' + name.slice(0, 24) + '..." to wishlist ❤️');
                  }
                  localStorage.setItem('bn_wishlist', JSON.stringify(wishlist));
                  renderWishlist();
                });
                renderWishlist();

                // 5. Product Comparison Floating Dock & Matrix Engine
                let compareItems = [];
                try {
                  compareItems = JSON.parse(localStorage.getItem('bn_compare') || '[]');
                } catch(e) { compareItems = []; }

                const compareDock = document.getElementById('compareDock');
                const compareDockCount = document.getElementById('compareDockCount');
                const compareDockItems = document.getElementById('compareDockItems');
                const openCompareModalBtn = document.getElementById('openCompareModalBtn');
                const closeCompareDockBtn = document.getElementById('closeCompareDockBtn');
                const compareModalBackdrop = document.getElementById('compareModalBackdrop');
                const closeCompareModalBtn = document.getElementById('closeCompareModalBtn');
                const compareModalBody = document.getElementById('compareModalBody');

                function renderCompareDock() {
                  const count = compareItems.length;
                  if (compareDockCount) compareDockCount.textContent = '(' + count + ' of 3 items)';

                  // Update button active states
                  document.querySelectorAll('.btn-compare-add').forEach(btn => {
                    const id = parseInt(btn.getAttribute('data-id') || '0', 10);
                    btn.classList.toggle('active', compareItems.some(i => i.id === id));
                  });

                  if (count > 0) {
                    if (compareDock) compareDock.classList.add('open');
                  } else {
                    if (compareDock) compareDock.classList.remove('open');
                  }

                  if (!compareDockItems) return;
                  compareDockItems.innerHTML = compareItems.map(item => \`
                    <div class="compare-mini-card">
                      <button type="button" class="remove-compare-btn" data-id="\${item.id}" style="position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.6); color: #fff; border:none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer;">×</button>
                      <img src="\${item.image}" alt="\${item.name}" />
                      <strong style="font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">\${item.name}</strong>
                      <span style="font-size: 13px; font-weight: 800; color: var(--accent);">Rs. \${item.price.toLocaleString()}</span>
                      <small style="font-size: 11px; color: var(--muted);">\${item.store}</small>
                    </div>
                  \`).join('');

                  compareDockItems.querySelectorAll('.remove-compare-btn').forEach(b => {
                    b.addEventListener('click', (e) => {
                      e.stopPropagation();
                      const id = parseInt(b.getAttribute('data-id') || '0', 10);
                      compareItems = compareItems.filter(i => i.id !== id);
                      localStorage.setItem('bn_compare', JSON.stringify(compareItems));
                      renderCompareDock();
                      showToast('Removed item from comparison');
                    });
                  });
                }

                document.addEventListener('click', (e) => {
                  const btn = e.target.closest('.btn-compare-add');
                  if (!btn) return;
                  e.preventDefault();
                  e.stopPropagation();

                  const id = parseInt(btn.getAttribute('data-id') || '0', 10);
                  const name = btn.getAttribute('data-name') || '';
                  const price = parseFloat(btn.getAttribute('data-price') || '0');
                  const image = btn.getAttribute('data-image') || '';
                  const store = btn.getAttribute('data-store') || 'Daraz Mall';
                  const warranty = btn.getAttribute('data-warranty') || '1 Year Warranty';

                  const exists = compareItems.some(i => i.id === id);
                  if (exists) {
                    compareItems = compareItems.filter(i => i.id !== id);
                    showToast('Removed from comparison');
                  } else {
                    if (compareItems.length >= 3) {
                      showToast('Comparison limit reached (max 3 items)');
                      return;
                    }
                    compareItems.push({ id, name, price, image, store, warranty });
                    showToast('Added "' + name.slice(0, 20) + '..." to comparison ⚖️');
                  }
                  localStorage.setItem('bn_compare', JSON.stringify(compareItems));
                  renderCompareDock();
                });

                if (closeCompareDockBtn) {
                  closeCompareDockBtn.addEventListener('click', () => {
                    if (compareDock) compareDock.classList.remove('open');
                  });
                }

                // Comparison Full Modal View
                if (openCompareModalBtn) {
                  openCompareModalBtn.addEventListener('click', () => {
                    if (compareItems.length < 1) {
                      showToast('Please add at least 1 product to compare');
                      return;
                    }
                    if (compareModalBody) {
                      compareModalBody.innerHTML = \`
                        <table class="compare-table">
                          <thead>
                            <tr>
                              <th>Feature / Spec</th>
                              \${compareItems.map(i => \`
                                <th style="text-align: center;">
                                  <img src="\${i.image}" alt="\${i.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin: 0 auto 8px;" />
                                  <a href="/product/\${i.id}" style="display: block; font-weight: 800; font-size: 13px;">\${i.name}</a>
                                </th>
                              \`).join('')}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><strong>Price in Nepal</strong></td>
                              \${compareItems.map(i => \`<td style="font-size: 16px; font-weight: 900; color: var(--accent); text-align: center;">Rs. \${i.price.toLocaleString()}</td>\`).join('')}
                            </tr>
                            <tr>
                              <td><strong>Authorized Store</strong></td>
                              \${compareItems.map(i => \`<td style="text-align: center; font-weight: 700;">\${i.store}</td>\`).join('')}
                            </tr>
                            <tr>
                              <td><strong>Official Warranty</strong></td>
                              \${compareItems.map(i => \`<td style="text-align: center;">\${i.warranty}</td>\`).join('')}
                            </tr>
                            <tr>
                              <td><strong>0% Bank EMI Option</strong></td>
                              \${compareItems.map(i => \`<td style="text-align: center; color: var(--emerald); font-weight: 700;">\${i.price >= 12000 ? 'Available (From Rs. ' + Math.round(i.price/18).toLocaleString() + '/mo)' : 'N/A'}</td>\`).join('')}
                            </tr>
                            <tr>
                              <td><strong>Delivery Coverage</strong></td>
                              \${compareItems.map(() => \`<td style="text-align: center;">Kathmandu 24h Express • Nationwide Courier</td>\`).join('')}
                            </tr>
                            <tr>
                              <td><strong>Action</strong></td>
                              \${compareItems.map(i => \`<td style="text-align: center;"><a href="/product/\${i.id}" class="product-buy" style="display: inline-block;">View Full Details →</a></td>\`).join('')}
                            </tr>
                          </tbody>
                        </table>
                      \`;
                    }
                    if (compareModalBackdrop) compareModalBackdrop.classList.add('open');
                  });
                }

                if (closeCompareModalBtn && compareModalBackdrop) {
                  closeCompareModalBtn.addEventListener('click', () => compareModalBackdrop.classList.remove('open'));
                  compareModalBackdrop.addEventListener('click', (e) => {
                    if (e.target === compareModalBackdrop) compareModalBackdrop.classList.remove('open');
                  });
                }
                renderCompareDock();

                // 6. Live Flash Sale Countdown Timer
                const hoursEl = document.getElementById('timerHours');
                const minutesEl = document.getElementById('timerMinutes');
                const secondsEl = document.getElementById('timerSeconds');

                if (hoursEl && minutesEl && secondsEl) {
                  let totalSec = 5 * 3600 + 43 * 60 + 21;
                  setInterval(() => {
                    if (totalSec > 0) {
                      totalSec--;
                      const h = Math.floor(totalSec / 3600);
                      const m = Math.floor((totalSec % 3600) / 60);
                      const s = totalSec % 60;
                      hoursEl.textContent = String(h).padStart(2, '0');
                      minutesEl.textContent = String(m).padStart(2, '0');
                      secondsEl.textContent = String(s).padStart(2, '0');
                    }
                  }, 1000);
                }

                // 7. Nepal City Delivery Estimator Select
                const deliverySelect = document.getElementById('deliveryCitySelect');
                const deliveryOutput = document.getElementById('deliveryOutput');
                const deliveryData = {
                  ktm: '⚡ Kathmandu Valley: Within 24h • FREE Express Shipping • Cash on Delivery',
                  pkr: '🚚 Pokhara Valley: 24-48 Hours • Rs. 150 Courier • Cash on Delivery Available',
                  chw: '🚚 Chitwan (Bharatpur): 24-48 Hours • Rs. 150 Courier • Cash on Delivery Available',
                  brt: '🚚 Biratnagar / Itahari: 2-3 Days • Rs. 200 Courier • COD Available',
                  btw: '🚚 Butwal / Bhairahawa: 2-3 Days • Rs. 180 Courier • COD Available',
                  dhn: '🚚 Dharan: 2-3 Days • Rs. 200 Courier • COD Available',
                  oth: '📦 All 77 Districts: 3-4 Days via Nepal Can Move Courier'
                };

                if (deliverySelect && deliveryOutput) {
                  deliverySelect.addEventListener('change', (e) => {
                    const city = e.target.value;
                    if (deliveryData[city]) {
                      deliveryOutput.textContent = deliveryData[city];
                    }
                  });
                }

                // 8. FAQ Accordion Toggle
                document.querySelectorAll('.faq-question').forEach(q => {
                  q.addEventListener('click', () => {
                    const parent = q.closest('.faq-item');
                    if (parent) parent.classList.toggle('active');
                  });
                });

                // 9. Mobile Drawer Menu Control
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
                  if (e.key === 'Escape') {
                    closeDrawer();
                    closeWishlist();
                    if (compareModalBackdrop) compareModalBackdrop.classList.remove('open');
                  }
                });

                // 10. Admin Tab Switching
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
