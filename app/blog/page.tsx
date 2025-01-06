import { Metadata } from "next"

import { PostCard } from "@/components/post-card"

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles about web development, design, and technology",
}

const posts = [
  {
    id: "1",
    title: "Building a Modern Web Application with Next.js 13",
    description:
      "Learn how to build a modern web application using Next.js 13 and its new app directory features.",
    date: "2023-12-01",
    readingTime: "5 min read",
    category: "Development",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    id: "2",
    title: "Understanding TypeScript Generic Types",
    description:
      "A comprehensive guide to understanding and using generic types in TypeScript.",
    date: "2023-11-15",
    readingTime: "8 min read",
    category: "TypeScript",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["TypeScript", "Programming"],
  },
  {
    id: "3",
    title: "Mastering CSS Grid Layout",
    description:
      "Everything you need to know about CSS Grid Layout and how to use it effectively.",
    date: "2023-11-01",
    readingTime: "6 min read",
    category: "CSS",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["CSS", "Web Design"],
  },
]

export default function BlogPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-display text-3xl font-bold md:text-4xl">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Articles about web development, design, and technology.
        </p>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

