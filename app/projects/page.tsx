import { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectCard } from "@/components/project-card"
import { ProjectTimeline } from "@/components/project-timeline"

export const metadata: Metadata = {
  title: "Projects",
  description: "Showcase of my latest web development projects",
}

const projects = [
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
  {
    id: "3",
    title: "Real-time Chat Application",
    description:
      "A modern chat application with real-time messaging, file sharing, and video calls.",
    image: "/placeholder.svg?height=400&width=600",
    link: "https://example.com",
    github: "https://github.com",
    technologies: ["Next.js", "Socket.io", "WebRTC", "Prisma"],
    featured: false,
    completed: "2023-10",
  },
]

export default function ProjectsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-display text-3xl font-bold md:text-4xl">Projects</h1>
        <p className="text-lg text-muted-foreground">
          A collection of my latest web development projects.
        </p>
      </div>
      <Tabs defaultValue="grid" className="mt-8">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="timeline" className="mt-6">
          <ProjectTimeline />
        </TabsContent>
      </Tabs>
    </div>
  )
}

