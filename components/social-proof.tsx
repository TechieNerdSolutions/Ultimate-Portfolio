"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, Star, Users } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const stats = [
  {
    title: "GitHub Stars",
    value: "1.2k+",
    icon: Star,
    description: "Across all repositories",
  },
  {
    title: "Projects Completed",
    value: "50+",
    icon: Github,
    description: "For clients worldwide",
  },
  {
    title: "Happy Clients",
    value: "30+",
    icon: Users,
    description: "With 100% satisfaction",
  },
]

export function SocialProof() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <div ref={ref} className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold">By the Numbers</h2>
        <p className="mt-2 text-muted-foreground">
          Impact and achievements throughout my career
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.2,
                  },
                },
              }}
            >
              <Card className="relative overflow-hidden">
                <div className="absolute right-4 top-4 rounded-full bg-primary/10 p-2.5">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">
                    {stat.value}
                  </CardTitle>
                  <CardDescription>{stat.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

