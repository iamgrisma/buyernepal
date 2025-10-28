import { Context } from 'hono';
import { AppEnv } from '../index';
import { renderHtmlPage, renderErrorPage } from './html';

export const renderProductPage = async (c: Context<AppEnv>) => {
    const slug = c.req.param('slug');
    if (!slug) {
        return c.html(renderErrorPage("Product slug missing", 400), 400);
    }

    try {
        // Fetch product with category
        const product = await c.env.DB.prepare(
            `SELECT p.*, cat.name as category_name, cat.slug as category_slug
             FROM products p 
             LEFT JOIN categories cat ON p.category_id = cat.id 
             WHERE p.slug = ?1 AND p.status = 'active'`
        ).bind(slug).first();

        if (!product) {
            return c.html(renderErrorPage(`Product "${slug}" not found`, 404), 404);
        }

        // Fetch product offers
        const offersResult = await c.env.DB.prepare(
            `SELECT id, vendor_name, price, currency, affiliate_url, is_available
             FROM product_offers 
             WHERE product_id = ?1 AND is_available = TRUE
             ORDER BY price ASC`
        ).bind(product.id).all();
        const offers = offersResult.results || [];

        // Fetch refer slugs for these offers
        const offerIds = offers.map((o: any) => o.id);
        const referSlugsResult = offerIds.length > 0 ? await c.env.DB.prepare(
            `SELECT product_offer_id, public_slug 
             FROM refer_slugs 
             WHERE product_offer_id IN (${offerIds.join(',')}) AND is_active = TRUE`
        ).all() : { results: [] };
        const referSlugsMap: any = {};
        referSlugsResult.results?.forEach((rs: any) => {
            referSlugsMap[rs.product_offer_id] = rs.public_slug;
        });

        // Fetch review
        const review = await c.env.DB.prepare(
            `SELECT title, body_html, rating, pros, cons
             FROM reviews 
             WHERE product_id = ?1 AND status = 'published'
             LIMIT 1`
        ).bind(product.id).first();

        // Build offers HTML
        let offersHtml = '<div style="margin: 30px 0;">';
        if (offers.length > 0) {
            offersHtml += '<h3>🛒 Where to Buy</h3><div style="display: grid; gap: 15px; margin-top: 15px;">';
            offers.forEach((offer: any) => {
                const referSlug = referSlugsMap[offer.id];
                const buyLink = referSlug ? `/refer/${referSlug}` : offer.affiliate_url;
                offersHtml += `
                    <div style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong style="font-size: 18px;">${offer.vendor_name}</strong>
                            <p style="color: #667eea; font-size: 24px; font-weight: 700; margin: 5px 0;">${offer.currency} ${Math.round(offer.price).toLocaleString()}</p>
                        </div>
                        <a href="${buyLink}" class="btn" ${referSlug ? '' : 'rel="noopener noreferrer nofollow sponsored"'}>
                            Buy Now →
                        </a>
                    </div>`;
            });
            offersHtml += '</div>';
        } else {
            offersHtml += '<p style="color: #718096;">No offers available at this time.</p>';
        }
        offersHtml += '</div>';

        // Build review HTML
        let reviewHtml = '';
        if (review) {
            const pros = review.pros ? JSON.parse(review.pros as string) : [];
            const cons = review.cons ? JSON.parse(review.cons as string) : [];
            
            reviewHtml = `
                <div style="background: white; padding: 30px; border-radius: 12px; margin: 30px 0;">
                    <h3>📝 ${review.title}</h3>
                    <div style="margin: 15px 0;">
                        <span style="font-size: 24px; color: #f39c12;">
                            ${'★'.repeat(review.rating as number)}${'☆'.repeat(5 - (review.rating as number))}
                        </span>
                        <span style="margin-left: 10px; font-weight: 700;">${review.rating}/5</span>
                    </div>
                    <div style="margin: 20px 0;">${review.body_html}</div>
                    ${pros.length > 0 ? `
                        <div style="margin: 20px 0;">
                            <h4 style="color: #48bb78;">✅ Pros:</h4>
                            <ul style="margin: 10px 0; padding-left: 25px;">
                                ${pros.map((p: string) => `<li>${p}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    ${cons.length > 0 ? `
                        <div style="margin: 20px 0;">
                            <h4 style="color: #f56565;">❌ Cons:</h4>
                            <ul style="margin: 10px 0; padding-left: 25px;">
                                ${cons.map((c: string) => `<li>${c}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>`;
        }

        // Schema.org markup
        const schemaMarkup = {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "description": product.description || '',
            "image": product.image_url || '',
            "brand": { "@type": "Brand", "name": product.brand || 'Unknown' },
            "offers": offers.map((o: any) => ({
                "@type": "Offer",
                "priceCurrency": o.currency,
                "price": o.price,
                "seller": { "@type": "Organization", "name": o.vendor_name },
                "availability": "https://schema.org/InStock"
            })),
            "aggregateRating": review ? {
                "@type": "AggregateRating",
                "ratingValue": review.rating,
                "reviewCount": 1
            } : undefined
        };

        const bodyContent = `
            <script type="application/ld+json">${JSON.stringify(schemaMarkup)}</script>
            
            <nav style="margin: 20px 0; font-size: 14px;">
                <a href="/" style="color: #667eea;">Home</a> / 
                ${product.category_name ? `<a href="/c/${product.category_slug}" style="color: #667eea;">${product.category_name}</a> / ` : ''}
                <span>${product.name}</span>
            </nav>

            <article itemscope itemtype="https://schema.org/Product">
                <div style="background: white; padding: 40px; border-radius: 12px; margin: 20px 0;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start;">
                        <div>
                            ${product.image_url ? `<img src="${product.image_url}" alt="${product.name}" style="width: 100%; border-radius: 12px;" itemprop="image">` : '<div style="width: 100%; height: 400px; background: #e2e8f0; border-radius: 12px; display: flex; align-items: center; justify-content: center;">No Image</div>'}
                        </div>
                        <div>
                            <h1 itemprop="name" style="font-size: 36px; margin-bottom: 10px;">${product.name}</h1>
                            ${product.brand ? `<p style="color: #718096; font-size: 18px; margin-bottom: 15px;" itemprop="brand">${product.brand}</p>` : ''}
                            <meta itemprop="description" content="${product.description || ''}">
                            <p style="font-size: 16px; line-height: 1.8; color: #4a5568; margin: 20px 0;">${product.description || ''}</p>
                            ${offersHtml}
                        </div>
                    </div>
                </div>

                ${reviewHtml}

                ${product.long_description_html ? `
                    <div style="background: white; padding: 30px; border-radius: 12px; margin: 30px 0;">
                        <h3>📖 Detailed Information</h3>
                        <div style="margin-top: 20px;">${product.long_description_html}</div>
                    </div>
                ` : ''}

                ${product.specifications_json ? `
                    <div style="background: white; padding: 30px; border-radius: 12px; margin: 30px 0;">
                        <h3>📊 Specifications</h3>
                        <pre style="background: #f7fafc; padding: 20px; border-radius: 8px; overflow-x: auto; margin-top: 15px;">${JSON.stringify(JSON.parse(product.specifications_json as string), null, 2)}</pre>
                    </div>
                ` : ''}
            </article>
        `;

        return c.html(renderHtmlPage(
            `${product.name}${product.brand ? ` - ${product.brand}` : ''}`,
            bodyContent,
            {
                description: (product.description as string)?.substring(0, 155) || 'View product details',
                image: product.image_url as string,
                canonical: new URL(`/p/${slug}`, c.req.url).href
            }
        ));

    } catch (e: any) {
        console.error(`Error rendering product page ${slug}:`, e);
        return c.html(renderErrorPage("Failed to load product details.", 500), 500);
    }
};
