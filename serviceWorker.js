// const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
  "/",
  "/pwa/index.html",
  "/pwa/src/master.css",
  "/pwa/src/PWA.js",
  "/pwa/images/logo.png"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open("static").then(cache => {
     return cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})

