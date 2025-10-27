import { Context } from 'hono';
import { AppEnv } from '../index'; // Adjust path
import { renderHtmlPage, renderErrorPage } from './html'; // Import layout helpers

// Placeholder for generating a single product page HTML
export const renderProductPage = async (c: Context<AppEnv>) => {
    const slug = c.req.param('slug');
    if (!slug) {
        return c.html(renderErrorPage("Product slug missing", 400), 400);
    }

    try {
        // In a real implementation, you would:
        // 1. Fetch product details, offers, reviews based on the slug from D1
         const product = await c.env.DB.prepare(
            "SELECT p.*, " +
            "(SELECT json_group_array(json_object('vendor_name', po.vendor_name, 'price', po.price, 'currency', po.currency, 'affiliate_url', po.affiliate_url, 'is_available', po.is_available, 'id', po.id)) FROM product_offers po WHERE po.product_id = p.id) as offers, " +
            "cat.name as category_name " +
            "FROM products p LEFT JOIN categories cat ON p.category_id = cat.id WHERE p.slug = ?1 AND p.status = 'active'"
        ).bind(slug).first();


        if (!product) {
            return c.html(renderErrorPage(`Product "${slug}" not found`, 404), 404);
        }

         // Attempt to parse offers if they are a string
        let offers: any[] = [];
        if (typeof product.offers === 'string') {
            try { offers = JSON.parse(product.offers); } catch (e) { console.error("Failed to parse offers JSON"); }
        } else if (Array.isArray(product.offers)) {
            offers = product.offers; // Assuming D1 might return array directly in some cases
        }


        // 2. Format the data into HTML (product details, image, price, offers table, review snippets, CTA button)
        let offersHtml = '<p>No offers found.</p>';
        if (offers && offers.length > 0) {
            offersHtml = '<ul>';
            offers.forEach((offer: any) => {
                // Find or generate refer slug for this offer ID (Simplified - assumes direct link or needs lookup)
                // For MVP, maybe link directly to /api/refer/:offer_id or find slug
                offersHtml += `<li>${offer.vendor_name}: ${offer.currency} ${offer.price} - <a href="/refer/${slug}-${offer.vendor_name.toLowerCase()}">Buy Now</a> <em>(Slug needs setup)</em></li>`;
            });
            offersHtml += '</ul>';
        }


        const bodyContent = `
            <h2>${product.name} (${product.brand || 'N/A'})</h2>
            <p>Category: ${product.category_name || 'Uncategorized'}</p>
            ${product.image_url ? `<img src="${product.image_url}" alt="${product.name}" width="200">` : ''}
            <p>${product.description || 'No description available.'}</p>
            <h3>Offers:</h3>
            ${offersHtml}
            
        `;

        const html = renderHtmlPage(product.name as string, bodyContent);
        return c.html(html);

    } catch (e: any) {
        console.error(`Error rendering product page ${slug}:`, e);
        return c.html(renderErrorPage("Failed to load product details.", 500), 500);
    }
};
