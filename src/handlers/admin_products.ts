import { Context } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { AppEnv } from '../index'; // Adjust path

// --- Zod Schemas for Validation ---
const ProductSchema = z.object({
    name: z.string().min(1).max(255),
    slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric and hyphens only"),
    description: z.string().optional(),
    brand: z.string().optional(),
    model: z.string().optional(),
    image_url: z.string().url().optional().nullable(),
    category_id: z.number().int().positive().optional().nullable(),
    status: z.enum(['active', 'inactive', 'draft']).default('draft'),
    features: z.string().optional(), // Expecting JSON string for simplicity, parse/validate later if needed
    meta_title: z.string().max(70).optional(),
    meta_description: z.string().max(160).optional(),
});

const ProductOfferSchema = z.object({
    vendor_name: z.string().min(1).max(100),
    vendor_product_id: z.string().max(100).optional(),
    price: z.number().positive(),
    currency: z.string().length(3).default('NPR'),
    affiliate_url: z.string().url(),
    is_available: z.boolean().default(true),
});

const CreateProductSchema = ProductSchema.extend({
    offers: z.array(ProductOfferSchema).min(1, "At least one product offer is required."),
});

const UpdateProductSchema = ProductSchema.partial().extend({
    // Offers are handled separately or require a more complex update logic
});


// --- Handler Implementations ---

