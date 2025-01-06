import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code2, Globe, Layout, Rocket } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { SkillsGrid } from "@/components/skills-grid"
import { DownloadCV } from "@/components/download-cv"
import { SkillsProgress } from "@/components/skills-progress"
import { ResumePreview } from "@/components/resume-preview"
import { SocialProof } from "@/components/social-proof"
import { SkillsRadar } from "@/components/skills-radar"

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about my background and services",
}

const services = [
  {
    icon: Layout,
    title: "Frontend Development",
    description:
      "Building responsive and performant web applications using React, Next.js, and modern CSS frameworks.",
  },
  {
    icon: Code2,
    title: "Backend Development",
    description:
      "Creating scalable server-side applications with Node.js, Express, and various databases.",
  },
  {
    icon: Globe,
    title: "Full Stack Solutions",
    description:
      "End-to-end development of web applications, from database design to user interface.",
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    description:
      "Improving application speed and efficiency through code optimization and modern best practices.",
  },
]

export default function AboutPage() {
  return (
    <div className="container space-y-16 py-8">
      {/* Profile Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            About Me
          </h1>
          <div className="relative aspect-square overflow-hidden rounded-lg md:aspect-video lg:aspect-square">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              Hi! I'm a full-stack developer with over 5 years of experience in
              building web applications. I specialize in React, Next.js, and Node.js,
              with a strong focus on creating performant and scalable solutions.
            </p>
            <p className="text-lg text-muted-foreground">
              I'm passionate about creating intuitive user experiences and solving
              complex problems through clean, efficient code. When I'm not coding,
              you can find me contributing to open-source projects or writing about
              web development.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/contact">
                  Work with me <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <DownloadCV />
              <Button variant="outline" asChild>
                <Link href="/projects">View Projects</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="grid gap-4">
          <h2 className="font-display text-2xl font-bold">My Services</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.title} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="line-clamp-1">
                        {service.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <SocialProof />

      {/* Skills Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        <SkillsProgress />
        <SkillsRadar />
      </div>

      {/* Resume Preview Section */}
      <ResumePreview />

      {/* Experience Timeline */}
      <div>
        <h2 className="mb-8 font-display text-2xl font-bold">Experience</h2>
        <ExperienceTimeline />
      </div>
    </div>
  )
}

