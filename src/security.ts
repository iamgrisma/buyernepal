export function applySecurityHeaders(response: Response, isApi: boolean = false): Response {
  // Clone the response to modify headers
  const newResponse = new Response(response.body, response);

  // Common security headers
  newResponse.headers.set("X-Content-Type-Options", "nosniff");
  newResponse.headers.set("X-Frame-Options", "DENY");
  newResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  newResponse.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  // Content Security Policy
  let csp = "";

  if (isApi) {
    // Strict CSP for API responses (server-rendered HTML)
    csp = [
      "default-src 'none'",
      "style-src https://static.integrations.cloudflare.com 'unsafe-inline'",
      "img-src https://imagedelivery.net",
      "script-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join("; ");
  } else {
    // Application CSP (React App)
    // We allow 'unsafe-inline' and 'https:' for scripts/styles to support:
    // 1. The "Custom Scripts" admin feature (allows injecting arbitrary JS/CSS).
    // 2. External product images (affiliate links).
    // 3. Analytics or other 3rd party tools users might add.
    // While less strict, it still enforces HTTPS and prevents mixed content.
    csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https:",
      "style-src 'self' 'unsafe-inline' https:",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https: data:",
      "connect-src 'self' https:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join("; ");
  }

  newResponse.headers.set("Content-Security-Policy", csp);

  return newResponse;
}
