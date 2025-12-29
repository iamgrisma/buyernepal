import { renderHtml } from "./renderHtml";

export default {
  async fetch(request, env) {
    const stmt = env.DB.prepare("SELECT * FROM comments LIMIT 3");
    const { results } = await stmt.all();

    return new Response(renderHtml(JSON.stringify(results, null, 2)), {
      headers: {
        "content-type": "text/html",
        "Cache-Control": "public, max-age=60, s-maxage=60",
        "Content-Security-Policy": "default-src 'self'; style-src 'self' https://static.integrations.cloudflare.com; img-src 'self' https://imagedelivery.net; frame-ancestors 'self' https://dash.cloudflare.com https://*.cloudflare.com",
        "X-Content-Type-Options": "nosniff",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    });
  },
} satisfies ExportedHandler<Env>;
