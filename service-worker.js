if ('serviceWorker' in navigator) {
    // Register a service worker hosted at the root of the
    // site using the default scope.
    navigator.serviceWorker.register('/service-worker.js').then(function
        (registration) {
        console.log('Service worker registration succeeded:', registration);
    }, /*catch*/ function (error) {
        console.log('Service worker registration failed:',
            error);
    });
} else {
    console.log('Service workers are not supported.');
}

window.addEventListener('load', () => {
    if (!('serviceWorker' in navigator)) {
        return
    }
    navigator.serviceWorker.register('/service-worker.js').then(
        () => {
            // registered!
        },
        err => {
            console.error('SW registration failed!, err)
    }
    )
})

self.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open('index')
            .then(cache =>
                cache.addAll([
                    'cars.png',
                    'styles.css'
                ])
            )
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                //we found an entry in the cache!
                return response
            }
            return fetch(event.request)
        })
    )
})