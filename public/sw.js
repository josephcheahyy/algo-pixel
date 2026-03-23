/**
 * Security Service Worker — Algo Pixel Empire
 *
 * GitHub Pages cannot set HTTP response headers server-side.
 * This SW intercepts every outgoing navigation/fetch, receives the response,
 * and reconstructs it with a full set of security headers before the browser
 * renders anything.
 *
 * Browser support: All modern browsers (Chrome 40+, Firefox 44+, Safari 11.1+)
 * Scope: /algo-pixel/ (set by the registration call in index.html)
 */

const CACHE_NAME = 'algo-pixel-v1';

// ─── Security Headers ───────────────────────────────────────────────────────
// Applied to every HTML document navigation.
// Script/style hashes are not pre-calculated since Vite generates content-
// addressed filenames; 'self' covers all same-origin assets safely.
const SECURITY_HEADERS = {
  // Prevent MIME-type sniffing (e.g. serving a .jpg that contains a script)
  'X-Content-Type-Options': 'nosniff',

  // Block this page from being embedded in <iframe> on any other domain
  // (prevents clickjacking attacks)
  'X-Frame-Options': 'DENY',

  // Enable browser's XSS auditor (legacy browsers; modern browsers use CSP)
  'X-XSS-Protection': '1; mode=block',

  // Don't send full URL in Referer header when navigating to external sites
  'Referrer-Policy': 'no-referrer-when-downgrade',

  // Strict browser feature policy: deny unused APIs
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()',
    'usb=()',
    'bluetooth=()',
    'accelerometer=()',
    'gyroscope=()',
    'magnetometer=()',
  ].join(', '),

  // Content Security Policy
  // - default-src 'self'          → only load resources from same origin
  // - script-src 'self' 'unsafe-inline' → Vite inlines a small bootstrap
  // - style-src 'self' 'unsafe-inline'  → Tailwind/motion use inline styles
  // - img-src 'self' data:         → gallery images + base64 thumbnails
  // - font-src 'self'              → no external Google Fonts CDN used
  // - connect-src 'self'           → no API calls from frontend
  // - frame-src 'none'             → no iframes
  // - object-src 'none'            → block Flash/Java plugins
  // - base-uri 'self'              → prevent base tag injection
  // - form-action 'self'           → prevent form hijacking (no forms here)
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
};

// ─── Install ─────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  // Take control immediately without waiting for old SW to expire
  self.skipWaiting();
});

// ─── Activate ────────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Claim all open clients immediately
      self.clients.claim(),
      // Clean up old caches from previous SW versions
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      ),
    ])
  );
});

// ─── Fetch interception ───────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only intercept same-origin requests
  if (url.origin !== self.location.origin) return;

  // Only inject headers on HTML document navigations (not API calls, images, etc.)
  const isNavigation = request.mode === 'navigate';

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Only mutate HTML responses for navigation requests
        if (!isNavigation || !response.ok) return response;

        // Reconstruct the response with security headers appended
        const newHeaders = new Headers(response.headers);
        for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
          newHeaders.set(key, value);
        }

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        });
      })
      .catch(() => {
        // Offline fallback: serve cached index.html if available
        return caches.match('/algo-pixel/') || caches.match('/algo-pixel/index.html');
      })
  );
});
