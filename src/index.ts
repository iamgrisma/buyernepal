import { Hono } from "hono";

type Env = {
  DB: D1Database;
  ASSETS: { fetch: (request: Request) => Promise<Response> };
};

const app = new Hono<{ Bindings: Env }>();

// Public API
app.get("/api/settings", async (c) => {
  // Mock settings for now, can be moved to DB later
  return c.json({
    settings: {
      site_title: "BuyerNepal",
      site_description: "Your ultimate shopping destination for the best deals in Nepal.",
    }
  });
});

app.get("/api/categories", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM categories WHERE is_active = 1 ORDER BY name ASC"
  ).all();
  return c.json({ categories: results });
});

app.get("/api/products", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM products WHERE is_active = 1 ORDER BY created_at DESC LIMIT 20"
  ).all();
  return c.json({ products: results });
});

// Categories API
app.get("/api/admin/categories", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM categories ORDER BY id DESC"
  ).all();
  return c.json({ categories: results });
});

app.post("/api/admin/categories", async (c) => {
  const body = await c.req.json();
  const { name, slug, description, parent_id, is_active } = body;
  const { success } = await c.env.DB.prepare(
    "INSERT INTO categories (name, slug, description, parent_id, is_active) VALUES (?, ?, ?, ?, ?)"
  )
    .bind(name, slug, description, parent_id, is_active)
    .run();

  if (!success) return c.json({ error: "Failed to create category" }, 500);
  return c.json({ success: true });
});

app.put("/api/admin/categories/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const { name, slug, description, parent_id, is_active } = body;

  const { success } = await c.env.DB.prepare(
    "UPDATE categories SET name = ?, slug = ?, description = ?, parent_id = ?, is_active = ? WHERE id = ?"
  )
    .bind(name, slug, description, parent_id, is_active, id)
    .run();

  if (!success) return c.json({ error: "Failed to update category" }, 500);
  return c.json({ success: true });
});

app.delete("/api/admin/categories/:id", async (c) => {
  const id = c.req.param("id");
  const { success } = await c.env.DB.prepare(
    "DELETE FROM categories WHERE id = ?"
  )
    .bind(id)
    .run();

  if (!success) return c.json({ error: "Failed to delete category" }, 500);
  return c.json({ success: true });
});

// Products API
app.get("/api/admin/products", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM products ORDER BY id DESC"
  ).all();
  return c.json({ products: results });
});

app.post("/api/admin/products", async (c) => {
  const body = await c.req.json();
  const { name, description, price, image_url, affiliate_url, category_id, is_active } = body;
  const { success } = await c.env.DB.prepare(
    "INSERT INTO products (name, description, price, image_url, affiliate_url, category_id, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)"
  )
    .bind(name, description, price, image_url, affiliate_url, category_id, is_active)
    .run();

  if (!success) return c.json({ error: "Failed to create product" }, 500);
  return c.json({ success: true });
});

app.put("/api/admin/products/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const { name, description, price, image_url, affiliate_url, category_id, is_active } = body;

  const { success } = await c.env.DB.prepare(
    "UPDATE products SET name = ?, description = ?, price = ?, image_url = ?, affiliate_url = ?, category_id = ?, is_active = ? WHERE id = ?"
  )
    .bind(name, description, price, image_url, affiliate_url, category_id, is_active, id)
    .run();

  if (!success) return c.json({ error: "Failed to update product" }, 500);
  return c.json({ success: true });
});

app.delete("/api/admin/products/:id", async (c) => {
  const id = c.req.param("id");
  const { success } = await c.env.DB.prepare(
    "DELETE FROM products WHERE id = ?"
  )
    .bind(id)
    .run();

  if (!success) return c.json({ error: "Failed to delete product" }, 500);
  return c.json({ success: true });
});

// SPA fallback for non-API routes
app.get("*", async (c) => {
  if (c.req.path.startsWith("/api")) {
    return c.notFound();
  }
  const response = await c.env.ASSETS.fetch(c.req.raw);
  if (response.status === 404) {
    return c.env.ASSETS.fetch(new Request(new URL("/index.html", c.req.url), c.req.raw));
  }
  return response;
});

export default app;
