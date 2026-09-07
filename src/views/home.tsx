import { FC } from 'hono/jsx';
import { Category, Product, SiteSettings, Coupon } from '../types';
import { Layout } from './layout';
import {
  Header,
  Hero,
  TrustStrip,
  CouponsStrip,
  ProductCard,
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
    ? `${settings.site_title} — Verified Shopping Deals & Prices in Nepal`
    : 'BuyerNepal — Verified Shopping Deals & Prices in Nepal';

  const description =
    settings.site_description ||
    'Discover products worth buying in Nepal — verified NPR prices, authorized store links, and zero marketplace markups.';

  // Schema.org ItemList for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Curated Shopping Deals & Prices in Nepal',
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
          <div className="filter-bar">
            <div className="filter-chips-group">
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--muted)', marginRight: '4px' }}>FILTER:</span>
              <button type="button" className="filter-pill active" data-filter="all">All Items</button>
              <button type="button" className="filter-pill" data-filter="hot">🔥 Hot Deals</button>
              <button type="button" className="filter-pill" data-filter="editor">🏆 Editor\'s Pick</button>
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

          <div className="section-heading" style={{ marginTop: '16px' }}>
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

        <EditorialBanner count={products.length} />
        <Footer settings={settings} categories={categories} />
        <MobileBottomBar activeTab="home" />
      </div>

      {/* Instant Client-Side Search, Filter & Quick Actions Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function() {
  // Mobile drawer controls
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeMobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');

  function toggleMenu(open) {
    if (drawer && backdrop) {
      drawer.classList.toggle('open', open);
      backdrop.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
  }

  if (menuBtn) menuBtn.addEventListener('click', () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));
  if (backdrop) backdrop.addEventListener('click', () => toggleMenu(false));

  // Toast Helper
  function showToast(msg) {
    const toast = document.getElementById('toastMessage');
    const toastText = document.getElementById('toastText');
    if (toast && toastText) {
      toastText.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  }

  // Coupon copy buttons
  document.querySelectorAll('.copy-coupon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-code');
      if (code) {
        navigator.clipboard.writeText(code).then(() => {
          showToast('Copied code ' + code + ' to clipboard! 🎉');
        }).catch(() => {
          showToast('Coupon code: ' + code);
        });
      }
    });
  });

  // Client-side Search & Filtering Engine
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  const sortSelect = document.getElementById('sortSelect');
  const filterPills = document.querySelectorAll('.filter-pill');
  const productCards = Array.from(document.querySelectorAll('.product-card'));
  const countBadge = document.getElementById('productCountBadge');
  const noResults = document.getElementById('noSearchResults');
  const productGrid = document.getElementById('productGrid');
  const resetBtn = document.getElementById('resetFiltersBtn');

  let currentFilter = 'all';
  let searchQuery = '';

  function applyFilters() {
    let visibleCount = 0;

    productCards.forEach(card => {
      const name = card.getAttribute('data-name') || '';
      const desc = card.getAttribute('data-desc') || '';
      const store = card.getAttribute('data-store') || '';
      const badge = card.getAttribute('data-badge') || '';
      const price = parseFloat(card.getAttribute('data-price') || '0');

      let matchesSearch = true;
      if (searchQuery) {
        matchesSearch = name.includes(searchQuery) || desc.includes(searchQuery) || store.includes(searchQuery);
      }

      let matchesFilter = true;
      if (currentFilter === 'hot') {
        matchesFilter = badge.includes('hot');
      } else if (currentFilter === 'editor') {
        matchesFilter = badge.includes('editor');
      } else if (currentFilter === 'under10k') {
        matchesFilter = price < 10000;
      } else if (currentFilter === 'flagship') {
        matchesFilter = price > 100000;
      } else if (currentFilter === 'local') {
        matchesFilter = badge.includes('classic') || badge.includes('nepal');
      }

      if (matchesSearch && matchesFilter) {
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
  }

  // Quick tag search buttons
  document.querySelectorAll('.quick-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const term = tag.getAttribute('data-search');
      if (searchInput && term) {
        searchInput.value = term;
        searchQuery = term.toLowerCase().trim();
        if (clearBtn) clearBtn.style.display = 'block';
        applyFilters();
        searchInput.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      if (clearBtn) clearBtn.style.display = searchQuery ? 'block' : 'none';
      applyFilters();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearBtn.style.display = 'none';
      applyFilters();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
      }
      if (clearBtn) clearBtn.style.display = 'none';
      filterPills.forEach(p => p.classList.remove('active'));
      const allPill = document.querySelector('.filter-pill[data-filter="all"]');
      if (allPill) allPill.classList.add('active');
      currentFilter = 'all';
      applyFilters();
    });
  }

  // Sort dropdown
  if (sortSelect && productGrid) {
    sortSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      const cards = Array.from(productGrid.children);

      cards.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price') || '0');
        const priceB = parseFloat(b.getAttribute('data-price') || '0');
        const discountA = parseFloat(a.getAttribute('data-discount') || '0');
        const discountB = parseFloat(b.getAttribute('data-discount') || '0');
        const ratingA = parseFloat(a.getAttribute('data-rating') || '0');
        const ratingB = parseFloat(b.getAttribute('data-rating') || '0');

        if (val === 'price-asc') return priceA - priceB;
        if (val === 'price-desc') return priceB - priceA;
        if (val === 'discount') return discountB - discountA;
        if (val === 'rating') return ratingB - ratingA;
        return 0;
      });

      cards.forEach(c => productGrid.appendChild(c));
    });
  }
})();
`
        }}
      />
    </Layout>
  );
};
