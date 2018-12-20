var __version__ = 'v1.0.5';
var __CACHED_URLS__ = [
  '/',
  '/css/style.css',
  '/js/main.js',
  '/css/icon1.png',
  '/css/icon2.png',
  '/css/icon5.png',
  '/css/icon6.png',
  '/css/icon7.png',
  '/css/ka.jpg',
  '/css/bg.jpg'
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
          if(key !== __version__){
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
            if(event.request.method === 'GET'){
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
  
