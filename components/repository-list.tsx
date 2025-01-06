'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface Repository {
  id: number
  name: string
  description: string
  stargazers_count: number
  html_url: string
}

export function RepositoryList() {
  const { data, isLoading, error } = useQuery<Repository[]>({
    queryKey: ['repositories'],
    queryFn: async () => {
      const response = await fetch('/api/github')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
        Failed to load repositories
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((repo) => (
        <Card key={repo.id}>
          <CardHeader>
            <CardTitle>{repo.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{repo.description}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm">⭐ {repo.stargazers_count}</span>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                View on GitHub
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
