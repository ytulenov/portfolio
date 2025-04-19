const CACHE_NAME = 'model-cache-v1';
//const MODEL_URL = '/nvidia.glb'; // Hardcoded URL
const MODEL_URL = "https://yerkin-3d-models.s3.us-east-1.amazonaws.com/nvidia.glb"


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