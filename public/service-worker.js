const CACHE_NAME = 'model-cache-v1';
const MODEL_URL = process.env.NODE_ENV === 'production'
  ? process.env.NEXT_PUBLIC_S3_URL
  : '/nvidia.glb';

self.addEventListener('fetch', (event) => {
  if (event.request.url === MODEL_URL) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        }).catch((error) => {
          console.error('Fetch failed:', error);
          return cachedResponse; 
        });
        
        return cachedResponse || fetchPromise;
      })
    );
  }
});

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