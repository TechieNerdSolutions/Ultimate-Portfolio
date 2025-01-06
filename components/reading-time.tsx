"use client"

import { Clock } from 'lucide-react'

interface ReadingTimeProps {
  content: string
}

export function ReadingTime({ content }: ReadingTimeProps) {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)

  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      <Clock className="h-4 w-4" />
      <span>{minutes} min read</span>
    </div>
  )
}

