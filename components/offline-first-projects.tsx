'use client'

import { useEffect, useState } from 'react'
import { IndexedDB } from '@/lib/indexed-db'

interface Project {
  id: string
  title: string
  description: string
  image: string
}

export function OfflineFirstProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const db = new IndexedDB('portfolio', 1)
    
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    const fetchProjects = async () => {
      try {
        // Try to fetch from API if online
        if (navigator.onLine) {
          const response = await fetch('/api/projects')
          const data = await response.json()
          
          // Cache the data
          await db.connect()
          await Promise.all(
            data.map((project: Project) =>
              db.put('projects', project)
            )
          )
          
          setProjects(data)
        } else {
          // Load from cache if offline
          await db.connect()
          const cachedProjects = await db.getAll<Project>(
            'projects'
          )
          setProjects(cachedProjects)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-[300px] animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    )
  }

  return (
    <div>
      {!isOnline && (
        <div className="mb-4 rounded-md bg-yellow-50 p-4 text-yellow-800">
          You're currently offline. Showing cached projects.
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="overflow-hidden rounded-lg border bg-card"
          >
            <div className="aspect-video relative">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                {project.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
