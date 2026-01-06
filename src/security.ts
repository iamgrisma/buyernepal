
export function applySecurityHeaders(response: Response, type: 'api' | 'frontend' = 'frontend'): Response {
  const newHeaders = new Headers(response.headers);

  // Common headers
  newHeaders.set('X-Content-Type-Options', 'nosniff');
  newHeaders.set('X-Frame-Options', 'DENY');
  newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  newHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  if (type === 'api') {
    newHeaders.set(
      'Content-Security-Policy',
      "default-src 'none'; style-src https://static.integrations.cloudflare.com 'unsafe-inline'; img-src https://imagedelivery.net; script-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;"
    );
  } else {
    // Frontend headers
    // Using 'unsafe-inline' for styles and scripts to ensure compatibility with standard React/Vite builds without strict nonce setup.
    // This is a defense-in-depth improvement over having NO headers.
    newHeaders.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://imagedelivery.net; connect-src 'self' https://cloudflareinsights.com; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;"
    );
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
