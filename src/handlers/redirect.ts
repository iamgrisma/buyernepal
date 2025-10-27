import { Context } from 'hono';
import { AppEnv } from '../index';
import { sha256Hash } from '../utils/crypto';

export const handleReferRedirect = async (c: Context<AppEnv>) => {
    const slug = c.req.param('slug');
    if (!slug) {
        return c.text('Not Found', 404);
    }

    try {
        // 1. Find the active refer slug and the associated offer's affiliate URL
        const slugData = await c.env.DB.prepare(
            "SELECT rs.id as refer_slug_id, po.id as product_offer_id, po.affiliate_url " +
            "FROM refer_slugs rs JOIN product_offers po ON rs.product_offer_id = po.id " +
            "WHERE rs.public_slug = ?1 AND rs.is_active = TRUE LIMIT 1"
        ).bind(slug).first<{ refer_slug_id: number; product_offer_id: number; affiliate_url: string; }>();

        if (!slugData?.affiliate_url) {
            console.warn(`Refer slug not found or inactive: ${slug}`);
            // Optionally redirect to a generic fallback or home page
            return c.text('Link not found or is inactive.', 404);
            // return c.redirect('/', 302);
        }

        // 2. Log the click (async, don't wait for it to complete before redirecting)
        const ip = c.req.header('CF-Connecting-IP') || 'unknown';
        const userAgent = c.req.header('User-Agent') || '';
        const referer = c.req.header('Referer') || '';
        const country = c.req.header('CF-IPCountry') || '';
        const ipHash = await sha256Hash(ip); // Hash IP for privacy

        // Extract UTM parameters (if needed later for reporting)
        const url = new URL(c.req.url);
        const utmSource = url.searchParams.get('utm_source');
        const utmMedium = url.searchParams.get('utm_medium');
        const utmCampaign = url.searchParams.get('utm_campaign');


        const logPromise = c.env.DB.prepare(
            "INSERT INTO click_tracking (refer_slug_id, product_offer_id, ip_hash, user_agent, referer, country, utm_source, utm_medium, utm_campaign) " +
            "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)"
        ).bind(
            slugData.refer_slug_id,
            slugData.product_offer_id,
            ipHash,
            userAgent.substring(0, 500), // Limit UA string length
            referer.substring(0, 500),   // Limit referrer length
            country,
            utmSource,
            utmMedium,
            utmCampaign
        ).run().catch(logErr => {
            // Log errors but don't block the redirect
            console.error(`Failed to log click for slug ${slug}:`, logErr);
        });

        // Use waitUntil to ensure logging happens even after redirect
        c.executionCtx.waitUntil(logPromise);

        // 3. Perform the redirect
        // Use 302 for temporary redirect, suitable for affiliate links
        return c.redirect(slugData.affiliate_url, 302);

    } catch (e: any) {
        console.error(`Error handling refer slug ${slug}:`, e);
        // Fallback redirect or error page
        return c.text('An error occurred.', 500);
        // return c.redirect('/', 302);
    }
};
