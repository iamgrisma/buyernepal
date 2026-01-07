export function applySecurityHeaders(response: Response, type: 'api' | 'frontend' = 'frontend'): Response {
  const newHeaders = new Headers(response.headers);

  // Common Headers
  newHeaders.set('X-Content-Type-Options', 'nosniff');
  newHeaders.set('X-Frame-Options', 'DENY');
  newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  newHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // CSP
  if (type === 'api') {
    // Strict for API - no scripts, no styles (except specific), no images (except specific)
    newHeaders.set(
      'Content-Security-Policy',
      "default-src 'none'; style-src https://static.integrations.cloudflare.com 'unsafe-inline'; img-src https://imagedelivery.net; script-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;"
    );
  } else {
    // Permissive for Frontend (React + Vite)
    // Allows 'unsafe-inline' for scripts/styles as required by current architecture (and likely Vite dev/custom scripts)
    // Allows images from self, data, and imagedelivery.net
    newHeaders.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://static.integrations.cloudflare.com; img-src 'self' data: https://imagedelivery.net; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;"
    );
  }

  // Re-create the response with new headers
  // Note: We must create a new Response object to modify headers of an immutable response (like from env.ASSETS)
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
