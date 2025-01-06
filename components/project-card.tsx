import Image from "next/image"
import Link from "next/link"
import { Github, Globe } from 'lucide-react'

import { Project } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <CardTitle className="line-clamp-1">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-2 p-6 pt-0">
        <Button asChild variant="default" size="sm">
          <Link href={project.link}>
            <Globe className="mr-2 h-4 w-4" />
            Live Demo
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href={project.github}>
            <Github className="mr-2 h-4 w-4" />
            Source
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

