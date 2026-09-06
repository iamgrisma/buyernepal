import { useEffect, useMemo, useState } from 'react';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import StoreHeader from '../components/store/StoreHeader';
import ProductCard, { StoreProduct } from '../components/store/ProductCard';

interface Settings { site_title?: string; site_description?: string; site_logo?: string; homepage_html?: string; footer_html?: string; }
interface Category { id: number; name: string; slug: string; description?: string; }

async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { headers: { Accept: 'application/json' }, signal });
  const data: any = await response.json();
  if (!response.ok) throw new Error(data?.error || `Request failed: ${response.status}`);
  return data as T;
}

function SkeletonGrid() {
  return <div className="product-grid">{Array.from({ length: 8 }).map((_, i) => <div className="product-skeleton" key={i}><div className="skeleton-image" /><div className="skeleton-line wide" /><div className="skeleton-line" /><div className="skeleton-line short" /></div>)}</div>;
}

export default function HomePage() {
  const [settings, setSettings] = useState<Settings>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 10000);
    Promise.allSettled([
      getJson<{ settings: Settings }>('/api/settings', controller.signal),
      getJson<{ categories: Category[] }>('/api/categories', controller.signal),
      getJson<{ products: StoreProduct[] }>('/api/products', controller.signal),
    ]).then(([settingsResult, categoriesResult, productsResult]) => {
      if (!alive) return;
      let failures = 0;
      if (settingsResult.status === 'fulfilled') setSettings(settingsResult.value.settings || {}); else failures++;
      if (categoriesResult.status === 'fulfilled') setCategories(categoriesResult.value.categories || []); else failures++;
      if (productsResult.status === 'fulfilled') setProducts(productsResult.value.products || []); else failures++;
      if (failures === 3) setError('We could not connect to the store right now. Please try again.');
    }).catch(() => alive && setError('We could not load the store right now.')).finally(() => {
      window.clearTimeout(timer);
      if (alive) setLoading(false);
    });
    return () => { alive = false; controller.abort(); window.clearTimeout(timer); };
  }, []);

  const filteredProducts = useMemo(() => {
    const list = Array.isArray(products) ? products : [];
    const needle = query.trim().toLowerCase();
    return list.filter((product) => {
      if (!product) return false;
      const name = product.name || '';
      const desc = product.description || '';
      const matchesQuery = !needle || `${name} ${desc}`.toLowerCase().includes(needle);
      const matchesCategory = !activeCategory || String(product.category_id ?? '') === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, activeCategory]);

  const sanitizedHomepageHtml = useMemo(() => {
    if (!settings?.homepage_html) return '';
    try {
      return typeof DOMPurify?.sanitize === 'function'
        ? DOMPurify.sanitize(settings.homepage_html)
        : settings.homepage_html;
    } catch {
      return '';
    }
  }, [settings?.homepage_html]);

  const title = settings.site_title || 'BuyerNepal';
  const description = settings.site_description || "Discover products worth buying in Nepal — curated, compared and easy to shop.";

  return <div className="store-page">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <StoreHeader title={title} logo={settings.site_logo} categories={categories} />

    <main id="main-content">
      <section className="store-hero">
        <div className="store-shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">SMART SHOPPING, MADE SIMPLE</span>
            <h1>Find better products.<br /><em>Buy with confidence.</em></h1>
            <p>{description}</p>
            <div className="hero-search">
              <span aria-hidden="true">⌕</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, brands or categories…" aria-label="Search products" />
              {query && <button onClick={() => setQuery('')} aria-label="Clear search">×</button>}
            </div>
            <div className="hero-points"><span>✓ Curated picks</span><span>✓ Local prices</span><span>✓ Direct shopping links</span></div>
          </div>
          <div className="hero-card" aria-hidden="true">
            <div className="hero-card-glow" />
            <div className="hero-card-label">BUYERNEPAL</div>
            <div className="hero-card-title">Less scrolling.<br /><strong>More buying.</strong></div>
            <div className="hero-mini-grid"><span>01<br /><b>Discover</b></span><span>02<br /><b>Compare</b></span><span>03<br /><b>Shop</b></span></div>
          </div>
        </div>
      </section>

      <section className="store-shell trust-strip">
        <div><strong>Built for Nepal</strong><span>Prices and shopping links made easy to understand.</span></div>
        <div><strong>Curated, not crowded</strong><span>Useful products without endless marketplace noise.</span></div>
        <div><strong>Shop on the source</strong><span>We send you directly to the seller or store.</span></div>
      </section>

      {sanitizedHomepageHtml && <section className="store-shell custom-content" dangerouslySetInnerHTML={{ __html: sanitizedHomepageHtml }} />}

      <section className="store-shell category-section">
        <div className="section-heading"><div><span className="section-kicker">EXPLORE</span><h2>Shop by category</h2></div><span className="section-count">{categories.length} categories</span></div>
        <div className="category-row">
          <button className={`category-chip ${!activeCategory ? 'active' : ''}`} onClick={() => setActiveCategory('')}>All products</button>
          {categories.map((category) => <button key={category.id} className={`category-chip ${activeCategory === String(category.id) ? 'active' : ''}`} onClick={() => setActiveCategory(String(category.id))}>{category.name}</button>)}
        </div>
      </section>

      <section className="store-shell products-section">
        <div className="section-heading"><div><span className="section-kicker">THE SHORTLIST</span><h2>{query || activeCategory ? 'Matching products' : 'Featured products'}</h2></div><span className="section-count">{filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}</span></div>
        {loading ? <SkeletonGrid /> : error ? <div className="store-empty error-state"><div className="empty-icon">!</div><h3>Store temporarily unavailable</h3><p>{error}</p><button className="primary-action" onClick={() => window.location.reload()}>Try again</button></div> : filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="store-empty"><div className="empty-icon">⌕</div><h3>No products found</h3><p>Try a different search or browse all categories.</p><button className="secondary-action" onClick={() => { setQuery(''); setActiveCategory(''); }}>Clear filters</button></div>}
      </section>

      <section className="store-shell editorial-banner">
        <div><span className="section-kicker">A BETTER WAY TO SHOP</span><h2>Discover first.<br />Decide faster.</h2><p>BuyerNepal is designed to help you find useful products quickly, understand what they cost, and continue to the store that sells them.</p></div>
        <div className="editorial-stat"><strong>{products.length || '—'}</strong><span>products currently listed</span></div>
      </section>
    </main>

    <footer className="store-footer">
      <div className="store-shell footer-grid">
        <div><Link to="/" className="store-brand footer-brand"><span className="store-logo-mark">B</span><span><strong>{title}</strong><small>SHOP SMARTER</small></span></Link><p>{description}</p></div>
        <div><h3>Explore</h3><Link to="/">Home</Link>{categories.slice(0, 5).map((category) => <Link key={category.id} to={`/category/${category.slug}`}>{category.name}</Link>)}</div>
        <div><h3>For admins</h3><Link to="/admin/login">Admin login</Link><span className="footer-note">Manage products, categories, reviews, coupons and site settings.</span></div>
      </div>
      <div className="store-shell footer-bottom"><span>© {new Date().getFullYear()} {title}. All rights reserved.</span><span>Made for shoppers in Nepal 🇳🇵</span></div>
    </footer>
  </div>;
}
