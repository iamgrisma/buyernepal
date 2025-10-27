import { Context } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { AppEnv } from '../index';

const ReferSlugSchema = z.object({
    public_slug: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_-]+$/, "Slug must be alphanumeric, underscore, or hyphen"),
    product_offer_id: z.number().int().positive(),
    campaign_tag: z.string().max(100).optional().nullable(),
    is_active: z.boolean().default(true),
});

const CreateReferSlugSchema = ReferSlugSchema;
const UpdateReferSlugSchema = ReferSlugSchema.partial();


// GET /api/admin/refer-slugs
export const handleAdminGetReferSlugs = async (c: Context<AppEnv>) => {
    try {
        const { results } = await c.env.DB.prepare(
            "SELECT rs.id, rs.public_slug, rs.product_offer_id, rs.campaign_tag, rs.is_active, po.vendor_name, p.name as product_name " +
            "FROM refer_slugs rs JOIN product_offers po ON rs.product_offer_id = po.id JOIN products p ON po.product_id = p.id " +
            "ORDER BY rs.created_at DESC LIMIT 50"
        ).all();
        return c.json({ success: true, refer_slugs: results ?? [] });
    } catch (e: any) {
        console.error("Admin Get Refer Slugs Error:", e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};

// POST /api/admin/refer-slugs
export const handleAdminCreateReferSlug = zValidator('json', CreateReferSlugSchema, (result, c) => {
    if (!result.success) {
        return c.json({ success: false, error: 'Validation failed', details: result.error.errors }, 400);
    }
});
export const handleAdminCreateReferSlugAction = async (c: Context<AppEnv>) => {
    // @ts-expect-error - zValidator types not properly inferred
    const data = c.req.valid('json') as z.infer<typeof CreateReferSlugSchema>;

    try {
        // Check if product offer exists
        const offerExists = await c.env.DB.prepare("SELECT 1 FROM product_offers WHERE id = ?1").bind(data.product_offer_id).first();
        if (!offerExists) {
             return c.json({ success: false, error: "Validation failed", message: `Product offer ID ${data.product_offer_id} not found.` }, 400);
        }

        const { success, meta } = await c.env.DB.prepare(
            "INSERT INTO refer_slugs (public_slug, product_offer_id, campaign_tag, is_active) VALUES (?1, ?2, ?3, ?4)"
        ).bind(data.public_slug, data.product_offer_id, data.campaign_tag, data.is_active).run();

        if (!success) {
            throw new Error("Failed to insert refer slug.");
        }

        return c.json({ success: true, id: meta?.last_row_id }, 201);

    } catch (e: any) {
        console.error("Admin Create Refer Slug Error:", e);
        if (e.message?.includes('UNIQUE constraint failed')) {
            return c.json({ success: false, error: 'Conflict', message: 'Public slug already exists' }, 409);
        }
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};

// PUT /api/admin/refer-slugs/:id
export const handleAdminUpdateReferSlug = zValidator('json', UpdateReferSlugSchema, (result, c) => {
    if (!result.success) {
        return c.json({ success: false, error: 'Validation failed', details: result.error.errors }, 400);
    }
});
export const handleAdminUpdateReferSlugAction = async (c: Context<AppEnv>) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) {
        return c.json({ success: false, error: "Invalid ID" }, 400);
    }
    // @ts-expect-error - zValidator types not properly inferred
    const data = c.req.valid('json') as Partial<z.infer<typeof UpdateReferSlugSchema>>;

    const fieldsToUpdate = Object.keys(data);
    if (fieldsToUpdate.length === 0) {
        return c.json({ success: false, error: "No fields provided for update" }, 400);
    }

    // Check if product offer exists if it's being updated
    if (data.product_offer_id) {
         const offerExists = await c.env.DB.prepare("SELECT 1 FROM product_offers WHERE id = ?1").bind(data.product_offer_id).first();
        if (!offerExists) {
             return c.json({ success: false, error: "Validation failed", message: `Product offer ID ${data.product_offer_id} not found.` }, 400);
        }
    }


    const setClauses = fieldsToUpdate.map((field, index) => `${field} = ?${index + 1}`);
    const values: any[] = fieldsToUpdate.map(field => (data as any)[field]);
    values.push(id); // For WHERE clause

    try {
        const { success, meta } = await c.env.DB.prepare(
            `UPDATE refer_slugs SET ${setClauses.join(', ')} WHERE id = ?${values.length}`
        ).bind(...values).run();

        if (!success || meta?.changes === 0) {
             const exists = await c.env.DB.prepare("SELECT 1 FROM refer_slugs WHERE id = ?1").bind(id).first();
             if (!exists) {
                 return c.json({ success: false, error: "Refer slug not found" }, 404);
             }
             if(!success) throw new Error("Database update failed.");
        }

        return c.json({ success: true, id: id });

    } catch (e: any) {
        console.error(`Admin Update Refer Slug ${id} Error:`, e);
        if (e.message?.includes('UNIQUE constraint failed')) {
            return c.json({ success: false, error: 'Conflict', message: 'Public slug already exists' }, 409);
        }
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};

// DELETE /api/admin/refer-slugs/:id
export const handleAdminDeleteReferSlug = async (c: Context<AppEnv>) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) {
        return c.json({ success: false, error: "Invalid ID" }, 400);
    }

    try {
        const { success, meta } = await c.env.DB.prepare("DELETE FROM refer_slugs WHERE id = ?1").bind(id).run();

        if (!success || meta?.changes === 0) {
           const exists = await c.env.DB.prepare("SELECT 1 FROM refer_slugs WHERE id = ?1").bind(id).first();
             if (!exists) {
                 return c.json({ success: false, error: "Refer slug not found" }, 404);
             }
             if(!success) throw new Error("Database delete failed.");
        }

        return c.json({ success: true, message: `Refer slug ${id} deleted` });
    } catch (e: any) {
         console.error(`Admin Delete Refer Slug ${id} Error:`, e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};
