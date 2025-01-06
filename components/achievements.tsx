"use client"

import { Award, Book, Code2, Trophy } from 'lucide-react'
import { motion } from "framer-motion"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const achievements = [
  {
    icon: Trophy,
    title: "AWS Certified Solutions Architect",
    description: "Professional certification for AWS cloud architecture",
    date: "2023",
    tags: ["Cloud", "AWS", "Architecture"],
  },
  {
    icon: Code2,
    title: "Google Cloud Developer",
    description: "Expert-level certification for Google Cloud Platform",
    date: "2023",
    tags: ["Cloud", "Google", "Development"],
  },
  {
    icon: Book,
    title: "Meta Frontend Developer",
    description: "Professional certification for frontend development",
    date: "2022",
    tags: ["Frontend", "React", "JavaScript"],
  },
  {
    icon: Award,
    title: "Hashnode Technical Writing",
    description: "Recognition for outstanding technical content",
    date: "2022",
    tags: ["Writing", "Documentation", "Teaching"],
  },
]

export function Achievements() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold">
          Achievements & Certifications
        </h2>
        <p className="mt-2 text-muted-foreground">
          Professional certifications and recognition
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon
          return (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-primary/10 p-2.5">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="line-clamp-1">
                        {achievement.title}
                      </CardTitle>
                      <CardDescription>{achievement.date}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {achievement.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {achievement.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        )}
      </div>
    </div>
  )
}

