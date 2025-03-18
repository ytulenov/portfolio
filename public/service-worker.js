const CACHE_NAME = 'model-cache-v1';

self.addEventListener('fetch', (event) => {
  if (event.request.url === 'https://yerkin-3d-models.s3.us-east-1.amazonaws.com/nvidia.glb') {
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