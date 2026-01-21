export function applySecurityHeaders(response: Response): Response {
  const newHeaders = new Headers(response.headers);

  // Prevent MIME type sniffing
  newHeaders.set("X-Content-Type-Options", "nosniff");

  // Prevent clickjacking
  newHeaders.set("X-Frame-Options", "DENY");

  // Control referrer information
  newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Enforce HTTPS
  newHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  // Content Security Policy
  // - default-src 'self': Only allow resources from same origin by default
  // - script-src 'self' 'unsafe-inline': Allow local scripts and inline scripts (required for React/Vite)
  // - style-src 'self' 'unsafe-inline': Allow local styles, inline styles, and Google Fonts
  // - font-src 'self': Allow Google Fonts
  // - img-src: Allow local images, data URIs, and Cloudflare Images
  // - connect-src: Allow API calls to self
  newHeaders.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https://imagedelivery.net; " +
    "connect-src 'self'; " +
    "upgrade-insecure-requests"
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
