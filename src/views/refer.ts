import { Context } from 'hono';
import { AppEnv } from '../index';
import { renderHtmlPage, renderErrorPage } from './html';

export const renderReferralInterstitial = async (c: Context<AppEnv>) => {
    const slug = c.req.param('slug');
    if (!slug) {
        return c.html(renderErrorPage("Referral slug missing", 400), 400);
    }

    try {
        // Fetch referral details
        const details = await c.env.DB.prepare(
            `SELECT p.name as product_name, p.image_url, p.brand, 
             po.vendor_name, po.price, po.currency, po.affiliate_url 
             FROM refer_slugs rs 
             JOIN product_offers po ON rs.product_offer_id = po.id 
             JOIN products p ON po.product_id = p.id 
             WHERE rs.public_slug = ?1 AND rs.is_active = TRUE`
        ).bind(slug).first<{
            product_name: string;
            image_url: string | null;
            brand: string | null;
            vendor_name: string;
            price: number;
            currency: string;
            affiliate_url: string;
        }>();

        if (!details) {
            return c.html(renderErrorPage("Link not found or inactive", 404), 404);
        }

        const bodyContent = `
            <div class="interstitial">
                <h2 style="font-size: 32px; margin-bottom: 20px;">🎯 Redirecting to ${details.vendor_name}</h2>
                
                <div style="max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    ${details.image_url ? `<img src="${details.image_url}" alt="${details.product_name}" class="interstitial">` : ''}
                    
                    <h3 style="font-size: 24px; margin: 20px 0;">${details.product_name}</h3>
                    ${details.brand ? `<p style="color: #718096; font-size: 16px;">${details.brand}</p>` : ''}
                    
                    <p style="font-size: 32px; color: #667eea; font-weight: 700; margin: 20px 0;">
                        ${details.currency} ${Math.round(details.price).toLocaleString()}
                    </p>
                    
                    <p style="color: #4a5568; margin: 20px 0;">
                        at <strong>${details.vendor_name}</strong>
                    </p>
                    
                    <a href="${details.affiliate_url}" 
                       id="proceed-link" 
                       class="btn" 
                       style="display: inline-block; margin-top: 20px;"
                       rel="noopener noreferrer nofollow sponsored">
                        Continue to ${details.vendor_name} →
                    </a>
                    
                    <div class="affiliate-notice" style="margin-top: 30px; text-align: left; font-size: 13px;">
                        ⚠️ You will be redirected automatically in a few seconds. As an affiliate partner, 
                        BuyerNepal may earn a small commission from your purchase at no extra cost to you. 
                        This helps us provide honest reviews and keep our service free.
                    </div>
                </div>
            </div>
            
            <script>
                // Automatic redirect after 2 seconds
                let countdown = 2;
                const btn = document.getElementById('proceed-link');
                const originalText = btn.textContent;
                
                const timer = setInterval(() => {
                    countdown--;
                    btn.textContent = originalText + \` (\${countdown}s)\`;
                    
                    if (countdown <= 0) {
                        clearInterval(timer);
                        window.location.href = btn.href;
                    }
                }, 1000);
                
                // Track click
                fetch('/api/events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify([{
                        type: 'refer_hit',
                        url: window.location.href
                    }])
                }).catch(e => console.error('Tracking failed:', e));
            </script>
        `;

        c.header('X-Robots-Tag', 'noindex, nofollow');
        
        return c.html(renderHtmlPage(
            `Redirecting to ${details.vendor_name}`,
            bodyContent
        ));

    } catch (e: any) {
        console.error(`Error rendering interstitial for slug ${slug}:`, e);
        return c.html(renderErrorPage("An error occurred while preparing your link", 500), 500);
    }
};
