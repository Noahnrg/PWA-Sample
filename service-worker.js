/* Service Worker JavaScript File */

/* Cache names */
const cacheName = 'app-cache-v1';
const cacheNameForExternalJS = 'app-import-cache-v1';

// Array of Assets to Cache; These assets shouldnt change, or if they do, it's infrequent.
const AssetsToCache = [
  // './',
  // './index.html',
  // './app.js'

  // './css/bootstrap.min.css'
  //    './css/app.css'
];


// The install event is the first event a service worker gets; Happens only once.
self.addEventListener('install', async function () {
  const cache = await caches.open(cacheName);
  cache.addAll(AssetsToCache);
});


self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  // TODO: Clear other cache
});


self.addEventListener('fetch', event => {
  const request = event.request;
  event.respondWith(fetch(request));
  return;

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


// Get a 
//Production cache everything except a checker
// If checker says diff, reload neccasary
// No change -> pull from cache everything
// Network only for backendless data

//testing -> get everything from network


// index
// app.js
// app.css
// sw.js
// manifest