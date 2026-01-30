import { renderHtml } from "./renderHtml";
import { applySecurityHeaders } from "./security";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api")) {
      const stmt = env.DB.prepare("SELECT * FROM comments LIMIT 3");
      const { results } = await stmt.all();

      return new Response(renderHtml(JSON.stringify(results, null, 2)), {
        headers: {
          "content-type": "text/html",
          "Cache-Control": "public, max-age=60, s-maxage=60",
          "Content-Security-Policy": "default-src 'none'; style-src https://static.integrations.cloudflare.com 'unsafe-inline'; img-src https://imagedelivery.net; script-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        },
      });
    }

    // Try to get static asset
    let asset = await env.ASSETS.fetch(request);

    if (asset.status === 404 && request.method === 'GET' && !url.pathname.startsWith("/api")) {
       // Fallback to index.html for SPA
       asset = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
    }

    return applySecurityHeaders(asset);
  },
} satisfies ExportedHandler<Env>;
