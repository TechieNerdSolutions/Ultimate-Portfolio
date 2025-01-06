'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { captureError } from '@/lib/error-tracking'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  name?: string
}

interface State {
  hasError: boolean
  error?: Error
}

export class MonitoredErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    captureError(error, {
      component: this.props.name || 'Unknown',
      errorInfo,
    })
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <h2 className="text-lg font-semibold text-destructive">
              Something went wrong
            </h2>
            <p className="mt-2 text-sm text-destructive-foreground">
              {this.state.error?.message}
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 rounded-md bg-destructive px-4 py-2 text-destructive-foreground"
            >
              Try again
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
