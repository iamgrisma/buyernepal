import { FC } from 'hono/jsx';
import { Article, Category, Product, SiteSettings } from '../types';
import { Layout } from './layout';
import { Header, Footer, MobileBottomBar } from './components';

// Helper to format date
function formatDate(dateStr?: string): string {
  if (!dateStr) return 'Recently';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return 'Recently';
  }
}

// Helper to render markdown-like content into structured HTML safely
function renderArticleHtml(markdown: string): string {
  if (!markdown) return '';
  const lines = markdown.split('\n');
  const htmlParts: string[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      if (inList) {
        htmlParts.push('</ul>');
        inList = false;
      }
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      if (inList) { htmlParts.push('</ul>'); inList = false; }
      const text = line.replace('### ', '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      htmlParts.push(`<h3 id="${id}" class="article-subheading">${text}</h3>`);
      continue;
    }

    // H2
    if (line.startsWith('## ')) {
      if (inList) { htmlParts.push('</ul>'); inList = false; }
      const text = line.replace('## ', '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      htmlParts.push(`<h2 id="${id}" class="article-section-title">${text}</h2>`);
      continue;
    }

    // Bullet list items
    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        htmlParts.push('<ul class="article-bullet-list">');
        inList = true;
      }
      const content = line.substring(2)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      htmlParts.push(`<li>${content}</li>`);
      continue;
    }

    // Numbered list items
    if (/^\d+\.\s/.test(line)) {
      if (inList) { htmlParts.push('</ul>'); inList = false; }
      const content = line.replace(/^\d+\.\s/, '')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      htmlParts.push(`<div class="article-num-item"><span class="num-bullet">•</span><div>${content}</div></div>`);
      continue;
    }

    // Callout quote
    if (line.startsWith('> ')) {
      if (inList) { htmlParts.push('</ul>'); inList = false; }
      const content = line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      htmlParts.push(`<blockquote class="article-callout"><span class="callout-icon">💡</span><p>${content}</p></blockquote>`);
      continue;
    }

    // Standard paragraph
    if (inList) { htmlParts.push('</ul>'); inList = false; }
    const pContent = line
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
    htmlParts.push(`<p class="article-paragraph">${pContent}</p>`);
  }

  if (inList) htmlParts.push('</ul>');
  return htmlParts.join('\n');
}

