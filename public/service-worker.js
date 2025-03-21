const CACHE_NAME = 'model-cache-v1';

self.addEventListener('fetch', (event) => {
  if (event.request.url === process.env.S3_URL) {
      event.respondWith(
          caches.match(event.request).then((response) => {
              return response || fetch(event.request).then((networkResponse) => {
                  caches.open(CACHE_NAME).then((cache) => {
                      cache.put(event.request, networkResponse.clone());
                  });
                  return networkResponse;
              });
          })
      );
  }
});