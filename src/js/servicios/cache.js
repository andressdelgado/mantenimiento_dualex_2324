self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('dualex').then((cache) => cache.addAll([
      '/dualex/index.html',
      '/dualex/css/estilos.css',
      '/dualex/css/reset.css',
      '/dualex/js/dualex.js',
      '/dualex/js/modelos/modelo.js',
      '/dualex/iconos/logout.svg'
    ]))
  )
})

self.addEventListener('fetch', (e) => {
  console.log(e.request.url)
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  )
})
