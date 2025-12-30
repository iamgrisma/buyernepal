import { renderHtml } from "./renderHtml";

export default {
  async fetch(request, env) {
    const stmt = env.DB.prepare("SELECT * FROM comments LIMIT 3");
    const { results } = await stmt.all();

    return new Response(renderHtml(JSON.stringify(results, null, 2)), {
      headers: {
        "content-type": "text/html",
        "Cache-Control": "public, max-age=60, s-maxage=60",
        "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline' https://static.integrations.cloudflare.com; img-src https://imagedelivery.net; script-src 'self' 'unsafe-inline'; frame-ancestors https://dash.cloudflare.com; upgrade-insecure-requests;",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "X-Content-Type-Options": "nosniff",
      },
    });
  },
} satisfies ExportedHandler<Cloudflare.Env>;
