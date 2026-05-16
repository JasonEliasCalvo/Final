const cacheName = "DefaultCompany-Metaverso-0.1.0";
const contentToCache = [
    "Build/cee3bfd5589651a8b16e2a12b8abe5b3.loader.js",
    "Build/f307ce38543613e21aed208b04a435c3.framework.js.unityweb",
    "Build/ef3d40a92dbd35f6861b79c1e89984d6.data.unityweb",
    "Build/2931a53a168bf54b29e8966514cc3f81.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
