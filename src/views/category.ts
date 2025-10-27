import { Context } from 'hono';
import { AppEnv } from '../index'; // Adjust path
import { renderHtmlPage, renderErrorPage } from './html'; // Import layout helpers

// Placeholder for generating a category page HTML
export const renderCategoryPage = async (c: Context<AppEnv>) => {
    const slug = c.req.param('slug');
     if (!slug) {
        return c.html(renderErrorPage("Category slug missing", 400), 400);
    }

     try {
        // In a real implementation, you would:
        // 1. Fetch category details and list of products in that category (with pagination) from D1
        const category = await c.env.DB.prepare("SELECT id, name, description FROM categories WHERE slug = ?1").bind(slug).first();

        if (!category) {
             return c.html(renderErrorPage(`Category "${slug}" not found`, 404), 404);
        }

         // Fetch some products (simplified)
         const productsResult = await c.env.DB.prepare(
            "SELECT name, slug, image_url FROM products WHERE category_id = ?1 AND status = 'active' LIMIT 10"
        ).bind(category.id).all();
         const products = productsResult.results ?? [];

        // 2. Format data into HTML (breadcrumbs, category info, product grid)
         let productsHtml = '<p>No products found in this category.</p>';
         if (products.length > 0) {
            productsHtml = '<ul>';
            products.forEach((prod: any) => {
                productsHtml += `<li><a href="/p/${prod.slug}">${prod.name}</a></li>`; // Assuming /p/:slug route exists
            });
            productsHtml += '</ul>';
         }

        const bodyContent = `
            <p>${category.description || ''}</p>
            <h3>Products:</h3>
            ${productsHtml}
            
        `;

        const html = renderHtmlPage(category.name as string, bodyContent);
        return c.html(html);
     } catch (e: any) {
        console.error(`Error rendering category page ${slug}:`, e);
        return c.html(renderErrorPage("Failed to load category details.", 500), 500);
    }
};
