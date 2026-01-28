import { renderHtml } from "./renderHtml";
import { applySecurityHeaders } from "./security";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api")) {
      const stmt = env.DB.prepare("SELECT * FROM comments LIMIT 3");
      const { results } = await stmt.all();

      const response = new Response(renderHtml(JSON.stringify(results, null, 2)), {
        headers: {
          "content-type": "text/html",
          "Cache-Control": "public, max-age=60, s-maxage=60",
        },
      });
      return applySecurityHeaders(response);
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
