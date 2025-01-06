"use client"

import { motion } from "framer-motion"
import { Calendar } from 'lucide-react'

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    period: "2021 - Present",
    description:
      "Leading development of enterprise web applications using React and Node.js. Managing a team of 5 developers and architecting scalable solutions.",
  },
  {
    title: "Full Stack Developer",
    company: "Digital Innovations Ltd.",
    period: "2019 - 2021",
    description:
      "Developed and maintained multiple client projects using Next.js, TypeScript, and PostgreSQL. Implemented CI/CD pipelines and improved performance.",
  },
  {
    title: "Frontend Developer",
    company: "Creative Web Agency",
    period: "2018 - 2019",
    description:
      "Created responsive web applications using React and modern CSS frameworks. Collaborated with designers to implement pixel-perfect interfaces.",
  },
]

export function ExperienceTimeline() {
  return (
    <div className="relative space-y-8">
      <div className="absolute left-[15px] top-2 h-[calc(100%-24px)] w-px bg-border md:left-1/2" />
      {experiences.map((experience, index) => (
        <motion.div
          key={experience.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="group relative grid md:grid-cols-2"
        >
          <div
            className={`mb-4 flex flex-col gap-2 md:mb-0 md:text-right ${
              index % 2 === 0 ? "md:pr-12" : "md:order-last md:pl-12"
            }`}
          >
            <h3 className="font-semibold">{experience.title}</h3>
            <p className="text-muted-foreground">{experience.company}</p>
          </div>
          <div
            className={`flex flex-col gap-2 ${
              index % 2 === 0 ? "md:pl-12" : "md:pr-12"
            }`}
          >
            <div className="absolute left-0 top-2 flex h-8 w-8 items-center justify-center rounded-full border bg-background md:left-1/2 md:-translate-x-1/2">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm text-primary">{experience.period}</p>
            <p className="text-muted-foreground">{experience.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

