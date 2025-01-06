"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js"
import { Radar } from "react-chartjs-2"

import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const skills = {
  labels: [
    "React",
    "Node.js",
    "TypeScript",
    "UI/UX",
    "DevOps",
    "Testing",
  ],
  datasets: [
    {
      label: "Skill Level",
      data: [90, 85, 88, 75, 70, 82],
      backgroundColor: "rgba(147, 51, 234, 0.2)",
      borderColor: "rgb(147, 51, 234)",
      borderWidth: 2,
      pointBackgroundColor: "rgb(147, 51, 234)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(147, 51, 234)",
    },
  ],
}

export function SkillsRadar() {
  const { theme } = useTheme()
  const chartRef = useRef<ChartJS>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current
      chart.options.scales!.r!.grid!.color = theme === "dark" ? "#333" : "#ddd"
      chart.options.scales!.r!.pointLabels!.color =
        theme === "dark" ? "#fff" : "#000"
      chart.update()
    }
  }, [theme])

  const options = {
    scales: {
      r: {
        min: 0,
        max: 100,
        beginAtZero: true,
        grid: {
          color: theme === "dark" ? "#333" : "#ddd",
        },
        pointLabels: {
          color: theme === "dark" ? "#fff" : "#000",
          font: {
            size: 12,
          },
        },
        ticks: {
          stepSize: 20,
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Skills Radar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <Radar ref={chartRef} data={skills} options={options} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

