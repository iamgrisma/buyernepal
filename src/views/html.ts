// Enhanced HTML layout with modern styling and SEO

const modernStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f7f9fc;
  }
  .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
  header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  header .container { display: flex; justify-content: space-between; align-items: center; }
  header h1 { font-size: 28px; font-weight: 700; }
  nav a {
    color: white;
    text-decoration: none;
    margin-left: 20px;
    padding: 8px 16px;
    border-radius: 6px;
    transition: background 0.3s;
  }
  nav a:hover { background: rgba(255,255,255,0.2); }
  .hero {
    background: white;
    border-radius: 12px;
    padding: 40px;
    margin: 30px 0;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  }
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    margin: 30px 0;
  }
  .product-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  }
  .product-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .product-info { padding: 20px; }
  .product-info h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #2d3748;
  }
  .product-info .price {
    font-size: 24px;
    font-weight: 700;
    color: #667eea;
    margin: 10px 0;
  }
  .btn {
    display: inline-block;
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: transform 0.2s;
    border: none;
    cursor: pointer;
  }
  .btn:hover { transform: scale(1.05); }
  .btn-secondary {
    background: #e2e8f0;
    color: #2d3748;
  }
  footer {
    background: #2d3748;
    color: #cbd5e0;
    text-align: center;
    padding: 30px 0;
    margin-top: 60px;
  }
  .category-list {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin: 20px 0;
  }
  .category-tag {
    padding: 8px 16px;
    background: #edf2f7;
    border-radius: 20px;
    text-decoration: none;
    color: #2d3748;
    font-size: 14px;
    transition: all 0.3s;
  }
  .category-tag:hover {
    background: #667eea;
    color: white;
  }
  .search-box {
    width: 100%;
    padding: 15px 20px;
    font-size: 16px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    margin: 20px 0;
  }
  .search-box:focus {
    outline: none;
    border-color: #667eea;
  }
  .error { 
    background: #fed7d7;
    color: #c53030;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
  }
  .interstitial {
    text-align: center;
    padding: 60px 20px;
  }
  .interstitial img {
    max-width: 300px;
    border-radius: 12px;
    margin: 20px 0;
  }
  .affiliate-notice {
    background: #fef5e7;
    border-left: 4px solid #f39c12;
    padding: 15px;
    margin: 20px 0;
    border-radius: 4px;
    font-size: 14px;
  }
  @media (max-width: 768px) {
    .container { padding: 15px; }
    header h1 { font-size: 22px; }
    .product-grid { grid-template-columns: 1fr; }
  }
`;

export const renderHtmlPage = (title: string, bodyContent: string, meta?: { description?: string; image?: string; canonical?: string }) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | BuyerNepal</title>
  <meta name="description" content="${meta?.description || 'Honest tech reviews and best deals in Nepal'}">
  ${meta?.canonical ? `<link rel="canonical" href="${meta.canonical}">` : ''}
  <meta property="og:title" content="${title} | BuyerNepal">
  <meta property="og:description" content="${meta?.description || 'Honest tech reviews and best deals in Nepal'}">
  ${meta?.image ? `<meta property="og:image" content="${meta.image}">` : ''}
  <meta name="twitter:card" content="summary_large_image">
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#667eea">
  <style>${modernStyles}</style>
</head>
<body>
  <header>
    <div class="container">
      <h1>🇳🇵 BuyerNepal</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/search">Search</a>
        <a href="/api/admin/login">Admin</a>
      </nav>
    </div>
  </header>
  <main class="container">
    ${bodyContent}
  </main>
  <footer>
    <div class="container">
      <div class="affiliate-notice">
        ⚠️ Affiliate Disclosure: BuyerNepal may earn commissions from purchases made through our links. This helps us provide honest reviews at no cost to you.
      </div>
      <p>&copy; ${new Date().getFullYear()} BuyerNepal. All rights reserved.</p>
      <p><a href="/sitemap.xml" style="color: #cbd5e0;">Sitemap</a></p>
    </div>
  </footer>
</body>
</html>`;
};

export const renderErrorPage = (message: string, status = 500) => {
  return renderHtmlPage(
    `Error ${status}`,
    `<div class="hero">
      <h2 class="error">⚠️ ${message}</h2>
      <p><a href="/" class="btn btn-secondary">← Back to Home</a></p>
    </div>`
  );
};