// Helper to extract table of contents items
function extractToc(markdown: string): { title: string; id: string }[] {
  const items: { title: string; id: string }[] = [];
  const lines = markdown.split('\n');
  for (const l of lines) {
    const trimmed = l.trim();
    if (trimmed.startsWith('### ') || trimmed.startsWith('## ')) {
      const text = trimmed.replace(/^#{2,3}\s+/, '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      items.push({ title: text, id });
    }
  }
  return items;
}

export const BlogIndexPage: FC<{
  articles: Article[];
  settings: SiteSettings;
  categories: Category[];
  activeCategory?: string;
}> = ({ articles, settings, categories, activeCategory = 'All' }) => {
  const articleCategories = ['All', 'Buying Guides', 'Smartphone Reviews', 'Laptop Guides', 'Nepal Tech'];
  const featuredArticle = articles.find((a) => a.is_featured === 1) || articles[0];
  const listArticles = articles.filter((a) => a.id !== featuredArticle?.id);

  return (
    <Layout
      title="Tech Guides, Reviews & Buying Advice in Nepal | BuyerNepal Editorial"
      description="In-depth Nepali tech reviews, smartphone comparisons, laptop buyer guides, MDMS customs regulations, and verified NPR price breakdowns."
      url="https://buyernepal.com/blog"
    >
      <div className="store-page blog-page">
        <Header settings={settings} categories={categories} activeSlug="blog" />
        <main className="store-shell blog-index-wrapper">
        {/* Editorial Header Hero */}
        <div className="magazine-hero-header">
          <div className="magazine-hero-badge">
            <span>📰 BUYERNEPAL EDITORIAL & LABS</span>
          </div>
          <h1 className="magazine-hero-title">
            Smart Buying Advice & In-Depth Tech Reviews for Nepal
          </h1>
          <p className="magazine-hero-subtitle">
            Unbiased field testing, verified NPR price comparisons, MDMS regulatory guides, and expert recommendations — tailored specifically for Nepali consumers.
          </p>

          {/* Category Filter Pills */}
          <div className="blog-category-nav">
            {articleCategories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
              const url = cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`;
              return (
                <a
                  key={cat}
                  href={url}
                  className={`blog-cat-pill ${isActive ? 'blog-cat-pill-active' : ''}`}
                >
                  {cat}
                </a>
              );
            })}
          </div>
        </div>

        {/* Featured Editorial Story */}
        {featuredArticle && (
          <div className="magazine-featured-card">
            <div className="featured-card-media">
              <a href={`/blog/${featuredArticle.slug}`}>
                <img
                  src={featuredArticle.cover_image}
                  alt={featuredArticle.title}
                  className="featured-card-img"
                  loading="eager"
                />
              </a>
              <span className="featured-tag-badge">⭐ FEATURED STORY</span>
            </div>
            <div className="featured-card-content">
              <div className="featured-card-meta">
                <span className="article-category-badge">{featuredArticle.category}</span>
                <span className="meta-dot">•</span>
                <span className="article-meta-time">⏱️ {featuredArticle.read_time_minutes || 5} min read</span>
                <span className="meta-dot">•</span>
                <span className="article-meta-date">{formatDate(featuredArticle.published_at || featuredArticle.created_at)}</span>
              </div>
              <h2 className="featured-card-title">
                <a href={`/blog/${featuredArticle.slug}`}>{featuredArticle.title}</a>
              </h2>
              <p className="featured-card-excerpt">{featuredArticle.excerpt}</p>
              <div className="featured-card-footer">
                <div className="author-info">
                  <div className="author-avatar">✍️</div>
                  <div>
                    <div className="author-name">{featuredArticle.author_name}</div>
                    <div className="author-role">Senior Tech Analyst</div>
                  </div>
                </div>
                <a href={`/blog/${featuredArticle.slug}`} className="read-featured-btn">
                  Read Full Guide →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Magazine Grid Articles */}
        <div className="magazine-section-header">
          <h2 className="section-title-clean">
            <span>🔥 Latest Editorial Stories & Buyer Guides</span>
            <span className="section-count">{articles.length} Guides</span>
          </h2>
        </div>

        {articles.length === 0 ? (
          <div className="empty-catalog" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <span style={{ fontSize: '3rem' }}>📰</span>
            <h3>No guides found in this category</h3>
            <p>Check back soon or explore our other tech buying categories.</p>
            <a href="/blog" className="read-featured-btn" style={{ display: 'inline-block', marginTop: '16px' }}>
              View All Guides
            </a>
          </div>
        ) : (
          <div className="magazine-grid">
            {(listArticles.length > 0 ? listArticles : articles).map((art) => (
              <article key={art.id} className="magazine-card">
                <div className="magazine-card-media">
                  <a href={`/blog/${art.slug}`}>
                    <img
                      src={art.cover_image}
                      alt={art.title}
                      className="magazine-card-img"
                      loading="lazy"
                    />
                  </a>
                  <span className="magazine-card-cat">{art.category}</span>
                </div>
                <div className="magazine-card-body">
                  <div className="magazine-card-meta">
                    <span>⏱️ {art.read_time_minutes || 5} min read</span>
                    <span>•</span>
                    <span>{formatDate(art.published_at || art.created_at)}</span>
                  </div>
                  <h3 className="magazine-card-title">
                    <a href={`/blog/${art.slug}`}>{art.title}</a>
                  </h3>
                  <p className="magazine-card-excerpt">{art.excerpt}</p>
                  <div className="magazine-card-footer">
                    <div className="magazine-card-author">
                      <span>👤</span>
                      <span>{art.author_name}</span>
                    </div>
                    <a href={`/blog/${art.slug}`} className="magazine-card-link">
                      Read →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Nepal Tech Intelligence Banner */}
        <div className="nepal-tech-banner">
          <div className="banner-content">
            <div className="banner-badge">🇳🇵 OFFICIAL REGULATORY ADVISORY</div>
            <h3>Looking for Verified NTA / MDMS Registration?</h3>
            <p>
              BuyerNepal guarantees that all smartphone stores and curated links listed on our platform sell 100% tax-paid, MDMS-registered handsets with authentic VAT bills and official Nepal brand warranties.
            </p>
          </div>
          <a href="https://mdms.nta.gov.np" target="_blank" rel="noopener noreferrer" className="banner-btn">
            Verify IMEI on NTA Portal ↗
          </a>
        </div>
        </main>
        <Footer settings={settings} categories={categories} />
        <MobileBottomBar />
      </div>
    </Layout>
  );
};

export const ArticleDetailPage: FC<{
  article: Article;
  relatedArticles?: Article[];
  featuredProducts?: Product[];
  settings: SiteSettings;
  categories: Category[];
}> = ({ article, relatedArticles = [], featuredProducts = [], settings, categories }) => {
  const contentHtml = renderArticleHtml(article.content);
  const toc = extractToc(article.content);
  const articleUrl = `https://buyernepal.com/blog/${article.slug}`;

  // Article JSON-LD Schema
  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: [article.cover_image],
    datePublished: article.published_at || article.created_at,
    dateModified: article.updated_at || article.published_at || article.created_at,
    author: [
      {
        '@type': 'Person',
        name: article.author_name,
        jobTitle: 'Tech Journalist & Analyst'
      }
    ],
    publisher: {
      '@type': 'Organization',
      name: 'BuyerNepal',
      logo: {
        '@type': 'ImageObject',
        url: 'https://buyernepal.com/static/favicon.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl
    }
  });

  return (
    <Layout
      title={`${article.title} | BuyerNepal Tech Magazine`}
      description={article.excerpt}
      image={article.cover_image}
      url={articleUrl}
      type="article"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />

      <div className="store-page article-page">
        <Header settings={settings} categories={categories} activeSlug="blog" />
        <div className="store-shell article-reader-wrapper">
        {/* Breadcrumb Navigation */}
        <nav className="article-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="sep">/</span>
          <a href="/blog">Tech Guides</a>
          <span className="sep">/</span>
          <a href={`/blog?category=${encodeURIComponent(article.category)}`}>{article.category}</a>
          <span className="sep">/</span>
          <span className="current">{article.title}</span>
        </nav>

        {/* Article Header */}
        <header className="article-header">
          <div className="article-header-cat">
            <span className="article-category-badge">{article.category}</span>
            <span className="article-read-badge">⏱️ {article.read_time_minutes || 5} min read</span>
            <span className="article-verified-badge">🛡️ Verified by BuyerNepal Labs</span>
          </div>

          <h1 className="article-headline">{article.title}</h1>
          <p className="article-deck">{article.excerpt}</p>

          <div className="article-byline-bar">
            <div className="author-block">
              <div className="author-avatar-large">✍️</div>
              <div className="author-details">
                <div className="author-name-bold">{article.author_name}</div>
                <div className="author-timestamp">
                  Published {formatDate(article.published_at || article.created_at)} • Updated {formatDate(article.updated_at || article.published_at)}
                </div>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="article-share-strip">
              <span className="share-label">Share:</span>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn whatsapp"
                title="Share on WhatsApp"
              >
                💬 WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn facebook"
                title="Share on Facebook"
              >
                📘 Facebook
              </a>
              <button
                type="button"
                className="share-btn copy"
                onclick={`navigator.clipboard.writeText('${articleUrl}').then(() => { this.innerText = '✓ Copied!'; setTimeout(() => { this.innerText = '🔗 Copy Link'; }, 2000); });`}
              >
                🔗 Copy Link
              </button>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="article-featured-media">
          <img
            src={article.cover_image}
            alt={article.title}
            className="article-hero-img"
            loading="eager"
          />
          <div className="article-media-caption">
            <span>📷 Visual lab analysis & authorized retail packaging in Nepal.</span>
          </div>
        </div>

        {/* 2-Column Article Layout: Left Content, Right Sidebar */}
        <div className="article-columns-layout">
          {/* Main Reading Column */}
          <main className="article-main-content">
            {/* Quick Summary Callout Box */}
            <div className="article-takeaways-box">
              <div className="takeaways-header">
                <span className="takeaways-icon">⚡</span>
                <strong>Key Takeaways for Nepali Buyers:</strong>
              </div>
              <ul className="takeaways-list">
                <li>Always confirm official NTA MDMS IMEI registration before making final payment.</li>
                <li>Compare authorized distributor warranty (GenNext, Samsung Plaza, Oliz) vs third-party retail stores.</li>
                <li>Prices quoted in this guide reflect genuine authorized retail pricing with 13% VAT bill included.</li>
              </ul>
            </div>

            {/* Rendered HTML Content */}
            <div className="article-rendered-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />

            {/* Embedded Featured Deals if any */}
            {featuredProducts && featuredProducts.length > 0 && (
              <div className="embedded-products-section">
                <h3 className="embedded-products-title">🏷️ Recommended Deals Mentioned in this Guide</h3>
                <div className="embedded-products-list">
                  {featuredProducts.map((p) => (
                    <div key={p.id} className="embedded-product-card">
                      <img src={p.image_url} alt={p.name} className="embedded-product-img" />
                      <div className="embedded-product-info">
                        <div className="embedded-product-badge">{p.badge || 'Verified Deal'}</div>
                        <h4 className="embedded-product-name">{p.name}</h4>
                        <div className="embedded-product-price">
                          <span className="currency-val" data-price-npr={p.price}>Rs. {p.price.toLocaleString()}</span>
                          {p.original_price && p.original_price > p.price && (
                            <span className="orig-price">Rs. {p.original_price.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="embedded-product-action">
                        <a href={`/product/${p.id}`} className="embedded-view-btn">
                          View Specs & Stores →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author Signature Box */}
            <div className="author-signature-box">
              <div className="sig-avatar">✍️</div>
              <div className="sig-info">
                <h4>About the Author: {article.author_name}</h4>
                <p>
                  Tech editor and market analyst at BuyerNepal. Specializing in smartphone hardware benchmarking, computing peripherals, and tracking consumer electronics import tariffs across Nepal.
                </p>
              </div>
            </div>

            {/* Back to Guides Button */}
            <div className="article-nav-footer">
              <a href="/blog" className="back-to-blog-btn">
                ← Back to All Tech Guides
              </a>
            </div>
          </main>

          {/* Sticky Sidebar */}
          <aside className="article-sidebar">
            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="sidebar-widget toc-widget">
                <h4 className="widget-title">📑 Table of Contents</h4>
                <ul className="toc-list">
                  {toc.map((item, idx) => (
                    <li key={idx}>
                      <a href={`#${item.id}`} className="toc-link">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* MDMS Verification Helper */}
            <div className="sidebar-widget advisory-widget">
              <div className="advisory-badge">MDMS HELPER</div>
              <h4>Check Your Phone's Legitimacy</h4>
              <p>
                Dial <code>*#06#</code> on your handset and enter the 15-digit IMEI on the Nepal Telecommunications Authority portal to verify tax status.
              </p>
              <a
                href="https://mdms.nta.gov.np"
                target="_blank"
                rel="noopener noreferrer"
                className="widget-cta-btn"
              >
                Verify on NTA MDMS ↗
              </a>
            </div>

            {/* Trending Guides */}
            {relatedArticles && relatedArticles.length > 0 && (
              <div className="sidebar-widget trending-widget">
                <h4 className="widget-title">🔥 Related Buyer Guides</h4>
                <div className="trending-list">
                  {relatedArticles.slice(0, 3).map((ra) => (
                    <a key={ra.id} href={`/blog/${ra.slug}`} className="trending-item">
                      <img src={ra.cover_image} alt={ra.title} className="trending-img" />
                      <div>
                        <div className="trending-title">{ra.title}</div>
                        <div className="trending-meta">⏱️ {ra.read_time_minutes || 5} min read</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
        </div>
        <Footer settings={settings} categories={categories} />
        <MobileBottomBar />
      </div>
    </Layout>
  );
};
