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
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (!line) {
      if (inList) { htmlParts.push('</ul>'); inList = false; }
      if (inTable) { htmlParts.push('</tbody></table></div>'); inTable = false; }
      continue;
    }

    // Embed: Pros Box [pros]...[/pros]
    if (line.startsWith('[pros]') && line.endsWith('[/pros]')) {
      const items = line.replace('[pros]', '').replace('[/pros]', '').split(';');
      htmlParts.push(`
        <div class="article-pros-box">
          <div class="pros-header"><span>👍</span> <strong>Key Strengths &amp; Advantages</strong></div>
          <ul class="pros-list">
            ${items.map(it => `<li>✓ ${it.trim()}</li>`).join('')}
          </ul>
        </div>
      `);
      continue;
    }

    // Embed: Cons Box [cons]...[/cons]
    if (line.startsWith('[cons]') && line.endsWith('[/cons]')) {
      const items = line.replace('[cons]', '').replace('[/cons]', '').split(';');
      htmlParts.push(`
        <div class="article-cons-box">
          <div class="cons-header"><span>⚠️</span> <strong>Downsides &amp; Trade-offs</strong></div>
          <ul class="cons-list">
            ${items.map(it => `<li>✕ ${it.trim()}</li>`).join('')}
          </ul>
        </div>
      `);
      continue;
    }

    // Embed: REHub Review Score Box [score: 9.4 | Display: 9.6 | Performance: 9.8 | Cameras: 9.2 | Battery: 9.0 | Nepal Value: 9.4 | verdict: Nepal's ultimate flagship powerhouse]
    if (line.startsWith('[score:') && line.endsWith(']')) {
      const raw = line.slice(7, -1).trim();
      const parts = raw.split('|').map(p => p.trim());
      const overall = parts[0] || '9.0';
      const metrics: { name: string; val: number }[] = [];
      let verdict = '';

      for (let j = 1; j < parts.length; j++) {
        const seg = parts[j];
        if (seg.toLowerCase().startsWith('verdict:')) {
          verdict = seg.substring(8).trim();
        } else if (seg.includes(':')) {
          const [mName, mVal] = seg.split(':');
          metrics.push({ name: mName.trim(), val: parseFloat(mVal.trim()) || 9.0 });
        }
      }

      htmlParts.push(`
        <div class="rehub-article-scorebox" style="background: var(--card-bg); border: 2px solid var(--accent); border-radius: var(--radius-lg); padding: 24px; margin: 28px 0; box-shadow: var(--shadow-md);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 20px; border-bottom: 1px solid var(--line); padding-bottom: 16px;">
            <div>
              <span style="font-size: 11px; font-weight: 800; color: var(--accent); letter-spacing: 0.8px; text-transform: uppercase;">🏆 BUYERNEPAL LABS SCORECARD</span>
              <h4 style="font-size: 18px; font-weight: 900; margin: 4px 0 0; color: var(--ink);">Comprehensive Review Verdict</h4>
            </div>
            <div style="background: linear-gradient(135deg, var(--accent), #e11d48); color: #fff; padding: 10px 18px; border-radius: 12px; text-align: center; min-width: 90px;">
              <span style="font-size: 26px; font-weight: 900; display: block; line-height: 1;">${overall}</span>
              <small style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.9;">OVERALL / 10</small>
            </div>
          </div>
          ${metrics.length > 0 ? `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 16px;">
              ${metrics.map(m => `
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 700; margin-bottom: 4px;">
                    <span style="color: var(--ink-secondary);">${m.name}</span>
                    <strong style="color: var(--ink);">${m.val}/10</strong>
                  </div>
                  <div style="background: var(--line); height: 7px; border-radius: 4px; overflow: hidden;">
                    <div style="background: var(--accent); width: ${Math.min(100, Math.max(0, m.val * 10))}%; height: 100%; border-radius: 4px;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${verdict ? `
            <div style="background: rgba(225, 29, 72, 0.06); border-left: 4px solid var(--accent); padding: 12px 16px; border-radius: 0 8px 8px 0; font-size: 13.5px; color: var(--ink); font-style: italic; margin-top: 12px;">
              <strong>Editorial Verdict:</strong> "${verdict}"
            </div>
          ` : ''}
        </div>
      `);
      continue;
    }

    // Embed: REHub Coupon Voucher Box [coupon: CODE | Store | Discount | URL]
    if (line.startsWith('[coupon:') && line.endsWith(']')) {
      const raw = line.slice(8, -1).trim();
      const [code, store, discount, url] = raw.split('|').map(s => s.trim());
      htmlParts.push(`
        <div class="rehub-article-coupon-box" style="background: #fffbeb; border: 2px dashed #f59e0b; border-radius: var(--radius-lg); padding: 20px; margin: 24px 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div>
            <span style="font-size: 10.5px; font-weight: 800; background: #fef3c7; color: #b45309; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">🎟️ Exclusive Voucher</span>
            <h4 style="font-size: 16px; font-weight: 800; color: #92400e; margin: 6px 0 2px;">${discount || 'Special Discount'} at ${store || 'Store'}</h4>
            <span style="font-size: 12px; color: #78350f;">Apply promo code at checkout on official portal.</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="coupon-code-pill" style="font-family: monospace; font-size: 15px; font-weight: 900; background: #fff; border: 1px solid #fde68a; color: #b45309; padding: 8px 14px; border-radius: 8px; letter-spacing: 1px;">
              ${code || 'BUYERNEPAL'}
            </span>
            <a href="${url || '#'}" target="_blank" rel="noopener noreferrer nofollow" class="primary-action" style="padding: 9px 16px; font-size: 12.5px; background: #d97706; text-decoration: none;">
              Redeem Deal ↗
            </a>
          </div>
        </div>
      `);
      continue;
    }

    // Embed: Deal Card [deal title="X" price="Y" store="Z" url="W"]
    if (line.startsWith('[deal') && line.endsWith(']')) {
      const titleMatch = line.match(/title="([^"]+)"/);
      const priceMatch = line.match(/price="([^"]+)"/);
      const storeMatch = line.match(/store="([^"]+)"/);
      const urlMatch = line.match(/url="([^"]+)"/);

      const title = titleMatch ? titleMatch[1] : 'Featured Recommendation';
      const price = priceMatch ? priceMatch[1] : '';
      const store = storeMatch ? storeMatch[1] : 'Daraz Mall';
      const url = urlMatch ? urlMatch[1] : '#';

      htmlParts.push(`
        <div class="article-deal-embed">
          <div class="deal-embed-content">
            <span class="deal-embed-badge">🔥 Verified Nepal Deal</span>
            <strong class="deal-embed-title">${title}</strong>
            <div class="deal-embed-store">Available at: <strong>${store}</strong></div>
          </div>
          <div class="deal-embed-cta">
            ${price ? `<span class="deal-embed-price">${price}</span>` : ''}
            <a href="${url}" target="_blank" rel="noopener noreferrer nofollow" class="primary-action" style="padding: 9px 18px; font-size: 13px;">
              Check Deal ↗
            </a>
          </div>
        </div>
      `);
      continue;
    }

    // Markdown Table Row
    if (line.startsWith('|') && line.endsWith('|')) {
      if (inList) { htmlParts.push('</ul>'); inList = false; }
      if (!inTable) {
        htmlParts.push('<div class="article-table-responsive"><table class="article-markdown-table">');
        const cells = line.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
        htmlParts.push('<thead><tr>' + cells.map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>');
        inTable = true;
        continue;
      } else if (line.includes('---')) {
        // Table divider row, skip
        continue;
      } else {
        const cells = line.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
        htmlParts.push('<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>');
        continue;
      }
    } else if (inTable) {
      htmlParts.push('</tbody></table></div>');
      inTable = false;
    }

    // H3 Subheading
    if (line.startsWith('### ')) {
      if (inList) { htmlParts.push('</ul>'); inList = false; }
      const text = line.replace('### ', '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      htmlParts.push(`<h3 id="${id}" class="article-subheading">${text}</h3>`);
      continue;
    }

    // H2 Section Title
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
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      htmlParts.push(`<li>${content}</li>`);
      continue;
    }

    // Numbered list items
    if (/^\d+\.\s/.test(line)) {
      if (inList) { htmlParts.push('</ul>'); inList = false; }
      const content = line.replace(/^\d+\.\s/, '')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      htmlParts.push(`<div class="article-num-item"><span class="num-bullet">•</span><div>${content}</div></div>`);
      continue;
    }

    // Callout quote
    if (line.startsWith('> ')) {
      if (inList) { htmlParts.push('</ul>'); inList = false; }
      const content = line.substring(2)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      htmlParts.push(`<blockquote class="article-callout"><span class="callout-icon">💡</span><div>${content}</div></blockquote>`);
      continue;
    }

    // Standard paragraph with links and inline styles
    if (inList) { htmlParts.push('</ul>'); inList = false; }
    const pContent = line
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    htmlParts.push(`<p class="article-paragraph">${pContent}</p>`);
  }

  if (inList) htmlParts.push('</ul>');
  if (inTable) htmlParts.push('</tbody></table></div>');
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
            <div className="banner-badge">🇳🇵 SMARTPHONE BUYER ADVISORY</div>
            <h3>Buying a Smartphone in Nepal? Verify NTA MDMS First</h3>
            <p>
              To protect yourself against gray market imports and network blacklisting, always verify the 15-digit IMEI on the official NTA MDMS portal and request a genuine VAT bill from the retailer.
            </p>
          </div>
          <a href="https://mdms.nta.gov.np" target="_blank" rel="noopener noreferrer" className="banner-btn">
            Check IMEI on NTA Portal ↗
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
