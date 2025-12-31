import { renderHtml } from "./renderHtml";

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Content-Security-Policy":
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; " +
    "style-src 'self' 'unsafe-inline' https://static.integrations.cloudflare.com https://fonts.googleapis.com; " +
    "img-src 'self' https://imagedelivery.net data: blob: https://*.cloudflare.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://cloudflareinsights.com; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "frame-ancestors 'none'; " +
    "upgrade-insecure-requests;"
};

const API_HEADERS = {
  "content-type": "text/html",
  "Cache-Control": "public, max-age=60, s-maxage=60",
  ...SECURITY_HEADERS,
  "Content-Security-Policy": "default-src 'none'; style-src https://static.integrations.cloudflare.com 'unsafe-inline'; img-src https://imagedelivery.net; script-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api")) {
      const stmt = env.DB.prepare("SELECT * FROM comments LIMIT 3");
      const { results } = await stmt.all();

      return new Response(renderHtml(JSON.stringify(results, null, 2)), {
        headers: API_HEADERS,
      });
    }

    // Try to get static asset
    let asset = await env.ASSETS.fetch(request);

    if (asset.status === 404 && request.method === 'GET' && !url.pathname.startsWith("/api")) {
       // Fallback to index.html for SPA
       asset = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
    }

    // Create a new response to attach headers
    const response = new Response(asset.body, asset);

    // Apply security headers
    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  },
} satisfies ExportedHandler<Env>;
