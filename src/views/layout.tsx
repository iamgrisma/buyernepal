import { FC, PropsWithChildren } from 'hono/jsx';
import { storefrontCss } from './styles';
import { SiteSettings } from '../types';

interface LayoutProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  jsonLd?: Record<string, any>;
  customHead?: string;
  settings?: SiteSettings;
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  title = 'BuyerNepal — Shop Smarter',
  description = 'BuyerNepal — discover useful products, compare prices and shop smarter in Nepal.',
  image = 'https://buyernepal.pages.dev/og-image.jpg',
  url = 'https://buyernepal.pages.dev',
  type = 'website',
  jsonLd,
  customHead,
  settings,
  children
}) => {
  const defaultMode = settings?.dark_mode_default || 'auto';

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

        {/* Font Preconnect & Customizer Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Fast Anti-Flash Theme Engine */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('bn_theme');
                  const defaultMode = '${defaultMode}';
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && defaultMode === 'dark') || (!saved && defaultMode === 'auto' && prefersDark)) {
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

        {/* Dynamic Customizer CSS Theme Injection */}
        {settings && (
          <style
            dangerouslySetInnerHTML={{
              __html: `
                :root {
                  ${settings.theme_accent_color ? `
                    --accent: ${settings.theme_accent_color};
                    --accent-hover: ${settings.theme_accent_color}ee;
                    --accent-soft: ${settings.theme_accent_color}18;
                  ` : ''}
                  ${settings.theme_font && settings.theme_font !== 'Outfit' ? `
                    --font-main: '${settings.theme_font}', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    --font-display: '${settings.theme_font}', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                  ` : `
                    --font-main: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    --font-display: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                  `}
                }
                ${settings.theme_container_width ? `
                  .store-shell, .page-shell { max-width: ${settings.theme_container_width} !important; }
                ` : ''}
                ${settings.card_style === 'bordered' ? `
                  .product-card { border: 2px solid var(--line) !important; box-shadow: none !important; border-radius: 12px !important; }
                  .product-card:hover { border-color: var(--accent) !important; }
                ` : ''}
                ${settings.card_style === 'compact' ? `
                  .product-card { padding: 10px !important; }
                  .product-card-body { padding: 10px 6px 6px !important; }
                  .product-card-title { font-size: 13.5px !important; line-height: 1.3 !important; }
                ` : ''}
              `
            }}
          />
        )}

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
                const drawerThemeBtn = document.getElementById('drawerThemeToggleBtn');
                const drawerThemeIcon = document.getElementById('drawerThemeIcon');
                const drawerThemeLabel = document.getElementById('drawerThemeLabel');

                function updateThemeIcon() {
                  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                  if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
                  if (drawerThemeIcon) drawerThemeIcon.textContent = isDark ? '☀️' : '🌙';
                  if (drawerThemeLabel) drawerThemeLabel.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
                }
                updateThemeIcon();

                function toggleTheme() {
                  const current = document.documentElement.getAttribute('data-theme');
                  const next = current === 'dark' ? 'light' : 'dark';
                  document.documentElement.setAttribute('data-theme', next);
                  localStorage.setItem('bn_theme', next);
                  updateThemeIcon();
                  showToast(next === 'dark' ? 'OLED Dark Mode Enabled 🌙' : 'Light Mode Enabled ☀️');
                }

                if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
                if (drawerThemeBtn) drawerThemeBtn.addEventListener('click', toggleTheme);
                // 3. Multi-Currency Live Switcher (NPR default, dropdown UI)
                // Rates always fetched live from /api/forex (GrismaInfo/NRB).
                // FALLBACK-ONLY: these values are used ONLY if the API call fails completely.
                let forexRates = { NPR: 1, USD: 151.48, INR: 1.6 };
                let currentCurrency = localStorage.getItem('bn_currency') || 'NPR';

                function formatCurrencyPrice(baseNpr, cur) {
                  const val = parseFloat(baseNpr);
                  if (isNaN(val) || val <= 0) return cur === 'USD' ? '$0' : cur === 'INR' ? '₹0' : 'Rs. 0';
                  if (cur === 'USD') {
                    return '$' + Math.ceil(val / forexRates.USD).toLocaleString('en-US');
                  }
                  if (cur === 'INR') {
                    return '₹' + (Math.ceil((val / forexRates.INR) / 5) * 5).toLocaleString('en-IN');
                  }
                  return 'Rs. ' + Math.ceil(val).toLocaleString('en-NP');
                }

                function updateAllPrices() {
                  document.querySelectorAll('[data-base-npr]').forEach(el => {
                    const baseNpr = parseFloat(el.getAttribute('data-base-npr') || '0');
                    if (baseNpr > 0) el.textContent = formatCurrencyPrice(baseNpr, currentCurrency);
                  });
                  if (typeof renderWishlist === 'function') renderWishlist();
                  if (typeof renderCompareDock === 'function') renderCompareDock();
                }

                function setCurrency(cur) {
                  currentCurrency = cur;
                  localStorage.setItem('bn_currency', cur);
                  const dd = document.getElementById('currencyDropdown');
                  if (dd) dd.value = cur;
                  updateAllPrices();
                }

                // Dropdown listener
                const currencyDropdown = document.getElementById('currencyDropdown');
                if (currencyDropdown) {
                  currencyDropdown.value = currentCurrency;
                  currencyDropdown.addEventListener('change', () => {
                    setCurrency(currencyDropdown.value);
                    showToast('Currency: ' + currencyDropdown.value + ' 💱');
                  });
                }

                // Fetch LIVE forex rates from /api/forex (GrismaInfo / NRB) on every page load.
                // 5-min session cache to avoid duplicate calls within same tab session.
                // Prices are always updated after a fresh API response regardless of selected currency.
                (function fetchLiveForex() {
                  const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
                  try {
                    const cached = sessionStorage.getItem('bn_forex_rates');
                    if (cached) {
                      const parsed = JSON.parse(cached);
                      if (parsed && parsed.rates && (Date.now() - (parsed.time || 0) < CACHE_TTL)) {
                        // Use cached rates immediately, still fetch in background to refresh
                        forexRates.USD = Number(parsed.rates.USD) || forexRates.USD;
                        forexRates.INR = Number(parsed.rates.INR) || forexRates.INR;
                        updateAllPrices();
                      }
                    }
                  } catch(e) {}

                  // Always fetch live — API is fast (GrismaInfo CDN-backed)
                  fetch('/api/forex')
                    .then(r => r.ok ? r.json() : null)
                    .then(data => {
                      if (data && data.rates) {
                        const liveUSD = Number(data.rates.USD);
                        const liveINR = Number(data.rates.INR);
                        if (liveUSD > 0) forexRates.USD = liveUSD;
                        if (liveINR > 0) forexRates.INR = liveINR;
                        try {
                          sessionStorage.setItem('bn_forex_rates', JSON.stringify({
                            rates: { USD: forexRates.USD, INR: forexRates.INR },
                            date: data.date,
                            time: Date.now()
                          }));
                        } catch(e) {}
                        // Always refresh displayed prices with live rates
                        updateAllPrices();
                        // Update dropdown title with live rate info
                        const ddWrap = document.querySelector('.currency-dropdown-wrap');
                        if (ddWrap) ddWrap.title = 'Live NRB Rates — $1 = Rs. ' + forexRates.USD + ' | ₹100 = Rs. ' + Math.round(forexRates.INR * 100);
                      }
                    })
                    .catch(() => {
                      // Silent fail — fallback rates remain active
                    });
                })();

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
                    if (wishlistTotalEl) wishlistTotalEl.textContent = formatCurrencyPrice(0, currentCurrency);
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
                          <div class="wishlist-item-price">\${formatCurrencyPrice(item.price, currentCurrency)}</div>
                          <div style="display: flex; gap: 8px; margin-top: 6px;">
                            <a href="\${item.url}" class="product-buy" style="padding: 4px 10px; font-size: 11px;">View Deal ↗</a>
                            <button type="button" class="filter-pill remove-wishlist-btn" data-id="\${item.id}" style="padding: 4px 8px; font-size: 11px;">Remove</button>
                          </div>
                        </div>
                      </div>
                    \`;
                  }).join('');

                  if (wishlistTotalEl) wishlistTotalEl.textContent = formatCurrencyPrice(total, currentCurrency);

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

                  const openComparePageDirectLink = document.getElementById('openComparePageDirectLink');
                  if (openComparePageDirectLink) {
                    if (compareItems.length > 0) {
                      openComparePageDirectLink.href = '/compare?ids=' + compareItems.map(i => i.id).join(',');
                    } else {
                      openComparePageDirectLink.href = '/compare';
                    }
                  }

                  if (!compareDockItems) return;
                  compareDockItems.innerHTML = compareItems.map(item => \`
                    <div class="compare-mini-card">
                      <button type="button" class="remove-compare-btn" data-id="\${item.id}" style="position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.6); color: #fff; border:none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer;">×</button>
                      <img src="\${item.image}" alt="\${item.name}" />
                      <strong style="font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">\${item.name}</strong>
                      <span style="font-size: 13px; font-weight: 800; color: var(--accent);">\${formatCurrencyPrice(item.price, currentCurrency)}</span>
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
                              \${compareItems.map(i => \`<td style="font-size: 16px; font-weight: 900; color: var(--accent); text-align: center;">\${formatCurrencyPrice(i.price, currentCurrency)}</td>\`).join('')}
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
                              \${compareItems.map(i => \`<td style="text-align: center; color: var(--emerald); font-weight: 700;">\${i.price >= 12000 ? 'Available (From ' + formatCurrencyPrice(Math.round(i.price/18), currentCurrency) + '/mo)' : 'N/A'}</td>\`).join('')}
                            </tr>
                            <tr>
                              <td><strong>Store Delivery</strong></td>
                              \${compareItems.map(() => \`<td style="text-align: center;">Verified Stores (KTM &amp; Nationwide Courier)</td>\`).join('')}
                            </tr>
                            <tr>
                              <td><strong>Action</strong></td>
                              \${compareItems.map(i => \`<td style="text-align: center;"><a href="/product/\${i.id}" class="product-buy" style="display: inline-block;">View Full Details →</a></td>\`).join('')}
                            </tr>
                          </tbody>
                        </table>
                        <div style="margin-top: 20px; text-align: center;">
                          <a href="/compare?ids=\${compareItems.map(i => i.id).join(',')}" class="product-buy" style="display: inline-block; padding: 10px 24px; font-weight: 800; font-size: 13.5px; text-decoration: none;">
                            Open Full REHub Comparison Matrix &amp; Labs Scores ➔
                          </a>
                        </div>
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

                // Two Smart Hub Dropdowns (Categories Hub & Explore Menu Hub)
                const allDepartmentsBtn = document.getElementById('allDepartmentsBtn');
                const categoriesWrap = document.querySelector('.nav-categories-dropdown-wrap');
                const navMoreBtn = document.getElementById('navMoreDropdownBtn');
                const navMoreWrap = document.querySelector('.nav-more-dropdown-wrap');

                if (allDepartmentsBtn && categoriesWrap) {
                  allDepartmentsBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (window.innerWidth <= 768) {
                      openDrawer();
                    } else {
                      if (navMoreWrap) navMoreWrap.classList.remove('open');
                      categoriesWrap.classList.toggle('open');
                    }
                  });
                }

                if (navMoreBtn && navMoreWrap) {
                  navMoreBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (categoriesWrap) categoriesWrap.classList.remove('open');
                    navMoreWrap.classList.toggle('open');
                  });
                }

                // Global outside click handler to close open dropdowns
                document.addEventListener('click', (e) => {
                  if (categoriesWrap && !categoriesWrap.contains(e.target)) {
                    categoriesWrap.classList.remove('open');
                  }
                  if (navMoreWrap && !navMoreWrap.contains(e.target)) {
                    navMoreWrap.classList.remove('open');
                  }
                });

                document.addEventListener('keydown', (e) => {
                  if (e.key === 'Escape') {
                    closeDrawer();
                    closeWishlist();
                    if (categoriesWrap) categoriesWrap.classList.remove('open');
                    if (navMoreWrap) navMoreWrap.classList.remove('open');
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

                // 11. Instant Live Search Autocomplete Engine
                const searchInput = document.getElementById('headerSearchInput');
                const searchDropdown = document.getElementById('headerSearchDropdown');
                let searchDebounceTimer;

                if (searchInput && searchDropdown) {
                  searchInput.addEventListener('input', (e) => {
                    clearTimeout(searchDebounceTimer);
                    const q = e.target.value.trim();
                    if (q.length < 2) {
                      searchDropdown.classList.remove('open');
                      searchDropdown.innerHTML = '';
                      return;
                    }
                    searchDebounceTimer = setTimeout(async () => {
                      try {
                        const res = await fetch('/api/search/live?q=' + encodeURIComponent(q));
                        if (!res.ok) return;
                        const data = await res.json();
                        const { products = [], articles = [], stores = [] } = data;

                        if (products.length === 0 && articles.length === 0 && stores.length === 0) {
                          searchDropdown.innerHTML = '<div class="search-autocomplete-empty">No results found for "<strong>' + q + '</strong>"</div>';
                          searchDropdown.classList.add('open');
                          return;
                        }

                        let html = '';
                        if (products.length > 0) {
                          html += '<div class="search-group-title">Products & Deals (' + products.length + ')</div>';
                          products.forEach(p => {
                            html += '<a href="' + p.url + '" class="search-result-row">' +
                              '<img src="' + (p.image_url || '') + '" class="search-result-img" alt="' + p.name + '" />' +
                              '<div class="search-result-info">' +
                                '<div class="search-result-title">' + p.name + '</div>' +
                                '<div class="search-result-meta">' +
                                  '<span class="search-result-price">Rs. ' + p.price.toLocaleString() + '</span>' +
                                  '<span>•</span>' +
                                  '<span>' + (p.store_name || 'Store') + '</span>' +
                                '</div>' +
                              '</div>' +
                            '</a>';
                          });
                        }

                        if (articles.length > 0) {
                          html += '<div class="search-group-title">Editorial Reviews & Guides (' + articles.length + ')</div>';
                          articles.forEach(a => {
                            html += '<a href="' + a.url + '" class="search-result-row">' +
                              '<img src="' + (a.cover_image || '') + '" class="search-result-img" alt="' + a.title + '" />' +
                              '<div class="search-result-info">' +
                                '<div class="search-result-title">' + a.title + '</div>' +
                                '<div class="search-result-meta">' +
                                  '<span>' + (a.category || 'Review') + '</span>' +
                                '</div>' +
                              '</div>' +
                            '</a>';
                          });
                        }

                        if (stores.length > 0) {
                          html += '<div class="search-group-title">Authorized Stores (' + stores.length + ')</div>';
                          stores.forEach(s => {
                            html += '<a href="' + s.url + '" class="search-result-row">' +
                              '<img src="' + (s.logo_url || '') + '" class="search-result-img" alt="' + s.name + '" />' +
                              '<div class="search-result-info">' +
                                '<div class="search-result-title">' + s.name + '</div>' +
                                '<div class="search-result-meta"><span>Verified Retailer</span></div>' +
                              '</div>' +
                            '</a>';
                          });
                        }

                        searchDropdown.innerHTML = html;
                        searchDropdown.classList.add('open');
                      } catch (err) {
                        console.error('Search error:', err);
                      }
                    }, 220);
                  });

                  document.addEventListener('click', (e) => {
                    if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
                      searchDropdown.classList.remove('open');
                    }
                  });
                }
              });
            `
          }}
        />
      </body>
    </html>
  );
};