// GET /api/admin/products
export const handleAdminGetProducts = async (c: Context<AppEnv>) => {
    // Add pagination, filtering, sorting later
    try {
        const { results } = await c.env.DB.prepare(
            "SELECT p.id, p.name, p.slug, p.brand, p.status, c.name as category_name " +
            "FROM products p LEFT JOIN categories c ON p.category_id = c.id " +
            "ORDER BY p.updated_at DESC LIMIT 50"
        ).all();
        return c.json({ success: true, products: results ?? [] });
    } catch (e: any) {
        console.error("Admin Get Products Error:", e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};

// GET /api/admin/products/:id
export const handleAdminGetProductById = async (c: Context<AppEnv>) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) {
        return c.json({ success: false, error: "Invalid ID" }, 400);
    }

    try {
        const product = await c.env.DB.prepare(
            "SELECT *, (SELECT json_group_array(json_object(" +
            "'id', po.id, 'vendor_name', po.vendor_name, 'price', po.price, 'currency', po.currency, 'affiliate_url', po.affiliate_url, 'is_available', po.is_available" +
            ")) FROM product_offers po WHERE po.product_id = p.id) as offers " +
            "FROM products p WHERE p.id = ?1"
        ).bind(id).first();

        if (!product) {
            return c.json({ success: false, error: "Product not found" }, 404);
        }

        // Parse the JSON string for offers
        try {
            if (typeof product.offers === 'string') {
                 product.offers = JSON.parse(product.offers);
            }
        } catch (parseError) {
             console.error("Error parsing product offers JSON:", parseError);
             product.offers = []; // Default to empty array on parse error
        }


        return c.json({ success: true, product });
    } catch (e: any) {
        console.error(`Admin Get Product ${id} Error:`, e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};


// POST /api/admin/products
export const handleAdminCreateProduct = zValidator('json', CreateProductSchema, (result, c) => {
    if (!result.success) {
        return c.json({ success: false, error: 'Validation failed', details: result.error.errors }, 400);
    }
});
export const handleAdminCreateProductAction = async (c: Context<AppEnv>) => {
    // @ts-expect-error - zValidator types not properly inferred
    const productData = c.req.valid('json') as z.infer<typeof CreateProductSchema>;
    const { offers, ...product } = productData;

    // TODO: Add check for slug uniqueness before insert if not handled by DB constraint adequately

    try {
        // Use a transaction if D1 supported it fully for multi-statement inserts.
        // For now, insert product then offers. Rollback manually is harder.
        const productInsertResult = await c.env.DB.prepare(
            "INSERT INTO products (name, slug, description, brand, model, image_url, category_id, status, features, meta_title, meta_description) " +
            "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11) RETURNING id"
        ).bind(
            product.name, product.slug, product.description, product.brand, product.model, product.image_url,
            product.category_id, product.status, product.features, product.meta_title, product.meta_description
        ).first<{ id: number }>();

        if (!productInsertResult?.id) {
            throw new Error("Failed to insert product or retrieve ID.");
        }
        const productId = productInsertResult.id;

        // Prepare offer insert statement
        const offerStmt = c.env.DB.prepare(
            "INSERT INTO product_offers (product_id, vendor_name, vendor_product_id, price, currency, affiliate_url, is_available) " +
            "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)"
        );

        // Batch insert offers
        const offerInserts = offers.map((offer: any) =>
            offerStmt.bind(productId, offer.vendor_name, offer.vendor_product_id, offer.price, offer.currency, offer.affiliate_url, offer.is_available)
        );
        const offerResults = await c.env.DB.batch(offerInserts);

        // Basic check if all batches succeeded (more robust check might be needed)
        const allSucceeded = offerResults.every(res => res.success);
        if (!allSucceeded) {
             console.warn("Some product offers failed to insert for product ID:", productId);
             // Consider cleanup or marking product as draft if offers fail
        }


        return c.json({ success: true, productId: productId }, 201);

    } catch (e: any) {
        console.error("Admin Create Product Error:", e);
        if (e.message?.includes('UNIQUE constraint failed')) {
            return c.json({ success: false, error: 'Conflict', message: 'Slug already exists' }, 409);
        }
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};


// PUT /api/admin/products/:id
export const handleAdminUpdateProduct = zValidator('json', UpdateProductSchema, (result, c) => {
    if (!result.success) {
        return c.json({ success: false, error: 'Validation failed', details: result.error.errors }, 400);
    }
});
export const handleAdminUpdateProductAction = async (c: Context<AppEnv>) => {
    const id = parseInt(c.req.param('id'), 10);
     if (isNaN(id)) {
        return c.json({ success: false, error: "Invalid ID" }, 400);
    }
    // @ts-expect-error - zValidator types not properly inferred
    const productUpdateData = c.req.valid('json') as Partial<z.infer<typeof UpdateProductSchema>>;

    // Build the SET part of the SQL query dynamically
    const fieldsToUpdate = Object.keys(productUpdateData);
    if (fieldsToUpdate.length === 0) {
        return c.json({ success: false, error: "No fields provided for update" }, 400);
    }

    const setClauses = fieldsToUpdate.map((field, index) => `${field} = ?${index + 1}`);
    const values: any[] = fieldsToUpdate.map(field => (productUpdateData as any)[field]);

    // Add updated_at manually if not using trigger (trigger IS defined in migration)
    // setClauses.push("updated_at = CURRENT_TIMESTAMP");

    values.push(id); // Add the ID for the WHERE clause

    try {
        const { success, meta } = await c.env.DB.prepare(
            `UPDATE products SET ${setClauses.join(', ')} WHERE id = ?${values.length}`
        ).bind(...values).run();

         if (!success || meta?.changes === 0) {
            // Check if the product actually existed
             const exists = await c.env.DB.prepare("SELECT 1 FROM products WHERE id = ?1").bind(id).first();
             if (!exists) {
                 return c.json({ success: false, error: "Product not found" }, 404);
             }
            // If it exists but changes = 0, maybe data was identical or DB error
            console.warn(`Update for product ${id} resulted in 0 changes. Success: ${success}`);
             if(!success) throw new Error("Database update failed.");
        }

        return c.json({ success: true, productId: id });

    } catch (e: any) {
        console.error(`Admin Update Product ${id} Error:`, e);
         if (e.message?.includes('UNIQUE constraint failed')) {
            return c.json({ success: false, error: 'Conflict', message: 'Slug already exists' }, 409);
        }
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};

// DELETE /api/admin/products/:id
export const handleAdminDeleteProduct = async (c: Context<AppEnv>) => {
    const id = parseInt(c.req.param('id'), 10);
     if (isNaN(id)) {
        return c.json({ success: false, error: "Invalid ID" }, 400);
    }

    try {
        const { success, meta } = await c.env.DB.prepare("DELETE FROM products WHERE id = ?1").bind(id).run();

        if (!success || meta?.changes === 0) {
           const exists = await c.env.DB.prepare("SELECT 1 FROM products WHERE id = ?1").bind(id).first();
             if (!exists) {
                 return c.json({ success: false, error: "Product not found" }, 404);
             }
             if(!success) throw new Error("Database delete failed.");
             console.warn(`Delete for product ${id} resulted in 0 changes. Success: ${success}`);
        }

        return c.json({ success: true, message: `Product ${id} deleted` });
    } catch (e: any) {
         console.error(`Admin Delete Product ${id} Error:`, e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};

// --- TODO: Add handlers for managing Product Offers (separate endpoints recommended) ---
// POST /api/admin/products/:productId/offers
// PUT /api/admin/offers/:offerId
// DELETE /api/admin/offers/:offerId
