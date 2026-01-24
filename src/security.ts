export function applySecurityHeaders(response: Response, type: 'api' | 'frontend'): Response {
  const newHeaders = new Headers(response.headers);

  // Common Headers
  newHeaders.set('X-Content-Type-Options', 'nosniff');
  newHeaders.set('X-Frame-Options', 'DENY');
  newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  newHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // CSP
  if (type === 'api') {
    newHeaders.set(
      'Content-Security-Policy',
      "default-src 'none'; style-src https://static.integrations.cloudflare.com 'unsafe-inline'; img-src https://imagedelivery.net; script-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;"
    );
  } else {
    // Frontend CSP
    // Allowing unsafe-inline/eval for scripts is often necessary for Vite/React hydration and dev tools.
    // Ideally we would use nonces, but that requires more complex setup.
    newHeaders.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://imagedelivery.net data:; connect-src 'self'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;"
    );
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
