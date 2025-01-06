import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})

interface RateLimitConfig {
  limit: number
  window: number // in seconds
}

export async function rateLimit(
  req: NextRequest,
  config: RateLimitConfig
) {
  const ip = req.ip ?? '127.0.0.1'
  const key = `rate-limit:${ip}`

  const [response] = await redis
    .multi()
    .incr(key)
    .expire(key, config.window)
    .exec()

  const current = response as number

  if (current > config.limit) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }

  return null
}
