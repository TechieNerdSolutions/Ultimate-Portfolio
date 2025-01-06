'use client'

import { useEffect } from 'react'
import { captureError } from '@/lib/error-tracking'

export function PerformanceMonitor() {
  useEffect(() => {
    try {
      // Create a PerformanceObserver to monitor LCP
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log('LCP:', lastEntry.startTime)
        
        // Report if LCP is too high
        if (lastEntry.startTime > 2500) {
          captureError(new Error('High LCP detected'), {
            metric: 'LCP',
            value: lastEntry.startTime,
          })
        }
      })

      // Start observing LCP
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Create a PerformanceObserver to monitor FID
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach((entry) => {
          const delay = entry.processingStart - entry.startTime
          console.log('FID:', delay)
          
          // Report if FID is too high
          if (delay > 100) {
            captureError(new Error('High FID detected'), {
              metric: 'FID',
              value: delay,
            })
          }
        })
      })

      // Start observing FID
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Create a PerformanceObserver to monitor CLS
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0
        const entries = entryList.getEntries()
        
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })

        console.log('CLS:', clsValue)
        
        // Report if CLS is too high
        if (clsValue > 0.1) {
          captureError(new Error('High CLS detected'), {
            metric: 'CLS',
            value: clsValue,
          })
        }
      })

      // Start observing CLS
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      // Cleanup
      return () => {
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
      }
    } catch (error) {
      console.error('Failed to initialize performance monitoring:', error)
    }
  }, [])

  return null
}
