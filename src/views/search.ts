import { Context } from 'hono';
import { AppEnv } from '../index';
import { renderHtmlPage } from './html';

export const renderSearchResultsPage = async (c: Context<AppEnv>) => {
    const query = c.req.query('q') || '';
    const searchTerm = query.trim();

    try {
        let productsHtml = '';
        let products: any[] = [];

        if (searchTerm.length > 0) {
            // Perform search
            const productsResult = await c.env.DB.prepare(
                `SELECT p.id, p.name, p.slug, p.image_url, p.brand, p.description,
                 (SELECT MIN(price) FROM product_offers WHERE product_id = p.id AND is_available = TRUE) as min_price
                 FROM products p 
                 WHERE (p.name LIKE ?1 OR p.brand LIKE ?1 OR p.description LIKE ?1) 
                 AND p.status = 'active'
                 ORDER BY p.created_at DESC LIMIT 50`
            ).bind(`%${searchTerm}%`).all();
            products = productsResult.results || [];
        } else {
            // Show all products if no search term
            const productsResult = await c.env.DB.prepare(
                `SELECT p.id, p.name, p.slug, p.image_url, p.brand, p.description,
                 (SELECT MIN(price) FROM product_offers WHERE product_id = p.id AND is_available = TRUE) as min_price
                 FROM products p 
                 WHERE p.status = 'active'
                 ORDER BY p.created_at DESC LIMIT 50`
            ).all();
            products = productsResult.results || [];
        }

        if (products.length > 0) {
            productsHtml = '<div class="product-grid">';
            products.forEach((prod: any) => {
                const price = prod.min_price ? `NPR ${Math.round(prod.min_price).toLocaleString()}` : 'View Offers';
                productsHtml += `
                    <article class="product-card">
                        <a href="/p/${prod.slug}" style="text-decoration: none; color: inherit;">
                            ${prod.image_url ? `<img src="${prod.image_url}" alt="${prod.name}">` : '<div style="height: 200px; background: #e2e8f0; display: flex; align-items: center; justify-content: center;">No Image</div>'}
                            <div class="product-info">
                                <h3>${prod.name}</h3>
                                ${prod.brand ? `<p style="color: #718096; font-size: 14px;">${prod.brand}</p>` : ''}
                                <p class="price">${price}</p>
                                <p style="font-size: 14px; color: #4a5568;">${(prod.description || '').substring(0, 80)}...</p>
                            </div>
                        </a>
                    </article>`;
            });
            productsHtml += '</div>';
        } else {
            productsHtml = `
                <div style="background: white; padding: 60px; border-radius: 12px; text-align: center; margin: 30px 0;">
                    <h3 style="font-size: 24px; color: #718096; margin-bottom: 15px;">😕 No products found</h3>
                    <p style="color: #a0aec0;">Try searching with different keywords or browse our categories.</p>
                    <a href="/" class="btn" style="margin-top: 20px; display: inline-block;">← Back to Home</a>
                </div>`;
        }

        const bodyContent = `
            <div class="hero">
                <h1 style="font-size: 32px; margin-bottom: 15px;">
                    ${searchTerm ? `Search Results for "${searchTerm}"` : '🔍 Browse All Products'}
                </h1>
                <form action="/search" method="GET">
                    <input 
                        type="text" 
                        name="q" 
                        class="search-box" 
                        placeholder="Search for products..." 
                        value="${searchTerm}"
                        autocomplete="off"
                        autofocus
                    >
                </form>
            </div>

            <section>
                <h2 style="margin: 30px 0 20px;">
                    ${products.length > 0 ? `${products.length} Product${products.length !== 1 ? 's' : ''} Found` : 'No Results'}
                </h2>
                ${productsHtml}
            </section>
        `;

        return c.html(renderHtmlPage(
            searchTerm ? `Search: ${searchTerm}` : 'Search Products',
            bodyContent,
            {
                description: searchTerm ? `Search results for "${searchTerm}" on BuyerNepal` : 'Search for tech products in Nepal',
                canonical: new URL('/search', c.req.url).href
            }
        ));

    } catch (e: any) {
        console.error("Error rendering search page:", e);
        return c.html(renderHtmlPage('Error', `<div class="error">Failed to load search results: ${e.message}</div>`), 500);
    }
};
