
export function applySecurityHeaders(response: Response, type: 'api' | 'frontend'): Response {
  const newHeaders = new Headers(response.headers);

  // Common Headers
  newHeaders.set('X-Content-Type-Options', 'nosniff');
  newHeaders.set('X-Frame-Options', 'DENY');
  newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  newHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  if (type === 'api') {
    // API - Strict CSP
    newHeaders.set(
      'Content-Security-Policy',
      "default-src 'none'; style-src https://static.integrations.cloudflare.com 'unsafe-inline'; img-src https://imagedelivery.net; script-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;"
    );
  } else {
    // Frontend - Permissive for React but still secure
    // We need 'unsafe-inline' for scripts because of the way Vite injects scripts in dev,
    // and also for the Custom Scripts feature in the admin panel if it injects inline scripts.
    // 'unsafe-eval' is often needed for dev mode, but for production it should ideally be removed.
    // However, without a build process variable here, we might need to keep it or be less strict.
    // Added 'blob:' to img-src for potential client-side image previews.
    newHeaders.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.integrations.cloudflare.com; style-src 'self' 'unsafe-inline' https://static.integrations.cloudflare.com; img-src 'self' https://imagedelivery.net data: blob:; connect-src 'self' https://imagedelivery.net; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;"
    );
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
