const cacheName = "DefaultCompany-Metaverso-0.1.0";
const contentToCache = [
    "Build/cee3bfd5589651a8b16e2a12b8abe5b3.loader.js",
    "Build/635529715d77e626205860c5cbef91ac.framework.js.unityweb",
    "Build/2b147e9f2544aca0d27dd1def0b55b08.data.unityweb",
    "Build/22ed07e5ef4597adbb2717904a7d1994.wasm.unityweb",
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
