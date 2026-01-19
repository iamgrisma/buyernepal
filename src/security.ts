export function applySecurityHeaders(response: Response, type: 'api' | 'frontend'): Response {
  const newHeaders = new Headers(response.headers);

  // Common security headers
  newHeaders.set("X-Content-Type-Options", "nosniff");
  newHeaders.set("X-Frame-Options", "DENY");
  newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
  newHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  if (type === 'api') {
    // Strict CSP for API/Backend responses
    newHeaders.set(
      "Content-Security-Policy",
      "default-src 'none'; style-src https://static.integrations.cloudflare.com 'unsafe-inline'; img-src https://imagedelivery.net; script-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;"
    );
  } else {
    // Permissive CSP for React Frontend (needs 'unsafe-inline' for some styles/scripts in typical Vite/React setups without nonces)
    newHeaders.set(
      "Content-Security-Policy",
      "default-src 'self'; connect-src 'self'; img-src 'self' https://imagedelivery.net data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;"
    );
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
