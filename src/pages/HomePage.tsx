import { useEffect, useState } from 'react';
import Loading from '../components/ui/Loading';

interface Settings {
  site_title?: string;
  site_description?: string;
  homepage_html?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  affiliate_url: string;
}

export default function HomePage() {
  const [settings, setSettings] = useState<Settings>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/settings').then((r) => r.json()),
      fetch('/api/categories').then((r) => r.json()),
      fetch('/api/products').then((r) => r.json()),
    ])
      .then(([settingsData, categoriesData, productsData]: any[]) => {
        setSettings(settingsData.settings || {});
        setCategories(categoriesData.categories || []);
        setProducts(productsData.products || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 btn btn-primary"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            {settings.site_title || 'BuyerNepal'}
          </h1>
          <nav className="flex items-center gap-6">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </a>
            {categories.slice(0, 5).map((cat) => (
              <a
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {cat.name}
              </a>
            ))}
            <a
              href="/admin/login"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Admin
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="main-content" className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {settings.site_title || 'Welcome to BuyerNepal'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {settings.site_description || 'Discover the best products and deals'}
          </p>
        </div>
      </section>

      {/* Custom Homepage Content */}
      {settings.homepage_html && (
        <section className="container mx-auto px-4 py-8">
          <div dangerouslySetInnerHTML={{ __html: settings.homepage_html }} />
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Browse Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="card p-4 text-center hover:shadow-md transition-shadow"
              >
                <span className="font-medium text-foreground">{cat.name}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Products */}
      {products.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Featured Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={product.id} className="card overflow-hidden">
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    // Optimization: Eager load the first row (4 items) for LCP, lazy load the rest
                    loading={index < 4 ? "eager" : "lazy"}
                    fetchPriority={index < 4 ? "high" : "auto"}
                    decoding="async"
                  />
                )}
                <div className="p-4">
                  <h4 className="font-semibold text-foreground mb-2">{product.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    <a
                      href={product.affiliate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      aria-label={`Buy ${product.name} now`}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {settings.site_title || 'BuyerNepal'}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
