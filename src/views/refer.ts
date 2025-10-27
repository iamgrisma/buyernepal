import { Context } from 'hono';
import { AppEnv } from '../index'; // Adjust path
import { renderHtmlPage, renderErrorPage } from './html'; // Import layout helpers

// Renders the /r/:slug interstitial page
export const renderReferralInterstitial = async (c: Context<AppEnv>) => {
    const slug = c.req.param('slug'); // This slug corresponds to the *public_slug* in refer_slugs
     if (!slug) {
        return c.html(renderErrorPage("Referral slug missing", 400), 400);
    }

    try {
        // Fetch details needed to show the product card before redirecting
        // Join refer_slugs -> product_offers -> products
         const details = await c.env.DB.prepare(
            "SELECT p.name as product_name, p.image_url, po.vendor_name, po.price, po.currency, po.affiliate_url " +
            "FROM refer_slugs rs " +
            "JOIN product_offers po ON rs.product_offer_id = po.id " +
            "JOIN products p ON po.product_id = p.id " +
            "WHERE rs.public_slug = ?1 AND rs.is_active = TRUE"
        ).bind(slug).first<{
            product_name: string;
            image_url: string | null;
            vendor_name: string;
            price: number;
            currency: string;
            affiliate_url: string;
        }>();


        if (!details) {
             return c.html(renderErrorPage("Link details not found or link is inactive.", 404), 404);
        }

        // Construct the interstitial page content
        const bodyContent = `
            <p>You are being redirected to <strong>${details.vendor_name}</strong> to purchase:</p>
            <div>
                ${details.image_url ? `<img src="${details.image_url}" alt="${details.product_name}" width="150" style="float: left; margin-right: 15px;">` : ''}
                <strong>${details.product_name}</strong><br>
                Price: ${details.currency} ${details.price}<br>
                <a href="${details.affiliate_url}" id="proceed-link" rel="noopener noreferrer nofollow sponsored">Click here to proceed</a>
                <p><small>If you are not redirected automatically, please click the link above. As an affiliate, we may earn a commission from your purchase.</small></p>
            </div>
            <script>
                // Optional: Automatic redirect after a short delay
                setTimeout(function() {
                    window.location.href = document.getElementById('proceed-link').href;
                }, 1500); // 1.5 second delay
            </script>
        `;

        const html = renderHtmlPage(`Redirecting to ${details.vendor_name}`, bodyContent);

        // Set headers for no-indexing and potentially no-referrer
        c.header('X-Robots-Tag', 'noindex, nofollow');
        // c.header('Referrer-Policy', 'no-referrer'); // Be cautious, this might break some affiliate tracking

        return c.html(html);

    } catch (e: any) {
         console.error(`Error rendering interstitial page for slug ${slug}:`, e);
        return c.html(renderErrorPage("An error occurred while preparing your link.", 500), 500);
    }
};
