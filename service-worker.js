/* Rodolfo's Workspace: offline support.
 * The page itself is network-first, so a new version shows up as soon as you're online,
 * and the last copy opens when you're offline. Everything else (libraries, icons, fonts)
 * is served from the cache and refreshed in the background.
 * build-pages.py bumps VERSION on every build so old caches get cleared.
 */
const VERSION = "ws-20261006-042001";
const CACHE = "workspace-" + VERSION;
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./lib/react.production.min.js",
  "./lib/react-dom.production.min.js",
  "./lib/htm.umd.js",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("workspace-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!sameOrigin && !isFont) return;

  // The page: try the network first so updates arrive, fall back to the cached copy offline.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)); return res; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Everything else: cached copy right away, refreshed in the background.
  event.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(req).then(cached => {
        const network = fetch(req)
          .then(res => { if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone()); return res; })
          .catch(() => cached);
        return cached || network;
      })
    )
  );
});
