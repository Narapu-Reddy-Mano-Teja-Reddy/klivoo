/* eslint-disable no-undef */
// Lightweight service worker for Web Push notifications.
// Handles incoming push events and notification click behavior.

const DEFAULT_ICON = '/logo.png'

self.addEventListener('push', (event) => {
  let payload = {}

  try {
    payload = event.data ? event.data.json() : {}
  } catch (err) {
    // Ignore malformed payloads; fall back to a generic message.
    payload = {}
  }

  const title = payload.title || 'Clienter'
  const body = payload.body || 'You have a new notification.'
  const data = payload.data || {}
  const tag = payload.tag
  const url = payload.url || data.url

  const options = {
    body,
    tag,
    data: { ...data, url },
    icon: payload.icon || DEFAULT_ICON,
    badge: payload.badge || DEFAULT_ICON,
    timestamp: payload.timestamp || Date.now(),
    renotify: true,
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  const { notification } = event
  const url = notification.data && notification.data.url

  notification.close()

  if (!url) {
    return
  }

  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true })
      const normalized = new URL(url, self.location.origin).href

      for (const client of allClients) {
        if (client.url === normalized && 'focus' in client) {
          await client.focus()
          return
        }
      }

      if (clients.openWindow) {
        await clients.openWindow(normalized)
      }
    })()
  )
})
