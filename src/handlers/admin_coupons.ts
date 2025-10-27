import { Context } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { AppEnv } from '../index';

// --- Zod Schemas ---
// Dates can be tricky. Zod can parse ISO strings. Ensure input format consistency.
const CouponSchema = z.object({
    product_id: z.number().int().positive().optional().nullable(),
    category_id: z.number().int().positive().optional().nullable(),
    vendor_name: z.string().max(100).optional().nullable(),
    code: z.string().max(50).optional().nullable(),
    description: z.string().min(5).max(500),
    discount_type: z.enum(['percentage', 'fixed']),
    discount_value: z.number().positive(),
    affiliate_url: z.string().url().optional().nullable(),
    start_date: z.string().datetime().optional().nullable(), // Expect ISO 8601 format string
    end_date: z.string().datetime().optional().nullable(), // Expect ISO 8601 format string
    status: z.enum(['active', 'inactive', 'expired']).default('active'),
});

const CreateCouponSchema = CouponSchema;
const UpdateCouponSchema = CouponSchema.partial();

// --- Handlers ---

// GET /api/admin/coupons
export const handleAdminGetCoupons = async (c: Context<AppEnv>) => {
     // Add filtering (status, vendor) and pagination later
    try {
        const { results } = await c.env.DB.prepare(
            "SELECT c.*, p.name as product_name, cat.name as category_name " +
            "FROM coupons c LEFT JOIN products p ON c.product_id = p.id LEFT JOIN categories cat ON c.category_id = cat.id " +
            "ORDER BY c.end_date DESC, c.created_at DESC LIMIT 50"
        ).all();
        return c.json({ success: true, coupons: results ?? [] });
    } catch (e: any) {
        console.error("Admin Get Coupons Error:", e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};

// POST /api/admin/coupons
export const handleAdminCreateCoupon = zValidator('json', CreateCouponSchema, (result, c) => {
    if (!result.success) {
        return c.json({ success: false, error: 'Validation failed', details: result.error.errors }, 400);
    }
});
export const handleAdminCreateCouponAction = async (c: Context<AppEnv>) => {
    const data = c.req.valid('json');

    try {
         // TODO: Add checks for product_id, category_id if provided

        const { success, meta } = await c.env.DB.prepare(
            "INSERT INTO coupons (product_id, category_id, vendor_name, code, description, discount_type, discount_value, affiliate_url, start_date, end_date, status) " +
            "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)"
        ).bind(
            data.product_id, data.category_id, data.vendor_name, data.code, data.description,
            data.discount_type, data.discount_value, data.affiliate_url,
            data.start_date, data.end_date, data.status
        ).run();

        if (!success) throw new Error("Failed to insert coupon.");

        return c.json({ success: true, id: meta?.last_row_id }, 201);

    } catch (e: any) {
        console.error("Admin Create Coupon Error:", e);
         // Add specific unique constraint checks if needed (e.g., on `code` + `vendor_name` combo)
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};

// PUT /api/admin/coupons/:id
export const handleAdminUpdateCoupon = zValidator('json', UpdateCouponSchema, (result, c) => {
     if (!result.success) {
        return c.json({ success: false, error: 'Validation failed', details: result.error.errors }, 400);
    }
});
export const handleAdminUpdateCouponAction = async (c: Context<AppEnv>) => {
     const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) return c.json({ success: false, error: "Invalid ID" }, 400);
    const data = c.req.valid('json');

    const fieldsToUpdate = Object.keys(data);
    if (fieldsToUpdate.length === 0) return c.json({ success: false, error: "No fields to update" }, 400);

    // TODO: Add checks for product_id, category_id if being updated

    try {
        const setClauses = fieldsToUpdate.map((field, i) => `${field} = ?${i + 1}`);
        const values = fieldsToUpdate.map(field => data[field as keyof typeof data]);
        values.push(id);

        const { success, meta } = await c.env.DB.prepare(
            `UPDATE coupons SET ${setClauses.join(', ')} WHERE id = ?${values.length}`
        ).bind(...values).run();

        if (!success || meta?.changes === 0) {
           const exists = await c.env.DB.prepare("SELECT 1 FROM coupons WHERE id = ?1").bind(id).first();
             if (!exists) return c.json({ success: false, error: "Coupon not found" }, 404);
             if (!success) throw new Error("Database update failed.");
        }
        return c.json({ success: true, id });
    } catch (e: any) {
        console.error(`Admin Update Coupon ${id} Error:`, e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};


// DELETE /api/admin/coupons/:id
export const handleAdminDeleteCoupon = async (c: Context<AppEnv>) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) return c.json({ success: false, error: "Invalid ID" }, 400);

    try {
         const { success, meta } = await c.env.DB.prepare("DELETE FROM coupons WHERE id = ?1").bind(id).run();

        if (!success || meta?.changes === 0) {
            const exists = await c.env.DB.prepare("SELECT 1 FROM coupons WHERE id = ?1").bind(id).first();
             if (!exists) return c.json({ success: false, error: "Coupon not found" }, 404);
             if (!success) throw new Error("Database delete failed.");
        }
        return c.json({ success: true, message: `Coupon ${id} deleted` });
    } catch (e: any) {
        console.error(`Admin Delete Coupon ${id} Error:`, e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};
