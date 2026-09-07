import { FC } from 'hono/jsx';
import { Category, Product, SiteSettings, Coupon } from '../types';
import { Layout } from './layout';
import {
  Header,
  Hero,
  TrustStrip,
  FlashSaleSection,
  CouponsStrip,
  ProductCard,
  NepalCityDeliveryEstimator,
  NepalShoppingFaq,
  EditorialBanner,
  MobileBottomBar,
  Footer
} from './components';

export const HomePage: FC<{
  settings: SiteSettings;
  categories: Category[];
  products: Product[];
  coupons?: Coupon[];
}> = ({ settings, categories, products, coupons = [] }) => {
  const title = settings.site_title
    ? `${settings.site_title} — Verified Shopping Deals, EMI & Prices in Nepal`
    : 'BuyerNepal — Verified Shopping Deals, EMI & Prices in Nepal';

  const description =
    settings.site_description ||
    'Discover products worth buying in Nepal — verified NPR prices, 0% bank EMI, authorized store links, and zero marketplace markups.';

  const showFlashSale = settings.flash_sale_enabled !== '0';

  // Schema.org ItemList for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Curated Shopping Deals, 0% EMI & Prices in Nepal',
    description: description,
    itemListElement: products.slice(0, 15).map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        description: p.description,
        image: p.image_url,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'NPR',
          price: p.price,
          availability: 'https://schema.org/InStock'
        }
      }
    }))
  };

  return (
    <Layout
      title={title}
      description={description}
      jsonLd={jsonLd}
    >
      <div className="store-page">
        <Header settings={settings} categories={categories} />
        <Hero settings={settings} />
        <TrustStrip />

        {/* Live Flash Sale Showcase */}
        {showFlashSale && <FlashSaleSection products={products} />}

        {/* Coupons Strip */}
        {coupons.length > 0 && <CouponsStrip coupons={coupons} />}

        {/* Categories Section */}
        <section className="store-shell category-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">EXPLORE DEPARTMENTS</span>
              <h2>Shop by Nepali Category</h2>
            </div>
            <span className="section-count">{categories.length} Departments</span>
          </div>
          <div className="category-row">
            <a href="/" className="category-chip active" data-cat="all">
              <span>🛍️</span> All Categories
            </a>
            {categories.map((cat) => (
              <a key={cat.id} href={`/category/${cat.slug}`} className="category-chip" data-cat={cat.id}>
                <span>{cat.icon || '📁'}</span>
                <span>{cat.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Filter Bar & Products Shortlist */}
        <section className="store-shell products-section">
          <div className="filter-bar" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div className="filter-chips-group">
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--muted)', marginRight: '4px' }}>FILTER:</span>
                <button type="button" className="filter-pill active" data-filter="all">All Items</button>
                <button type="button" className="filter-pill" data-filter="hot">🔥 Hot Deals</button>
                <button type="button" className="filter-pill" data-filter="editor">🏆 Editor\'s Pick</button>
                <button type="button" className="filter-pill" data-filter="emi">💳 0% EMI Ready</button>
                <button type="button" className="filter-pill" data-filter="under10k">💰 Under Rs. 10,000</button>
                <button type="button" className="filter-pill" data-filter="flagship">📱 Flagships</button>
                <button type="button" className="filter-pill" data-filter="local">🇳🇵 Nepal Classic</button>
              </div>

              <div className="sort-controls">
                <label htmlFor="sortSelect">Sort By:</label>
                <select id="sortSelect" className="sort-select">
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="discount">Biggest Discount</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Quick Store and Price Range Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', paddingTop: '10px', borderTop: '1px solid var(--line)' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>VERIFIED STORES:</span>
              <button type="button" className="filter-pill active store-filter-pill" data-store="all">All Stores</button>
              <button type="button" className="filter-pill store-filter-pill" data-store="daraz">Daraz Mall</button>
              <button type="button" className="filter-pill store-filter-pill" data-store="oliz">Oliz Store</button>
              <button type="button" className="filter-pill store-filter-pill" data-store="samsung">Samsung Plaza</button>
              <button type="button" className="filter-pill store-filter-pill" data-store="evo">EvoStore</button>
              <button type="button" className="filter-pill store-filter-pill" data-store="goldstar">Goldstar</button>
            </div>
          </div>

          <div className="section-heading" style={{ marginTop: '20px' }}>
            <div>
              <span className="section-kicker">VERIFIED CATALOG</span>
              <h2>Curated Products in Nepal</h2>
            </div>
            <span id="productCountBadge" className="section-count">
              Showing {products.length} products
            </span>
          </div>

          {products.length > 0 ? (
            <div id="productGrid" className="product-grid">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="store-empty">
              <div className="empty-icon">🔍</div>
              <h3>No products available yet</h3>
              <p>Check back soon or visit our admin panel to seed curated products.</p>
              <a href="/admin" className="primary-action">
                Go to Admin Portal
              </a>
            </div>
          )}

          <div id="noSearchResults" className="store-empty" style={{ display: 'none' }}>
            <div className="empty-icon">⌕</div>
            <h3>No matching products found</h3>
            <p>Try searching with another keyword or reset your filter chips.</p>
            <button
              id="resetFiltersBtn"
              type="button"
              className="primary-action"
              style={{ marginTop: '12px' }}
            >
              Reset All Filters
            </button>
          </div>
        </section>

        {/* Nepal Courier & Delivery Fee Estimator */}
        <section className="store-shell" style={{ marginTop: '36px' }}>
          <NepalCityDeliveryEstimator />
        </section>

        {/* Nepal Shopping FAQ Accordion */}
        <NepalShoppingFaq />

        <EditorialBanner count={products.length} />
        <Footer settings={settings} categories={categories} />
        <MobileBottomBar activeTab="home" />
      </div>

      {/* Client-Side Search, Filter & Quick Actions Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function() {
  // Coupon copy buttons
  document.querySelectorAll('.copy-coupon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-code');
      if (code) {
        navigator.clipboard.writeText(code).then(() => {
          if (window.bnShowToast) window.bnShowToast('Copied code ' + code + ' to clipboard! 🎉');
        }).catch(() => {
          if (window.bnShowToast) window.bnShowToast('Coupon code: ' + code);
        });
      }
    });
  });

  // Client-side Search & Filtering Engine
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  const sortSelect = document.getElementById('sortSelect');
  const filterPills = document.querySelectorAll('.filter-pill:not(.store-filter-pill):not(#clearWishlistBtn):not(.remove-wishlist-btn):not(#closeCompareDockBtn)');
  const storeFilterPills = document.querySelectorAll('.store-filter-pill');
  const productCards = Array.from(document.querySelectorAll('.product-card:not(.compare-mini-card)'));
  const countBadge = document.getElementById('productCountBadge');
  const noResults = document.getElementById('noSearchResults');
  const productGrid = document.getElementById('productGrid');
  const resetBtn = document.getElementById('resetFiltersBtn');

  let currentFilter = 'all';
  let currentStoreFilter = 'all';
  let searchQuery = '';

  function applyFilters() {
    let visibleCount = 0;

    productCards.forEach(card => {
      const name = card.getAttribute('data-name') || '';
      const desc = card.getAttribute('data-desc') || '';
      const store = card.getAttribute('data-store') || '';
      const badge = card.getAttribute('data-badge') || '';
      const price = parseFloat(card.getAttribute('data-price') || '0');
      const emi = card.getAttribute('data-emi') || '0';

      let matchesSearch = true;
      if (searchQuery) {
        matchesSearch = name.includes(searchQuery) || desc.includes(searchQuery) || store.includes(searchQuery);
      }

      let matchesFilter = true;
      if (currentFilter === 'hot') {
        matchesFilter = badge.includes('hot') || badge.includes('flash');
      } else if (currentFilter === 'editor') {
        matchesFilter = badge.includes('editor') || badge.includes('top');
      } else if (currentFilter === 'emi') {
        matchesFilter = emi === '1';
      } else if (currentFilter === 'under10k') {
        matchesFilter = price < 10000;
      } else if (currentFilter === 'flagship') {
        matchesFilter = price > 100000;
      } else if (currentFilter === 'local') {
        matchesFilter = badge.includes('classic') || badge.includes('nepal');
      }

      let matchesStore = true;
      if (currentStoreFilter !== 'all') {
        matchesStore = store.includes(currentStoreFilter);
      }

      if (matchesSearch && matchesFilter && matchesStore) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countBadge) {
      countBadge.textContent = 'Showing ' + visibleCount + ' products';
    }

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
    if (productGrid) {
      productGrid.style.display = visibleCount === 0 ? 'none' : 'grid';
    }
  }

  function applySorting() {
    if (!productGrid) return;
    const val = sortSelect ? sortSelect.value : 'featured';

    const sorted = productCards.slice().sort((a, b) => {
      const priceA = parseFloat(a.getAttribute('data-price') || '0');
      const priceB = parseFloat(b.getAttribute('data-price') || '0');
      const discA = parseFloat(a.getAttribute('data-discount') || '0');
      const discB = parseFloat(b.getAttribute('data-discount') || '0');
      const ratA = parseFloat(a.getAttribute('data-rating') || '0');
      const ratB = parseFloat(b.getAttribute('data-rating') || '0');

      if (val === 'price-asc') return priceA - priceB;
      if (val === 'price-desc') return priceB - priceA;
      if (val === 'discount') return discB - discA;
      if (val === 'rating') return ratB - ratA;
      return 0;
    });

    sorted.forEach(el => productGrid.appendChild(el));
  }

  // Filter pills click
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  // Store filter pills click
  storeFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      storeFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentStoreFilter = pill.getAttribute('data-store') || 'all';
      applyFilters();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      if (clearBtn) clearBtn.style.display = searchQuery ? 'inline-block' : 'none';
      applyFilters();
    });
  }

  // Clear Search
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
        clearBtn.style.display = 'none';
        applyFilters();
        searchInput.focus();
      }
    });
  }

  // Hero Quick Tag Clicks
  document.querySelectorAll('.quick-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const q = tag.getAttribute('data-search') || tag.textContent.trim();
      if (searchInput) {
        searchInput.value = q;
        searchQuery = q.toLowerCase();
        if (clearBtn) clearBtn.style.display = 'inline-block';
        applyFilters();
        productGrid?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Sort dropdown change
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      applySorting();
    });
  }

  // Reset Filters button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
      }
      if (clearBtn) clearBtn.style.display = 'none';

      filterPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-filter') === 'all'));
      currentFilter = 'all';

      storeFilterPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-store') === 'all'));
      currentStoreFilter = 'all';

      if (sortSelect) sortSelect.value = 'featured';
      applyFilters();
      applySorting();
    });
  }
})();
          `
        }}
      />
    </Layout>
  );
};
