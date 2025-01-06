import { ArrowRight } from 'lucide-react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Newsletter } from "@/components/newsletter"
import { ProjectCard } from "@/components/project-card"
import { TechStack } from "@/components/tech-stack"
import { Testimonials } from "@/components/testimonials"

const featuredProjects = [
  {
    id: "1",
    title: "AI-Powered Task Manager",
    description:
      "A smart task management application that uses AI to prioritize and categorize tasks automatically.",
    image: "/placeholder.svg?height=400&width=600",
    link: "https://example.com",
    github: "https://github.com",
    technologies: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS"],
    featured: true,
    completed: "2023-12",
  },
  {
    id: "2",
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform with real-time inventory management and payment processing.",
    image: "/placeholder.svg?height=400&width=600",
    link: "https://example.com",
    github: "https://github.com",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    featured: true,
    completed: "2023-11",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="container flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center gap-4 text-center">
        <h1 className="animate-fade-in font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to my{" "}
          <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Portfolio
          </span>
        </h1>
        <p className="animate-slide-up max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          I&apos;m a full-stack developer passionate about building beautiful and
          functional web applications. Currently working on exciting projects and
          always open to new opportunities.
        </p>
        <div className="animate-slide-up flex gap-4">
          <Button asChild>
            <Link href="/projects">
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Me</Link>
          </Button>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="container">
        <TechStack />
      </section>

      {/* Featured Projects Section */}
      <section className="container space-y-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold">Featured Projects</h2>
          <p className="mt-2 text-muted-foreground">
            Some of my recent work
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="text-center">
          <Button asChild variant="outline">
            <Link href="/projects">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container">
        <Testimonials />
      </section>

      {/* Newsletter Section */}
      <section className="container flex justify-center">
        <Newsletter />
      </section>
    </div>
  )
}

