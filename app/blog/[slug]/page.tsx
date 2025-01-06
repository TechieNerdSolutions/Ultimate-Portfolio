import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { ReadingTime } from "@/components/reading-time"
import { processMdx } from "@/lib/mdx"

// This would typically come from your CMS or file system
const getPost = async (slug: string) => {
  try {
    // Simulate fetching post content
    const content = `---
title: Example Blog Post
description: This is an example blog post with MDX content.
date: 2024-01-04
---

# Example Blog Post

This is an example blog post with MDX content. You can write **bold** text, *italic* text, and more.

## Code Example

\`\`\`typescript
function hello(name: string) {
  console.log(\`Hello, \${name}!\`)
}
\`\`\`

## Lists

- Item 1
- Item 2
- Item 3

## Links

[Visit my website](https://example.com)
`

    const { content: processedContent, frontmatter } = await processMdx(content)
    return { content: processedContent, frontmatter }
  } catch (error) {
    return null
  }
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <Button variant="ghost" className="mb-8" asChild>
          <a href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </a>
        </Button>
        <article className="prose prose-gray dark:prose-invert max-w-none">
          <div className="mb-8 space-y-2">
            <h1 className="font-display text-4xl font-bold">
              {post.frontmatter.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <time dateTime={post.frontmatter.date}>
                {format(new Date(post.frontmatter.date), "MMMM d, yyyy")}
              </time>
              <span>•</span>
              <ReadingTime content={post.frontmatter.description} />
            </div>
          </div>
          {post.content}
        </article>
      </div>
    </div>
  )
}

