import Link from "next/link"
import { Plus } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { PostsTable } from "@/components/posts-table"

export default function PostsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Blog Posts</h2>
          <p className="text-muted-foreground">
            Manage your blog posts and content
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>
      <PostsTable />
    </div>
  )
}

