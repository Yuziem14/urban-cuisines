const VERSION = 1;
const STATIC_CACHE_NAME = `uc-cache-v${VERSION}`;

const urlsToCache = [
  '/offline.html',
  '/styles/offline.css',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/going_offline.svg',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Poppins:wght@400;700&display=swap',
  'https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gTD_u50.woff2',
  'https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3g3D_u50.woff2',
  'https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gbD_u50.woff2',
  'https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gfD_u50.woff2',
  'https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gnD_g.woff2',
  'https://fonts.gstatic.com/s/poppins/v12/pxiEyp8kv8JHgFVrJJbecmNE.woff2',
  'https://fonts.gstatic.com/s/poppins/v12/pxiEyp8kv8JHgFVrJJnecmNE.woff2',
  'https://fonts.gstatic.com/s/poppins/v12/pxiEyp8kv8JHgFVrJJfecg.woff2',
  'https://fonts.gstatic.com/s/poppins/v12/pxiByp8kv8JHgFVrLCz7Z11lFc-K.woff2',
  'https://fonts.gstatic.com/s/poppins/v12/pxiByp8kv8JHgFVrLCz7Z1JlFc-K.woff2',
  'https://fonts.gstatic.com/s/poppins/v12/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      console.log('Cache opened');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  const cachesAllowList = [STATIC_CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cachesAllowList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(err => {
        return caches.open(STATIC_CACHE_NAME).then(cache => {
          return cache.match('/offline.html');
        });
      })
  );
});
