"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const technologies = [
  {
    name: "React",
    icon: "/placeholder.svg?height=80&width=80",
    url: "https://reactjs.org",
  },
  {
    name: "Next.js",
    icon: "/placeholder.svg?height=80&width=80",
    url: "https://nextjs.org",
  },
  {
    name: "TypeScript",
    icon: "/placeholder.svg?height=80&width=80",
    url: "https://www.typescriptlang.org",
  },
  {
    name: "Node.js",
    icon: "/placeholder.svg?height=80&width=80",
    url: "https://nodejs.org",
  },
  {
    name: "PostgreSQL",
    icon: "/placeholder.svg?height=80&width=80",
    url: "https://www.postgresql.org",
  },
  {
    name: "TailwindCSS",
    icon: "/placeholder.svg?height=80&width=80",
    url: "https://tailwindcss.com",
  },
]

export function TechStack() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold">Tech Stack</h2>
        <p className="mt-2 text-muted-foreground">
          Technologies I work with
        </p>
      </div>
      <div className="grid grid-cols-3 gap-8 md:grid-cols-6">
        {technologies.map((tech, index) => (
          <motion.a
            key={tech.name}
            href={tech.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative aspect-square w-20 overflow-hidden rounded-xl border bg-background p-2 transition-colors group-hover:border-primary">
              <Image
                src={tech.icon}
                alt={tech.name}
                fill
                className="object-contain p-2"
              />
            </div>
            <span className="text-sm font-medium">{tech.name}</span>
          </motion.a>
        ))}
      </div>
    </div>
  )
}

