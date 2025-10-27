import { Context } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { AppEnv } from '../index'; // Adjust path

// --- Zod Schemas ---
const CategorySchema = z.object({
    name: z.string().min(1).max(100),
    slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric and hyphens only"),
    description: z.string().optional().nullable(),
    parent_id: z.number().int().positive().optional().nullable(),
    // sort_order: z.number().int().optional().default(0), // Add later if needed
});

const CreateCategorySchema = CategorySchema;
const UpdateCategorySchema = CategorySchema.partial();

// --- Handlers ---

// GET /api/admin/categories
export const handleAdminGetCategories = async (c: Context<AppEnv>) => {
    try {
        const { results } = await c.env.DB.prepare(
            "SELECT c.id, c.name, c.slug, p.name as parent_name " +
            "FROM categories c LEFT JOIN categories p ON c.parent_id = p.id " +
            "ORDER BY c.name ASC"
        ).all();
        return c.json({ success: true, categories: results ?? [] });
    } catch (e: any) {
        console.error("Admin Get Categories Error:", e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};

// POST /api/admin/categories
export const handleAdminCreateCategory = zValidator('json', CreateCategorySchema, (result, c) => {
    if (!result.success) {
        return c.json({ success: false, error: 'Validation failed', details: result.error.errors }, 400);
    }
});
export const handleAdminCreateCategoryAction = async (c: Context<AppEnv>) => {
    // @ts-expect-error - zValidator types not properly inferred
    const data = c.req.valid('json') as z.infer<typeof CreateCategorySchema>;
    try {
        // Optional: Check if parent_id exists if provided
        if (data.parent_id) {
            const parentExists = await c.env.DB.prepare("SELECT 1 FROM categories WHERE id = ?1").bind(data.parent_id).first();
            if (!parentExists) {
                return c.json({ success: false, error: "Validation failed", message: `Parent category ID ${data.parent_id} not found.` }, 400);
            }
        }

        const { success, meta } = await c.env.DB.prepare(
            "INSERT INTO categories (name, slug, description, parent_id) VALUES (?1, ?2, ?3, ?4)"
        ).bind(data.name, data.slug, data.description, data.parent_id).run();

        if (!success) throw new Error("Failed to insert category.");

        return c.json({ success: true, id: meta?.last_row_id }, 201);
    } catch (e: any) {
        console.error("Admin Create Category Error:", e);
        if (e.message?.includes('UNIQUE constraint failed')) {
            return c.json({ success: false, error: 'Conflict', message: 'Name or Slug already exists' }, 409);
        }
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};

// PUT /api/admin/categories/:id
export const handleAdminUpdateCategory = zValidator('json', UpdateCategorySchema, (result, c) => {
     if (!result.success) {
        return c.json({ success: false, error: 'Validation failed', details: result.error.errors }, 400);
    }
});
export const handleAdminUpdateCategoryAction = async (c: Context<AppEnv>) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) return c.json({ success: false, error: "Invalid ID" }, 400);
    // @ts-expect-error - zValidator types not properly inferred
    const data = c.req.valid('json') as Partial<z.infer<typeof UpdateCategorySchema>>;

    const fieldsToUpdate = Object.keys(data);
    if (fieldsToUpdate.length === 0) return c.json({ success: false, error: "No fields to update" }, 400);

     try {
         // Optional: Check if parent_id exists if provided
        if (data.parent_id) {
            const parentExists = await c.env.DB.prepare("SELECT 1 FROM categories WHERE id = ?1").bind(data.parent_id).first();
            if (!parentExists) {
                return c.json({ success: false, error: "Validation failed", message: `Parent category ID ${data.parent_id} not found.` }, 400);
            }
            if (data.parent_id === id) {
                 return c.json({ success: false, error: "Validation failed", message: `Category cannot be its own parent.` }, 400);
            }
        }


        const setClauses = fieldsToUpdate.map((field, i) => `${field} = ?${i + 1}`);
        const values: any[] = fieldsToUpdate.map(field => (data as any)[field]);
        values.push(id);

        const { success, meta } = await c.env.DB.prepare(
            `UPDATE categories SET ${setClauses.join(', ')} WHERE id = ?${values.length}`
        ).bind(...values).run();

        if (!success || meta?.changes === 0) {
            const exists = await c.env.DB.prepare("SELECT 1 FROM categories WHERE id = ?1").bind(id).first();
            if (!exists) return c.json({ success: false, error: "Category not found" }, 404);
            if (!success) throw new Error("Database update failed.");
        }
        return c.json({ success: true, id });
    } catch (e: any) {
        console.error(`Admin Update Category ${id} Error:`, e);
        if (e.message?.includes('UNIQUE constraint failed')) {
            return c.json({ success: false, error: 'Conflict', message: 'Name or Slug already exists' }, 409);
        }
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};


// DELETE /api/admin/categories/:id
export const handleAdminDeleteCategory = async (c: Context<AppEnv>) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) return c.json({ success: false, error: "Invalid ID" }, 400);

    try {
        // Consider implications: Deleting a category might orphan products or subcategories.
        // Migration sets parent_id to NULL and category_id in products to NULL.
        // You might want to prevent deletion if it has children/products unless intended.
        const { success, meta } = await c.env.DB.prepare("DELETE FROM categories WHERE id = ?1").bind(id).run();

        if (!success || meta?.changes === 0) {
            const exists = await c.env.DB.prepare("SELECT 1 FROM categories WHERE id = ?1").bind(id).first();
            if (!exists) return c.json({ success: false, error: "Category not found" }, 404);
            if (!success) throw new Error("Database delete failed.");
        }
        return c.json({ success: true, message: `Category ${id} deleted` });
    } catch (e: any) {
        console.error(`Admin Delete Category ${id} Error:`, e);
        // Foreign key errors might occur if deletion rule was RESTRICT
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};
