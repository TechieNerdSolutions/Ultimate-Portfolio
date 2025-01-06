"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const skills = [
  { name: "Frontend Development", level: 90 },
  { name: "Backend Development", level: 85 },
  { name: "UI/UX Design", level: 75 },
  { name: "DevOps", level: 70 },
  { name: "Mobile Development", level: 65 },
  { name: "Database Management", level: 80 },
]

export function SkillsProgress() {
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
        <h2 className="font-display text-3xl font-bold">Skills Overview</h2>
        <p className="mt-2 text-muted-foreground">
          Technical proficiency and expertise
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{skill.name}</span>
              <span className="text-muted-foreground">{skill.level}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={controls}
                variants={{
                  visible: {
                    width: `${skill.level}%`,
                    transition: { duration: 1, ease: "easeOut" },
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

