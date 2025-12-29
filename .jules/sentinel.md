## 2024-04-18 - Missing Security Headers
**Vulnerability:** The application was missing standard security headers (Content-Security-Policy, X-Frame-Options, etc.), making it vulnerable to clickjacking, MIME sniffing, and cross-site scripting attacks.
**Learning:** Even simple server-side rendering endpoints need defense-in-depth security headers to protect users. Default Worker configurations do not include these.
**Prevention:** Always verify and add a comprehensive set of security headers to all HTTP responses, regardless of the content type.
