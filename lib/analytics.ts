type EventType = 'pageview' | 'click' | 'error' | 'custom'

interface AnalyticsEvent {
  type: EventType
  name: string
  properties?: Record<string, any>
  timestamp: number
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private batchSize: number = 10
  private apiEndpoint: string

  constructor(apiEndpoint: string) {
    this.apiEndpoint = apiEndpoint
    this.setupBeforeUnload()
  }

  private setupBeforeUnload() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.flush()
      })
    }
  }

  track(type: EventType, name: string, properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      type,
      name,
      properties,
      timestamp: Date.now(),
    }

    this.events.push(event)

    if (this.events.length >= this.batchSize) {
      this.flush()
    }
  }

  async flush() {
    if (this.events.length === 0) return

    const eventsToSend = [...this.events]
    this.events = []

    try {
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventsToSend),
      })
    } catch (error) {
      console.error('Failed to send analytics:', error)
      // Add events back to the queue
      this.events = [...eventsToSend, ...this.events]
    }
  }
}

export const analytics = new Analytics('/api/analytics')
