self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/css/style.css',
          '/js/main.js',
          '/css/icon1.png',
          '/css/icon2.png',
          '/css/icon5.png',
          '/css/icon6.png',
          '/css/icon7.png',
          '/css/ka.jpg',
          '/css/bg.jpg'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
      // caches.match() always resolves
      // but in case of success response will have value
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function (response) {
          // response may be used only once
          // we need to save clone to put one copy in cache
          // and serve second one
          let responseClone = response.clone();
          
          caches.open('v1').then(function (cache) {
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
  