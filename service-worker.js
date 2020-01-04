importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) console.log("Load workbox success");
else console.log("Load workbox failed");

workbox.precaching.precacheAndRoute([
  { url: "/", revision: "1" },
  { url: "/index.html", revision: "1" },
  { url: "/nav.html", revision: "1" },
  { url: "/manifest.json", revision: "1" },
  { url: "/css/materialize.min.css", revision: "1" },
  { url: "/css/style.css", revision: "1" },
  { url: "/js/api.js", revision: "1" },
  { url: "/js/idb.js", revision: "1" },
  { url: "/js/main.js", revision: "1" },
  { url: "/js/materialize.min.js", revision: "1" },
  { url: "/js/nav.js", revision: "1" },
  { url: "/js/script.js", revision: "1" },
  { url: "/img/icon.png", revision: "1" },
  { url: "/icon144x144.png", revision: "1" },
  { url: "/icon192x192.png", revision: "1" },
  { url: "/icon512x512.png", revision: "1" }
]);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages"
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org\/v2\/competitions\/2021\/standings/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "standings"
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org\/v2\/competitions\/2021\/scorers/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "scorers"
  })
);

// const CACHE_NAME = "fnleague-v22";
// var urlsToCache = [
//   "/",
//   "/index.html",
//   "/nav.html",
//   "/pages/myteam.html",
//   "/pages/standings.html",
//   "/pages/stats.html",
//   "/css/materialize.min.css",
//   "/css/style.css",
//   "/js/api.js",
//   "/js/materialize.min.js",
//   "/js/nav.js",
//   "/js/idb.js",
//   "/js/script.js",
//   "/js/main.js",
//   "/manifest.json",
//   "/icon512x512.png",
//   "/icon192x192.png",
//   "/icon144x144.png",
//   "/img/icon.png"
// ];

// self.addEventListener("install", function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("fetch", function(event) {
//   const base_url = [
//     "http://api.football-data.org/v2/competitions/2021/standings",
//     "http://api.football-data.org/v2/competitions/2021/scorers"
//   ];
//   // var standings_url =
//   //   "http://api.football-data.org/v2/competitions/2021/standings";

//   // var scorers_url = "http://api.football-data.org/v2/competitions/2021/scorers";

//   if (
//     event.request.url.indexOf(base_url[0]) > -1 ||
//     event.request.url.indexOf(base_url[1]) > -1
//   ) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function(cache) {
//         return fetch(event.request).then(function(response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         });
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request).then(function(response) {
//         return response || fetch(event.request);
//       })
//     );
//   }
// });

// self.addEventListener("activate", function(event) {
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cacheName) {
//           if (cacheName != CACHE_NAME) {
//             console.log("ServiceWorker: cache " + cacheName + " dihapus");
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener("push", function(event) {
//   var body;
//   if (event.data) {
//     body = event.data.text();
//   } else {
//     body = "Push message no payload";
//   }

//   var options = {
//     body: body,
//     icon: "img/notification.png",
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: 1
//     }
//   };

//   event.waitUntil(
//     self.registration.showNotification("Push Notification", options)
//   );
// });
