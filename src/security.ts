export function applySecurityHeaders(response: Response, type: 'api' | 'frontend' = 'frontend'): Response {
  const newHeaders = new Headers(response.headers);

  // Common headers
  newHeaders.set('X-Frame-Options', 'DENY');
  newHeaders.set('X-Content-Type-Options', 'nosniff');
  newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  newHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  newHeaders.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // CSP
  if (type === 'api') {
     newHeaders.set('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests;");
  } else {
     // Frontend CSP
     // Note: 'unsafe-inline' for scripts is currently allowed to support Vite/React hydration and inline scripts.
     // 'unsafe-eval' is allowed for development/fast-refresh support, but should ideally be removed in strict production.
     newHeaders.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://imagedelivery.net; connect-src 'self'; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
