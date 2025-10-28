import { Context } from 'hono';
import { AppEnv } from '../index';
import { renderHtmlPage, renderErrorPage } from './html';

export const renderCategoryPage = async (c: Context<AppEnv>) => {
    const slug = c.req.param('slug');
    if (!slug) {
        return c.html(renderErrorPage("Category slug missing", 400), 400);
    }

    try {
        // Fetch category
        const category = await c.env.DB.prepare(
            "SELECT id, name, description FROM categories WHERE slug = ?1"
        ).bind(slug).first();

        if (!category) {
            return c.html(renderErrorPage(`Category "${slug}" not found`, 404), 404);
        }

        // Fetch products in category
        const productsResult = await c.env.DB.prepare(
            `SELECT p.id, p.name, p.slug, p.image_url, p.brand, p.description,
             (SELECT MIN(price) FROM product_offers WHERE product_id = p.id AND is_available = TRUE) as min_price
             FROM products p 
             WHERE p.category_id = ?1 AND p.status = 'active'
             ORDER BY p.created_at DESC LIMIT 50`
        ).bind(category.id).all();
        const products = productsResult.results || [];

        // Build products grid
        let productsHtml = '';
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
            productsHtml = '<div style="background: white; padding: 40px; border-radius: 12px; text-align: center;"><p style="font-size: 18px; color: #718096;">No products found in this category yet. Check back soon!</p></div>';
        }

        const bodyContent = `
            <nav style="margin: 20px 0; font-size: 14px;">
                <a href="/" style="color: #667eea;">Home</a> / 
                <span>${category.name}</span>
            </nav>

            <div class="hero">
                <h1 style="font-size: 36px; margin-bottom: 10px;">${category.name}</h1>
                ${category.description ? `<p style="font-size: 18px; color: #4a5568;">${category.description}</p>` : ''}
            </div>

            <section>
                <h2 style="margin: 30px 0 20px;">${products.length} Product${products.length !== 1 ? 's' : ''} Found</h2>
                ${productsHtml}
            </section>
        `;

        return c.html(renderHtmlPage(
            category.name as string,
            bodyContent,
            {
                description: (category.description as string) || `Browse ${category.name} products on BuyerNepal`,
                canonical: new URL(`/c/${slug}`, c.req.url).href
            }
        ));

    } catch (e: any) {
        console.error(`Error rendering category page ${slug}:`, e);
        return c.html(renderErrorPage("Failed to load category details.", 500), 500);
    }
};
