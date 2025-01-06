'use client'

import { useEffect } from 'react'
import va from '@vercel/analytics'

export function PerformanceMetrics() {
  useEffect(() => {
    const reportWebVitals = ({
      id,
      name,
      label,
      value,
    }: {
      id: string
      name: string
      label: string
      value: number
    }) => {
      va.track(`web-vital`, {
        id,
        name,
        label,
        value,
        timestamp: new Date().toISOString(),
      })
    }

    try {
      if (typeof window !== 'undefined') {
        // Report First Contentful Paint
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            reportWebVitals({
              id: 'fcp',
              name: 'FCP',
              label: 'web-vital',
              value: entry.startTime,
            })
          }
        }).observe({ type: 'paint', buffered: true })

        // Report Largest Contentful Paint
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            reportWebVitals({
              id: 'lcp',
              name: 'LCP',
              label: 'web-vital',
              value: entry.startTime,
            })
          }
        }).observe({ type: 'largest-contentful-paint', buffered: true })

        // Report First Input Delay
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            reportWebVitals({
              id: 'fid',
              name: 'FID',
              label: 'web-vital',
              value: entry.processingStart - entry.startTime,
            })
          }
        }).observe({ type: 'first-input', buffered: true })

        // Report Cumulative Layout Shift
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            reportWebVitals({
              id: 'cls',
              name: 'CLS',
              label: 'web-vital',
              value: entry.value,
            })
          }
        }).observe({ type: 'layout-shift', buffered: true })
      }
    } catch (error) {
      console.error('Failed to report web vitals:', error)
    }
  }, [])

  return null
}
