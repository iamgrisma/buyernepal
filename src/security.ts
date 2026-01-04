
export function applySecurityHeaders(response: Response, isApi: boolean = false): Response {
  const newHeaders = new Headers(response.headers);

  let csp: string;

  if (isApi) {
    // Strict CSP for API responses (no scripts) matching original strictness
    csp = [
      "default-src 'none'",
      "style-src https://static.integrations.cloudflare.com 'unsafe-inline'",
      "img-src https://imagedelivery.net",
      "script-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join("; ");
  } else {
    // Standard CSP for React Application
    csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'", // 'unsafe-inline' required for React/Vite
      "style-src 'self' 'unsafe-inline' https://static.integrations.cloudflare.com",
      "img-src 'self' data: https://imagedelivery.net",
      "connect-src 'self'",
      "font-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join("; ");
  }

  newHeaders.set("Content-Security-Policy", csp);
  newHeaders.set("X-Content-Type-Options", "nosniff");
  newHeaders.set("X-Frame-Options", "DENY");
  newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
  newHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
