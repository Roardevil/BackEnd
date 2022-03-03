var cacheName='WebStore';
var cacheFiles=[
    'index.html',
    'index.js',
    'service-worker.js',
    'webstore.webmanifest',
    'style.css',
    'logo192.png',
    'logo521.png'


    
];

self.addEventListener('install',(e) =>{
    console.log(['service worker] install']);
    e.waitUntil(
        caches.open(cacheName).then((cache) =>{
            console.log('[service worker] caching files.');
            return cache.addAll(cacheFiles);
        })
    )
});

self.addEventListener('fetch', function (e) {

    e. respondWith(
    
    caches.match(e.request) .then (function (r) {
    
    // Download the file if it is not in the cache,
    
    return r || fetch(e.request).then(function (response) { // add the new file to cache
    
    return caches.open(cacheName).then(function (cache) { cache.put (e. request, response. clone());
    
    return response;
    
    });
    
    });
    
    })
    
    );
    
    });