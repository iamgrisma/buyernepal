
export const SECURITY_HEADERS = {
  // Content Security Policy
  "Content-Security-Policy": "default-src 'none'; connect-src 'self'; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; script-src 'self'; style-src 'self' 'unsafe-inline' https://static.integrations.cloudflare.com https://fonts.googleapis.com; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;",

  // Prevent MIME type sniffing
  "X-Content-Type-Options": "nosniff",

  // Prevent clickjacking
  "X-Frame-Options": "DENY",

  // Referrer Policy
  "Referrer-Policy": "strict-origin-when-cross-origin",

  // HTTP Strict Transport Security (HSTS)
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",

  // Permissions Policy
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export function applySecurityHeaders(response: Response): Response {
  const newHeaders = new Headers(response.headers);

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    newHeaders.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
