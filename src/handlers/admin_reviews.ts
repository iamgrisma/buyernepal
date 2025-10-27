import { Context } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { AppEnv } from '../index';
import { UserPayload } from '../utils/auth';

// --- Zod Schemas ---
const ReviewSchema = z.object({
    product_id: z.number().int().positive(),
    user_id: z.number().int().positive().optional().nullable(), // Admin might assign or leave null
    rating: z.number().int().min(1).max(5),
    title: z.string().max(255).optional().nullable(),
    content: z.string().min(10, "Review content is too short"),
    status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
});

const CreateReviewSchema = ReviewSchema;
const UpdateReviewSchema = ReviewSchema.partial().omit({ product_id: true, user_id: true }); // Prevent changing product/user association easily

// --- Handlers ---

// GET /api/admin/reviews
export const handleAdminGetReviews = async (c: Context<AppEnv>) => {
    const statusFilter = c.req.query('status'); // e.g., ?status=pending
    const productIdFilter = c.req.query('productId');
    let query = "SELECT r.id, r.rating, r.title, r.status, r.created_at, p.name as product_name, u.username as user_username " +
                "FROM reviews r JOIN products p ON r.product_id = p.id LEFT JOIN users u ON r.user_id = u.id";
    const bindings: (string | number)[] = [];
    let conditionIndex = 1;

    if (statusFilter && ['pending', 'approved', 'rejected'].includes(statusFilter)) {
        query += ` WHERE r.status = ?${conditionIndex}`;
        bindings.push(statusFilter);
        conditionIndex++;
    }
     if (productIdFilter) {
        const productId = parseInt(productIdFilter, 10);
        if (!isNaN(productId)) {
            query += (conditionIndex > 1 ? " AND" : " WHERE") + ` r.product_id = ?${conditionIndex}`;
            bindings.push(productId);
            conditionIndex++;
        }
    }


    query += " ORDER BY r.created_at DESC LIMIT 50"; // Add pagination later

    try {
        const { results } = await c.env.DB.prepare(query).bind(...bindings).all();
        return c.json({ success: true, reviews: results ?? [] });
    } catch (e: any) {
        console.error("Admin Get Reviews Error:", e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};

// POST /api/admin/reviews (Admin creating a review)
export const handleAdminCreateReview = zValidator('json', CreateReviewSchema, (result, c) => {
    if (!result.success) {
        return c.json({ success: false, error: 'Validation failed', details: result.error.errors }, 400);
    }
});
export const handleAdminCreateReviewAction = async (c: Context<AppEnv>) => {
    const data = c.req.valid('json');
    // For admin creation, user_id might be the admin's ID or null if it represents an 'editorial' review
    const currentUser = c.get('user') as UserPayload | undefined; // Get from auth middleware
    const userIdToInsert = data.user_id ?? currentUser?.userId ?? null; // Prefer explicit, fallback to logged-in admin, then null

    try {
        // Verify product exists
        const productExists = await c.env.DB.prepare("SELECT 1 FROM products WHERE id = ?1").bind(data.product_id).first();
        if (!productExists) {
             return c.json({ success: false, error: "Validation failed", message: `Product ID ${data.product_id} not found.` }, 400);
        }
        // Verify user exists if provided
        if (userIdToInsert){
            const userExists = await c.env.DB.prepare("SELECT 1 FROM users WHERE id = ?1").bind(userIdToInsert).first();
             if (!userExists) {
                 return c.json({ success: false, error: "Validation failed", message: `User ID ${userIdToInsert} not found.` }, 400);
            }
        }


        const { success, meta } = await c.env.DB.prepare(
            "INSERT INTO reviews (product_id, user_id, rating, title, content, status) VALUES (?1, ?2, ?3, ?4, ?5, ?6)"
        ).bind(data.product_id, userIdToInsert, data.rating, data.title, data.content, data.status).run();

        if (!success) throw new Error("Failed to insert review.");

        // TODO: Update product's average rating/review count (maybe via trigger or separate call)

        return c.json({ success: true, id: meta?.last_row_id }, 201);
    } catch (e: any) {
        console.error("Admin Create Review Error:", e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};

// PUT /api/admin/reviews/:id (Update status, content etc.)
export const handleAdminUpdateReview = zValidator('json', UpdateReviewSchema, (result, c) => {
     if (!result.success) {
        return c.json({ success: false, error: 'Validation failed', details: result.error.errors }, 400);
    }
});
export const handleAdminUpdateReviewAction = async (c: Context<AppEnv>) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) return c.json({ success: false, error: "Invalid ID" }, 400);
    const data = c.req.valid('json');

    const fieldsToUpdate = Object.keys(data);
    if (fieldsToUpdate.length === 0) return c.json({ success: false, error: "No fields to update" }, 400);

    try {
        const setClauses = fieldsToUpdate.map((field, i) => `${field} = ?${i + 1}`);
        const values = fieldsToUpdate.map(field => data[field as keyof typeof data]);
        values.push(id);

        const { success, meta } = await c.env.DB.prepare(
            `UPDATE reviews SET ${setClauses.join(', ')} WHERE id = ?${values.length}`
        ).bind(...values).run();

        if (!success || meta?.changes === 0) {
            const exists = await c.env.DB.prepare("SELECT 1 FROM reviews WHERE id = ?1").bind(id).first();
            if (!exists) return c.json({ success: false, error: "Review not found" }, 404);
             if (!success) throw new Error("Database update failed.");
        }

        // TODO: Update product's average rating/review count if status changed to/from 'approved'

        return c.json({ success: true, id });
    } catch (e: any) {
        console.error(`Admin Update Review ${id} Error:`, e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};


// DELETE /api/admin/reviews/:id
export const handleAdminDeleteReview = async (c: Context<AppEnv>) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) return c.json({ success: false, error: "Invalid ID" }, 400);

    try {
        const { success, meta } = await c.env.DB.prepare("DELETE FROM reviews WHERE id = ?1").bind(id).run();

        if (!success || meta?.changes === 0) {
           const exists = await c.env.DB.prepare("SELECT 1 FROM reviews WHERE id = ?1").bind(id).first();
             if (!exists) return c.json({ success: false, error: "Review not found" }, 404);
             if (!success) throw new Error("Database delete failed.");
        }

        // TODO: Update product's average rating/review count

        return c.json({ success: true, message: `Review ${id} deleted` });
    } catch (e: any) {
        console.error(`Admin Delete Review ${id} Error:`, e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};
