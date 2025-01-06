"use client"

import { useEffect, useState } from "react"

export function SkipLink() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-50 -translate-y-[150%] rounded-md bg-primary px-4 py-2 text-primary-foreground transition-transform focus:translate-y-0"
    >
      Skip to main content
    </a>
  )
}

