/**
 * @fileoverview Description of this file.
 */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('notes').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/index.css',
        '/main.js',
        '/0.js',
        '/1.js'
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('notes')
    .then(cache => cache.match(event.request, {
      ignoreSearch: true
    }))
    .then(response => {
      return response || fetch(event.request);
    })
  );
});
