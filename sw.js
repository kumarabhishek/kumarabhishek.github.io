var __version__ = 'v2.0.1';
var __CACHED_URLS__ = [
  '/',
  '/css/style.css',
  '/js/main.js',
  '/css/ka.png',
  '/favicon.ico',
];

  self.addEventListener('install', function(event) {
    self.skipWaiting();
    event.waitUntil(
      caches.open(__version__).then(function(cache) {
        return cache.addAll(__CACHED_URLS__);
      })
    );
  });

  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if(__version__.indexOf(key) === -1){
            caches.delete(key);
          }
        }));
      })
    );
  });

  
  self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function (response) {
          let responseClone = response.clone();
          
          caches.open(__version__).then(function (cache) {
            if(event.request.method === 'GET' && !event.request.url.match(/google/)){
              cache.put(event.request, responseClone);
            }
          });
          return response;
        }).catch(function () {
          return caches.match('/');
        });
      }
    }));
  });
  
