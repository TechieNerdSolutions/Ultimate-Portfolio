'use client'

import { Loader2 } from 'lucide-react'

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  )
}

export function LoadingButton({
  children,
  loading,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}) {
  return (
    <button
      disabled={loading}
      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-white disabled:opacity-50"
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
}

export function LoadingCard() {
  return (
    <div className="rounded-lg border p-4">
      <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-muted" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}
