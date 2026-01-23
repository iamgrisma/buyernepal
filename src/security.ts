export function applySecurityHeaders(response: Response, type: 'api' | 'frontend'): Response {
  const newHeaders = new Headers(response.headers);

  // Common Security Headers
  newHeaders.set('X-Content-Type-Options', 'nosniff');
  newHeaders.set('X-Frame-Options', 'DENY');
  newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  newHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // Content-Security-Policy
  let csp = '';

  if (type === 'api') {
    // Strict API policy (matches previous hardcoded values)
    csp = "default-src 'none'; " +
          "style-src https://static.integrations.cloudflare.com 'unsafe-inline'; " +
          "img-src https://imagedelivery.net; " +
          "script-src 'none'; " +
          "base-uri 'self'; " +
          "form-action 'self'; " +
          "frame-ancestors 'none'; " +
          "upgrade-insecure-requests;";
  } else {
    // Frontend policy
    csp = "default-src 'self'; " +
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com; " +
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
          "font-src 'self' https://fonts.gstatic.com; " +
          "img-src 'self' data: https://imagedelivery.net; " +
          "connect-src 'self' https://cloudflareinsights.com; " +
          "base-uri 'self'; " +
          "form-action 'self'; " +
          "upgrade-insecure-requests;";
  }

  newHeaders.set('Content-Security-Policy', csp);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}
