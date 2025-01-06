'use client'

import { useEffect, useRef } from 'react'
import { captureError } from '@/lib/error-tracking'

export function ResourceMonitor() {
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const monitorResources = () => {
      // Monitor memory usage
      if ('memory' in performance) {
        const memory = (performance as any).memory
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
          captureError(new Error('High memory usage detected'), {
            metric: 'memory',
            used: memory.usedJSHeapSize,
            total: memory.jsHeapSizeLimit,
          })
        }
      }

      // Monitor long tasks
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            captureError(new Error('Long task detected'), {
              metric: 'long-task',
              duration: entry.duration,
            })
          }
        })
      })

      observer.observe({ entryTypes: ['longtask'] })

      // Monitor network requests
      const networkObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 1000) {
            captureError(new Error('Slow network request detected'), {
              metric: 'network',
              duration: entry.duration,
              name: entry.name,
            })
          }
        })
      })

      networkObserver.observe({ entryTypes: ['resource'] })

      return () => {
        observer.disconnect()
        networkObserver.disconnect()
      }
    }

    intervalRef.current = setInterval(monitorResources, 5000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return null
}
