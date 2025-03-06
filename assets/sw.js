const CACHE_NAME = 'pwa-cache-v1';
const CACHE_ASSETS = [
    '/g/',
    '/g/index.html',
    '/g/style.css',
    '/g/script.js',
    '/g/assets/icons/icon-144x144.png',
    '/g/assets/manifest.json'
];

// Instalacja Service Workera
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(CACHE_ASSETS);
        })
    );
});

// Aktywacja i czyszczenie starego cache
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Obsługa fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((fetchResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        }).catch(() => caches.match('/g/index.html')) // Jeśli offline, zwróć stronę główną
    );
});