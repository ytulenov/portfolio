const CACHE_NAME = 'model-cache-v1';

self.addEventListener('fetch', (event) => {
  if (event.request.url === process.env.S3_URL) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        }).catch((error) => {
          console.error('Fetch failed:', error);
          return cachedResponse; // Fallback to cache if network fails
        });

        // Serve from cache immediately, revalidate in background
        return cachedResponse || fetchPromise;
      })
    );
  }
});

// Clean up old caches on activation
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});