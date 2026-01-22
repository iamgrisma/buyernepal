
export function applySecurityHeaders(response: Response, type: 'api' | 'frontend'): Response {
  const newHeaders = new Headers(response.headers);

  // Common Headers
  newHeaders.set('X-Content-Type-Options', 'nosniff');
  newHeaders.set('X-Frame-Options', 'DENY');
  newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  newHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // Content Security Policy
  let csp = '';
  if (type === 'frontend') {
    csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'", // Needed for React/Vite
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://static.integrations.cloudflare.com",
      "img-src 'self' https://imagedelivery.net data:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://imagedelivery.net",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests"
    ].join('; ');
  } else {
    // API - very strict
    csp = [
      "default-src 'none'",
      "style-src https://static.integrations.cloudflare.com 'unsafe-inline'", // Keeping existing config for the /api HTML page
      "img-src https://imagedelivery.net",
      "script-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join('; ');
  }

  newHeaders.set('Content-Security-Policy', csp);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}
