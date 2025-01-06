import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { ProjectHeader } from './project-header'
import { ProjectContent } from './project-content'
import { ProjectComments } from './project-comments'
import { Skeleton } from '@/components/ui/skeleton'

async function getProject(id: string) {
  const res = await fetch(`/api/projects/${id}`)
  if (!res.ok) return null
  return res.json()
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string }
}) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <article className="container mx-auto py-8">
      <ProjectHeader project={project} />

      <Suspense
        fallback={
          <Skeleton className="mt-8 h-[200px] w-full" />
        }
      >
        <ProjectContent project={project} />
      </Suspense>

      <Suspense
        fallback={
          <Skeleton className="mt-8 h-[400px] w-full" />
        }
      >
        <ProjectComments projectId={project.id} />
      </Suspense>
    </article>
  )
}
