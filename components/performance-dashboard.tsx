"use client"

import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Activity, Clock, Globe, Zap } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

type PerformanceMetric = {
  timestamp: string
  value: number
}

type PerformanceData = {
  fcp: PerformanceMetric[]
  lcp: PerformanceMetric[]
  cls: PerformanceMetric[]
  ttfb: PerformanceMetric[]
}

export function PerformanceDashboard() {
  const [data, setData] = useState<PerformanceData>({
    fcp: [],
    lcp: [],
    cls: [],
    ttfb: [],
  })

  useEffect(() => {
    // Simulate fetching performance data
    const generateData = () => {
      const timestamps = Array.from({ length: 24 }, (_, i) => {
        const date = new Date()
        date.setHours(date.getHours() - i)
        return date.toLocaleTimeString()
      }).reverse()

      const newData: PerformanceData = {
        fcp: timestamps.map((timestamp) => ({
          timestamp,
          value: Math.random() * 1000 + 500,
        })),
        lcp: timestamps.map((timestamp) => ({
          timestamp,
          value: Math.random() * 2000 + 1000,
        })),
        cls: timestamps.map((timestamp) => ({
          timestamp,
          value: Math.random() * 0.1,
        })),
        ttfb: timestamps.map((timestamp) => ({
          timestamp,
          value: Math.random() * 200 + 100,
        })),
      }

      setData(newData)
    }

    generateData()
  }, [])

  const metrics = [
    {
      title: "First Contentful Paint",
      value: `${Math.round(data.fcp[data.fcp.length - 1]?.value ?? 0)}ms`,
      description: "Time until the first content is painted",
      icon: Globe,
    },
    {
      title: "Largest Contentful Paint",
      value: `${Math.round(data.lcp[data.lcp.length - 1]?.value ?? 0)}ms`,
      description: "Time until the largest content is painted",
      icon: Zap,
    },
    {
      title: "Cumulative Layout Shift",
      value: (data.cls[data.cls.length - 1]?.value ?? 0).toFixed(3),
      description: "Measure of visual stability",
      icon: Activity,
    },
    {
      title: "Time to First Byte",
      value: `${Math.round(data.ttfb[data.ttfb.length - 1]?.value ?? 0)}ms`,
      description: "Server response time",
      icon: Clock,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>
            Monitor your website's performance over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="loading">
            <TabsList>
              <TabsTrigger value="loading">Loading Performance</TabsTrigger>
              <TabsTrigger value="interaction">
                Interaction Metrics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="loading" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data.fcp}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 0,
                    }}
                  >
                    <XAxis
                      dataKey="timestamp"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}ms`}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="currentColor"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="interaction" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.cls}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 0,
                    }}
                  >
                    <XAxis
                      dataKey="timestamp"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => value.toFixed(3)}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      fill="currentColor"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

