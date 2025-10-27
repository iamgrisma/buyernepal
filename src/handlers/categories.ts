import { Context } from 'hono';
import { AppEnv } from '../index'; // Adjust path

// GET /api/categories
export const handleGetCategories = async (c: Context<AppEnv>) => {
    try {
        // Fetch top-level categories, potentially with subcategory counts or details later
        const { results } = await c.env.DB.prepare(
            "SELECT id, name, slug, description FROM categories WHERE parent_id IS NULL ORDER BY name ASC"
        ).all();
        return c.json({ success: true, categories: results ?? [] });
    } catch (e: any) {
        console.error("Get Categories Error:", e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};

// GET /api/categories/:slug (Fetch category details and its products)
export const handleGetCategoryBySlug = async (c: Context<AppEnv>) => {
    const slug = c.req.param('slug');
    if (!slug) return c.json({ success: false, error: "Missing slug" }, 400);

     // TODO: Implement pagination for products
     const page = parseInt(c.req.query('page') || '1', 10);
     const limit = parseInt(c.req.query('limit') || '20', 10);
     const offset = (page - 1) * limit;

    try {
        const category = await c.env.DB.prepare(
            "SELECT id, name, slug, description, parent_id FROM categories WHERE slug = ?1"
        ).bind(slug).first<{ id: number, name: string, slug: string, description: string, parent_id: number | null }>();

        if (!category) {
            return c.json({ success: false, error: "Category not found" }, 404);
        }

        // Fetch products in this category (including subcategories might be needed)
        // This simple version only gets direct products
        const productsResult = await c.env.DB.prepare(
            "SELECT id, name, slug, brand, image_url, description " + // Add price/offer later
            "FROM products WHERE category_id = ?1 AND status = 'active' " +
            "ORDER BY updated_at DESC LIMIT ?2 OFFSET ?3"
        ).bind(category.id, limit, offset).all();

        // Maybe fetch subcategories too
        const subcategoriesResult = await c.env.DB.prepare(
             "SELECT id, name, slug FROM categories WHERE parent_id = ?1 ORDER BY name ASC"
        ).bind(category.id).all();

        return c.json({
            success: true,
            category,
            products: productsResult.results ?? [],
            subcategories: subcategoriesResult.results ?? []
            // Add pagination metadata later
        });

    } catch (e: any) {
        console.error(`Get Category ${slug} Error:`, e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};
