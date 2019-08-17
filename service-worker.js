/* Service Worker JavaScript File */

/* More info can be found here => https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle */

// The name of the Cache
const cacheName = 'app-cache-v1';


// Array of Assets to Cache; These assets shouldnt change, or if they do, it's infrequent.
const AssetsToCache = [
// './',
// './index.html',
// './app.js'

// './css/bootstrap.min.css'
//    './css/app.css'
];


// The install event is the first event a service worker gets, and it only happens once.
self.addEventListener('install', async function () {
  const cache = await caches.open(cacheName);
  cache.addAll(AssetsToCache);
});


self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});


// Custom function that priotizes fetching using the cache
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || fetch(request);
}

// Custom function that priotizes fetching using the network
async function networkFirst(request) {
  const dynamicCache = await caches.open('news-dynamic');
  try {
    const networkResponse = await fetch(request);
    dynamicCache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    const cachedResponse = await dynamicCache.match(request);
    return cachedResponse || await caches.match('./fallback.json');
  }
}