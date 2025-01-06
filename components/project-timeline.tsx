"use client"

import { motion } from "framer-motion"
import { Calendar, ExternalLink, Github } from 'lucide-react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    year: "2023",
    projects: [
      {
        title: "AI-Powered Task Manager",
        description:
          "A smart task management application that uses AI to prioritize and categorize tasks automatically.",
        date: "December 2023",
        link: "https://example.com",
        github: "https://github.com",
        technologies: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS"],
      },
      {
        title: "E-commerce Platform",
        description:
          "A full-featured e-commerce platform with real-time inventory management and payment processing.",
        date: "September 2023",
        link: "https://example.com",
        github: "https://github.com",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      },
    ],
  },
  {
    year: "2022",
    projects: [
      {
        title: "Portfolio Website",
        description:
          "A personal portfolio website built with Next.js and Tailwind CSS.",
        date: "December 2022",
        link: "https://example.com",
        github: "https://github.com",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        title: "Blog Platform",
        description:
          "A full-stack blog platform with markdown support and user authentication.",
        date: "June 2022",
        link: "https://example.com",
        github: "https://github.com",
        technologies: ["React", "Node.js", "PostgreSQL"],
      },
    ],
  },
]

export function ProjectTimeline() {
  return (
    <div className="space-y-8">
      {projects.map((yearGroup, yearIndex) => (
        <div key={yearGroup.year} className="relative space-y-4">
          <div className="sticky top-20 z-20 -mx-6 bg-background/95 px-6 py-2 backdrop-blur">
            <h2 className="font-display text-2xl font-bold">{yearGroup.year}</h2>
          </div>
          <div className="relative space-y-8 before:absolute before:left-[17px] before:top-0 before:h-full before:w-px before:bg-border">
            {yearGroup.projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (yearIndex * 0.2) + (index * 0.1) }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-[22px] h-9 w-9 rounded-full border bg-background">
                  <Calendar className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-primary" />
                </div>
                <Card>
                  <CardHeader>
                    <div className="space-y-1">
                      <CardTitle className="line-clamp-1">
                        {project.title}
                      </CardTitle>
                      <CardDescription>{project.date}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button asChild size="sm">
                        <Link href={project.link}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href={project.github}>
                          <Github className="mr-2 h-4 w-4" />
                          Source
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

