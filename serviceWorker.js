// const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
  "/",
  "/index.html",
  "/src/master.css",
  "/src/PWA.js",
  "/images/logo.png"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open("static").then(cache => {
      console.log("cached")
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

