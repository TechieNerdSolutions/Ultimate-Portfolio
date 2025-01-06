import { cache } from 'react'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})

interface CacheOptions {
  ttl?: number // Time to live in seconds
  tags?: string[]
}

export const getCache = cache(async function get(
  key: string
) {
  return redis.get(key)
})

export async function setCache(
  key: string,
  value: any,
  options: CacheOptions = {}
) {
  const { ttl, tags = [] } = options

  await redis
    .multi()
    .set(key, value, ttl ? { ex: ttl } : undefined)
    .sadd(`tags:${key}`, tags)
    .exec()
}

export async function invalidateCache(tag: string) {
  const keys = await redis.smembers(`tag:${tag}`)
  
  if (keys.length > 0) {
    await redis
      .multi()
      .del(keys)
      .del(`tag:${tag}`)
      .exec()
  }
}
