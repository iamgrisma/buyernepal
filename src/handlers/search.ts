import { Context } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { AppEnv } from '../index';

const SearchSchema = z.object({
    q: z.string().min(1, "Query is required").max(100),
    page: z.number().int().positive().optional().default(1),
    limit: z.number().int().positive().max(50).optional().default(10),
    // Add category, brand, price filters later
});

// GET /api/search
export const handleSearch = zValidator('query', SearchSchema, (result, c) => {
    if (!result.success) {
        return c.json({ success: false, error: 'Validation failed', details: result.error.errors }, 400);
    }
});
export const handleSearchAction = async (c: Context<AppEnv>) => {
    const { q, page, limit } = c.req.valid('query');
    const offset = (page - 1) * limit;

    try {
        // Basic search using LIKE - Consider Full-Text Search (FTS5) in D1 for better performance later
        const searchTerm = `%${q}%`;
        const { results } = await c.env.DB.prepare(
            "SELECT id, name, slug, brand, image_url, description " +
            "FROM products WHERE (name LIKE ?1 OR brand LIKE ?1 OR description LIKE ?1) AND status = 'active' " +
            "ORDER BY name ASC LIMIT ?2 OFFSET ?3" // Simple ordering, relevance scoring is complex
        ).bind(searchTerm, limit, offset).all();

         // Could also search categories, coupons etc.

        return c.json({ success: true, query: q, results: results ?? [] }); // Add pagination info later
    } catch (e: any) {
        console.error("Search Error:", e);
        return c.json({ success: false, error: "Search failed", message: e.message }, 500);
    }
};
