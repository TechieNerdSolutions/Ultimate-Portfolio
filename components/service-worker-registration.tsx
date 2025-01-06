'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox

      // Add event listeners
      wb.addEventListener('installed', (event: any) => {
        console.log(`Service Worker installed: ${event.type}`)
      })

      wb.addEventListener('controlling', (event: any) => {
        console.log(`Service Worker controlling: ${event.type}`)
      })

      wb.addEventListener('activated', (event: any) => {
        console.log(`Service Worker activated: ${event.type}`)
      })

      // Register the service worker
      wb.register()
    }
  }, [])

  return null
}
