'use client'

import { useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface OptimizedLinkProps {
  href: string
  children: React.ReactNode
  prefetch?: boolean
  className?: string
}

export function OptimizedLink({
  href,
  children,
  prefetch = true,
  className,
}: OptimizedLinkProps) {
  const router = useRouter()
  const prefetchTimeout = useRef<NodeJS.Timeout>()

  const handleMouseEnter = useCallback(() => {
    if (!prefetch) return

    prefetchTimeout.current = setTimeout(() => {
      router.prefetch(href)
    }, 100)
  }, [href, prefetch, router])

  const handleMouseLeave = useCallback(() => {
    if (prefetchTimeout.current) {
      clearTimeout(prefetchTimeout.current)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (prefetchTimeout.current) {
        clearTimeout(prefetchTimeout.current)
      }
    }
  }, [])

  return (
    <Link
      href={href}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  )
}
