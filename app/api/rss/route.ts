import { NextResponse } from 'next/server'
import RSS from 'rss'

export async function GET() {
  const feed = new RSS({
    title: 'Your Portfolio Blog',
    description: 'Latest articles and updates',
    feed_url: 'https://yourportfolio.com/rss.xml',
    site_url: 'https://yourportfolio.com',
  })

  // Add your blog posts to the feed
  feed.item({
    title: 'Example Blog Post',
    description: 'This is an example blog post',
    url: 'https://yourportfolio.com/blog/example',
    date: new Date(),
  })

  return new NextResponse(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
