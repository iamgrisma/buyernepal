import { Context } from 'hono';
import { AppEnv } from '../index';
import { renderHtmlPage } from './html';

export const renderLandingPage = async (c: Context<AppEnv>) => {
    try {
        // Fetch categories
        const categoriesResult = await c.env.DB.prepare(
            "SELECT id, name, slug, description FROM categories ORDER BY name LIMIT 20"
        ).all();
        const categories = categoriesResult.results || [];

        // Fetch featured products
        const productsResult = await c.env.DB.prepare(
            `SELECT p.id, p.name, p.slug, p.image_url, p.brand, p.description,
             (SELECT MIN(price) FROM product_offers WHERE product_id = p.id AND is_available = TRUE) as min_price
             FROM products p 
             WHERE p.status = 'active' 
             ORDER BY p.created_at DESC LIMIT 12`
        ).all();
        const products = productsResult.results || [];

        // Fetch settings for hero content
        const settingsResult = await c.env.DB.prepare(
            "SELECT setting_key, setting_value FROM site_settings WHERE setting_key IN ('site_name', 'tagline', 'hero_title', 'hero_subtitle')"
        ).all();
        const settings: any = {};
        settingsResult.results?.forEach((row: any) => {
            settings[row.setting_key] = row.setting_value;
        });

        // Build category HTML
        let categoriesHtml = '<div class="category-list">';
        categories.forEach((cat: any) => {
            categoriesHtml += `<a href="/c/${cat.slug}" class="category-tag">${cat.name}</a>`;
        });
        categoriesHtml += '</div>';

        // Build products grid
        let productsHtml = '<div class="product-grid">';
        products.forEach((prod: any) => {
            const price = prod.min_price ? `NPR ${Math.round(prod.min_price).toLocaleString()}` : 'View Offers';
            productsHtml += `
                <article class="product-card" itemscope itemtype="https://schema.org/Product">
                    <a href="/p/${prod.slug}" style="text-decoration: none; color: inherit;">
                        ${prod.image_url ? `<img src="${prod.image_url}" alt="${prod.name}" itemprop="image">` : '<div style="height: 200px; background: #e2e8f0; display: flex; align-items: center; justify-content: center;">No Image</div>'}
                        <div class="product-info">
                            <h3 itemprop="name">${prod.name}</h3>
                            ${prod.brand ? `<p style="color: #718096; font-size: 14px;">${prod.brand}</p>` : ''}
                            <p class="price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                                <span itemprop="priceCurrency" content="NPR"></span>
                                <span itemprop="price">${price}</span>
                            </p>
                            <p style="font-size: 14px; color: #4a5568;">${(prod.description || '').substring(0, 80)}...</p>
                        </div>
                    </a>
                </article>`;
        });
        productsHtml += '</div>';

        const bodyContent = `
            <div class="hero">
                <h2 style="font-size: 42px; margin-bottom: 15px;">${settings.hero_title || '🎯 Find the Best Tech Deals in Nepal'}</h2>
                <p style="font-size: 18px; color: #4a5568; margin-bottom: 25px;">
                    ${settings.hero_subtitle || 'Honest reviews, real comparisons, and the best prices from trusted vendors.'}
                </p>
                <form action="/search" method="GET">
                    <input type="text" name="q" class="search-box" placeholder="Search for products..." autocomplete="off">
                </form>
            </div>

            <section>
                <h2 style="margin: 30px 0 15px;">🗂️ Browse by Category</h2>
                ${categoriesHtml}
            </section>

            <section>
                <h2 style="margin: 40px 0 20px;">⚡ Latest Products</h2>
                ${productsHtml}
            </section>

            <section style="margin-top: 50px; text-align: center;">
                <a href="/search" class="btn">View All Products →</a>
            </section>
        `;

        return c.html(renderHtmlPage(
            settings.site_name || 'BuyerNepal',
            bodyContent,
            {
                description: settings.tagline || 'Honest tech reviews and best deals in Nepal',
                canonical: new URL('/', c.req.url).href
            }
        ));

    } catch (e: any) {
        console.error("Error rendering landing page:", e);
        return c.html(renderHtmlPage('Error', `<div class="error">Failed to load homepage: ${e.message}</div>`), 500);
    }
};
