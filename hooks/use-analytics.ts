'use client'

import va from '@vercel/analytics'

interface EventOptions {
  category?: string
  label?: string
  value?: number
}

export function useAnalytics() {
  const trackEvent = (
    action: string,
    options: EventOptions = {}
  ) => {
    va.track(action, {
      ...options,
      timestamp: new Date().toISOString(),
    })
  }

  const trackPageView = (url: string) => {
    va.track('pageview', {
      path: url,
      timestamp: new Date().toISOString(),
    })
  }

  const trackError = (error: Error) => {
    va.track('error', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    })
  }

  return {
    trackEvent,
    trackPageView,
    trackError,
  }
}
