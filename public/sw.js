const VERSION = 'v2'
const IMG_CACHE = `fjw-img-${VERSION}`
const MAX_IMG_ENTRIES = 400

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(
        keys
          .filter((key) => key.startsWith('fjw-img-') && key !== IMG_CACHE)
          .map((key) => caches.delete(key))
      )
      await self.clients.claim()
    })()
  )
})

async function enforceLimit(cacheName, maxEntries = MAX_IMG_ENTRIES) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()
  if (keys.length > maxEntries) {
    const toDelete = keys.length - maxEntries
    for (let i = 0; i < toDelete; i++) {
      await cache.delete(keys[i])
    }
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request
  const url = new URL(req.url)

  if (req.method !== 'GET') return

  const isImageRequest = req.destination === 'image' || /(png|jpg|jpeg|webp|avif|gif|svg)$/i.test(url.pathname)

  if (isImageRequest) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(IMG_CACHE)
        const cached = await cache.match(req)
        if (cached) {
          event.waitUntil(
            (async () => {
              try {
                const fresh = await fetch(req, { cache: 'no-cache' })
                if (fresh && (fresh.ok || fresh.type === 'opaque')) {
                  await cache.put(req, fresh.clone())
                  await enforceLimit(IMG_CACHE)
                }
              } catch (_) {
                // swallow errors
              }
            })()
          )
          return cached
        }

        try {
          const resp = await fetch(req)
          if (resp && (resp.ok || resp.type === 'opaque')) {
            await cache.put(req, resp.clone())
            await enforceLimit(IMG_CACHE)
          }
          return resp
        } catch (_) {
          // Network failed and no cache, just fail through
          return new Response('', { status: 504, statusText: 'Gateway Timeout' })
        }
      })()
    )
  }
})
