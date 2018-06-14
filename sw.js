const CACHE_NAME = "my-site-cache-v2";
const urlsToCache = [
  "/",
  "src/css/styles.css",
  "src/js/main.js",
  "src/js/restaurant_info.js",
  "src/js/dbhelper.js",
  "/dist/img/1.jpg",
  "/dist/img/2.jpg",
  "/dist/img/3.jpg",
  "/dist/img/4.jpg",
  "/dist/img/5.jpg",
  "/dist/img/6.jpg",
  "/dist/img/7.jpg",
  "/dist/img/8.jpg",
  "/dist/img/9.jpg",
  "/dist/img/10.jpg"
];

self.addEventListener("install", function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }

      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(function(response) {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
