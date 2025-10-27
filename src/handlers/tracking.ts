import { Context } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { AppEnv } from '../index';
import { sha256Hash } from '../utils/crypto';

// Basic schema, expand as needed
const EventSchema = z.object({
    type: z.enum(['page_view', 'refer_hit', 'cta_click', 'coupon_apply', 'pwa_install']),
    url: z.string().url().optional(),
    product_id: z.number().int().optional(),
    refer_slug_id: z.number().int().optional(),
    coupon_id: z.number().int().optional(),
    // Add other relevant context
});

const BatchEventSchema = z.array(EventSchema).min(1);

// POST /api/events
export const handleTrackEvents = zValidator('json', BatchEventSchema, (result, c) => {
     if (!result.success) {
        return c.json({ success: false, error: 'Validation failed', details: result.error.errors }, 400);
    }
});
export const handleTrackEventsAction = async (c: Context<AppEnv>) => {
    // @ts-expect-error - zValidator types not properly inferred
    const events = c.req.valid('json') as z.infer<typeof BatchEventSchema>;

    // In production, consider sending this to a Queue or Analytics Engine instead of direct DB write
    // For now, simple insert (will be slow under load)
    const ip = c.req.header('CF-Connecting-IP') || 'unknown';
    const ipHash = await sha256Hash(ip);
    const userAgent = c.req.header('User-Agent') || '';
    const country = c.req.header('CF-IPCountry') || '';

    try {
        const insertStmt = c.env.DB.prepare(
            "INSERT INTO audit_logs (action, target_type, target_id, details, ip_address) " + // Using audit log for simplicity, could be separate table
            "VALUES (?1, ?2, ?3, ?4, ?5)"
        );

        const inserts = events.map((event: any) => {
            let targetType: string | undefined;
            let targetId: string | undefined;
            if (event.product_id) { targetType = 'product'; targetId = String(event.product_id); }
            else if (event.refer_slug_id) { targetType = 'refer_slug'; targetId = String(event.refer_slug_id); }
            else if (event.coupon_id) { targetType = 'coupon'; targetId = String(event.coupon_id); }

            return insertStmt.bind(
                `event_${event.type}`,
                targetType,
                targetId,
                JSON.stringify(event), // Store full event details
                ipHash // Log hashed IP
            );
        });

        await c.env.DB.batch(inserts);

        return c.json({ success: true, message: `${events.length} events logged.` }, 202); // 202 Accepted

    } catch (e: any) {
        console.error("Track Events Error:", e);
        return c.json({ success: false, error: "Logging failed", message: e.message }, 500);
    }
};
