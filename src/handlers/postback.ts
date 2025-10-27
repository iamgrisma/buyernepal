import { Context } from 'hono';
import { AppEnv } from '../index';

// POST /api/postback/daraz
export const handleDarazPostback = async (c: Context<AppEnv>) => {
    // SECURITY: Add a secret query parameter or header check to verify the request is from Daraz
    const secret = c.req.query('secret');
    const expectedSecret = c.env.DARAZ_POSTBACK_SECRET; // Need to set this secret in Wrangler
    if (!expectedSecret || secret !== expectedSecret) {
        console.warn("Invalid or missing secret for Daraz postback");
        return c.json({ error: "Unauthorized" }, 401);
    }

    try {
        const payload = await c.req.json(); // Or text() depending on format Daraz sends
        console.log("Received Daraz Postback:", payload);

        // TODO: Parse the payload to extract necessary info:
        // - click_id or subid that links back to your click_tracking table
        // - order_id
        // - commission amount
        // - currency
        // - status (e.g., pending, approved, rejected)
        // - product/offer identifier if possible

        const clickId = payload.subid1; // Example: Assuming subid1 contains your click_tracking ID
        const orderId = payload.order_id;
        const commission = parseFloat(payload.commission);
        const status = payload.status; // Map Daraz status to your status
        const vendorName = 'Daraz'; // Hardcoded for this endpoint

        // Find the original click (crucial for attribution)
        const click = clickId ? await c.env.DB.prepare("SELECT id, product_offer_id FROM click_tracking WHERE id = ?1").bind(clickId).first() : null;

        if (!click) {
            console.warn(`Daraz postback received for unknown click ID: ${clickId}`);
            // Still might want to record the conversion without click_id if possible
        }

        const productOfferId = click?.product_offer_id; // Get from click if available, otherwise might need lookup based on other payload data
        if (!productOfferId) {
             console.warn(`Could not determine product_offer_id for Daraz postback. Click ID: ${clickId}`);
             // Cannot proceed without knowing which offer converted
             return c.json({ status: "error", message: "Cannot determine product offer" }, 400);
        }


        // Insert or update conversion record
        // Use ON CONFLICT if Daraz might send multiple updates for the same order_id
        const { success } = await c.env.DB.prepare(
            "INSERT INTO conversions (click_id, product_offer_id, vendor_name, order_id, commission, currency, status, raw_payload) " +
            "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8) " +
             // Example: Update status and commission if order ID already exists
             "ON CONFLICT(vendor_name, order_id) DO UPDATE SET status = excluded.status, commission = excluded.commission, raw_payload = excluded.raw_payload, conversion_time = CURRENT_TIMESTAMP"
        ).bind(
            click?.id ?? null,
            productOfferId,
            vendorName,
            orderId, // Ensure this exists and is unique per vendor
            commission,
            payload.currency ?? 'NPR', // Extract currency
            status, // Map Daraz status
            JSON.stringify(payload)
        ).run();

        if (!success) {
            throw new Error("Failed to insert/update conversion record.");
        }

        return c.json({ status: "success" }); // Respond to Daraz

    } catch (e: any) {
        console.error("Daraz Postback Error:", e);
        return c.json({ status: "error", message: e.message }, 500);
    }
};
