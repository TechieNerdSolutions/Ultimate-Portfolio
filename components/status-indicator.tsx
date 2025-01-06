"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Code2 } from 'lucide-react'

import { Card, CardContent } from "@/components/ui/card"
import { useTranslations } from "next-intl"

export function StatusIndicator() {
  const t = useTranslations()
  const [currentProject, setCurrentProject] = useState("Next.js Portfolio")
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    // You could fetch this from an API or GitHub
    const updateStatus = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCurrentProject("Next.js Portfolio")
      setLastUpdated(new Date())
    }

    updateStatus()
    const interval = setInterval(updateStatus, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full bg-green-500/20"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium">{t("status.available")}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code2 className="h-4 w-4" />
            <span>
              {t("status.working")} {currentProject}
            </span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          {t("status.lastUpdated")}: {lastUpdated.toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  )
}

