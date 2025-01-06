"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { GitBranch, GitCommit, GitFork, GitPullRequest, Loader2, Star } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type GitHubEvent = {
  id: string
  type: string
  created_at: string
  repo: {
    name: string
    url: string
  }
  payload: {
    action?: string
    ref?: string
    ref_type?: string
    commits?: Array<{
      message: string
      url: string
    }>
    pull_request?: {
      title: string
      html_url: string
    }
  }
}

export function GitHubFeed() {
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGitHubActivity() {
      try {
        const response = await fetch(
          "https://api.github.com/users/yourusername/events/public"
        )
        if (!response.ok) throw new Error("Failed to fetch GitHub activity")
        const data = await response.json()
        setEvents(data.slice(0, 5))
      } catch (error) {
        setError("Failed to load GitHub activity")
        console.error("Error fetching GitHub activity:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubActivity()
  }, [])

  const getEventIcon = (type: string) => {
    switch (type) {
      case "PushEvent":
        return <GitCommit className="h-4 w-4" />
      case "PullRequestEvent":
        return <GitPullRequest className="h-4 w-4" />
      case "ForkEvent":
        return <GitFork className="h-4 w-4" />
      case "WatchEvent":
        return <Star className="h-4 w-4" />
      case "CreateEvent":
        return <GitBranch className="h-4 w-4" />
      default:
        return <GitCommit className="h-4 w-4" />
    }
  }

  const getEventDescription = (event: GitHubEvent) => {
    switch (event.type) {
      case "PushEvent":
        return `Pushed ${
          event.payload.commits?.length || 0
        } commits to ${event.repo.name}`
      case "PullRequestEvent":
        return `${
          event.payload.action === "opened" ? "Opened" : "Closed"
        } pull request in ${event.repo.name}`
      case "ForkEvent":
        return `Forked ${event.repo.name}`
      case "WatchEvent":
        return `Starred ${event.repo.name}`
      case "CreateEvent":
        return `Created ${event.payload.ref_type} ${
          event.payload.ref || ""
        } in ${event.repo.name}`
      default:
        return `Activity in ${event.repo.name}`
    }
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>GitHub Activity</CardTitle>
          <CardDescription>Recent activity on GitHub</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>GitHub Activity</CardTitle>
        <CardDescription>Recent activity on GitHub</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-4 rounded-lg border p-4"
            >
              <div className="mt-1">{getEventIcon(event.type)}</div>
              <div className="flex-1 space-y-1">
                <p className="text-sm">{getEventDescription(event)}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <time dateTime={event.created_at}>
                    {format(new Date(event.created_at), "MMM d, yyyy")}
                  </time>
                  <span>•</span>
                  <Link
                    href={`https://github.com/${event.repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary hover:underline"
                  >
                    View on GitHub
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

