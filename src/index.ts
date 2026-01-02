import { renderHtml } from "./renderHtml";
import { applySecurityHeaders, SECURITY_HEADERS } from "./security";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api")) {
      const stmt = env.DB.prepare("SELECT * FROM comments LIMIT 3");
      const { results } = await stmt.all();

      // For API responses (currently returning HTML), we can use the common security headers
      // but override if we want stricter CSP for this specific endpoint.
      // However, for simplicity and consistency, let's start with the common headers
      // and ensure content-type is set.

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
