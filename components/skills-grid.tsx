"use client"

import { motion } from "framer-motion"

const skills = [
  {
    name: "React",
    level: "Advanced",
    years: 4,
  },
  {
    name: "Next.js",
    level: "Advanced",
    years: 3,
  },
  {
    name: "TypeScript",
    level: "Advanced",
    years: 3,
  },
  {
    name: "Node.js",
    level: "Advanced",
    years: 4,
  },
  {
    name: "TailwindCSS",
    level: "Advanced",
    years: 3,
  },
  {
    name: "PostgreSQL",
    level: "Intermediate",
    years: 3,
  },
  {
    name: "MongoDB",
    level: "Intermediate",
    years: 2,
  },
  {
    name: "GraphQL",
    level: "Intermediate",
    years: 2,
  },
]

export function SkillsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative overflow-hidden rounded-lg border bg-background p-4"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{skill.name}</h3>
              <span className="text-sm text-muted-foreground">{skill.level}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{
                  width:
                    skill.level === "Advanced"
                      ? "90%"
                      : skill.level === "Intermediate"
                      ? "70%"
                      : "50%",
                }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {skill.years} years experience
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

