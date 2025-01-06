import RSS from "rss"
import { NextResponse } from "next/server"

export async function GET() {
  const feed = new RSS({
    title: "Your Portfolio Blog",
    description: "Latest articles about web development and technology",
    site_url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    feed_url: `${process.env.NEXT_PUBLIC_APP_URL}/feed.xml`,
    language: "en",
    pubDate: new Date(),
  })

  // Add your blog posts to the feed
  // This is where you would typically fetch from your database or CMS
  const posts = [
    {
      title: "Example Post",
      description: "This is an example post",
      url: "/blog/example-post",
      date: new Date(),
    },
  ]

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${process.env.NEXT_PUBLIC_APP_URL}${post.url}`,
      date: post.date,
    })
  })

  return new NextResponse(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}

