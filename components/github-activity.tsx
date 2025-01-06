"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { GitBranch, GitCommit, GitPullRequest, Loader2 } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type GitHubEvent = {
  id: string
  type: string
  created_at: string
  repo: {
    name: string
  }
  payload: {
    commits?: Array<{
      message: string
    }>
    pull_request?: {
      title: string
    }
  }
}

export function GitHubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGitHubActivity() {
      try {
        const response = await fetch(
          "https://api.github.com/users/yourusername/events/public"
        )
        const data = await response.json()
        setEvents(data.slice(0, 5))
      } catch (error) {
        console.error("Error fetching GitHub activity:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubActivity()
  }, [])

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-5 w-5" />
          Recent GitHub Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-4 rounded-lg border p-4"
          >
            {event.type === "PushEvent" ? (
              <GitCommit className="h-5 w-5 text-primary" />
            ) : (
              <GitPullRequest className="h-5 w-5 text-primary" />
            )}
            <div className="space-y-1">
              <p className="font-medium">
                {event.type === "PushEvent"
                  ? event.payload.commits?.[0]?.message
                  : event.payload.pull_request?.title}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{event.repo.name}</span>
                <span>•</span>
                <span>{format(new Date(event.created_at), "MMM d, yyyy")}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

