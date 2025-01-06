"use client"

import { useEffect, useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Activity, Users, Eye, Clock } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

type AnalyticsData = {
  pageViews: {
    total: number
    change: number
    data: Array<{ date: string; value: number }>
  }
  visitors: {
    total: number
    change: number
    data: Array<{ date: string; value: number }>
  }
  avgTime: {
    value: string
    change: number
  }
  bounceRate: {
    value: number
    change: number
  }
  topPages: Array<{ name: string; value: number }>
  deviceShare: Array<{ name: string; value: number }>
}

export function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState("7d")
  const [data, setData] = useState<AnalyticsData>({
    pageViews: {
      total: 0,
      change: 0,
      data: [],
    },
    visitors: {
      total: 0,
      change: 0,
      data: [],
    },
    avgTime: {
      value: "0:00",
      change: 0,
    },
    bounceRate: {
      value: 0,
      change: 0,
    },
    topPages: [],
    deviceShare: [],
  })

  useEffect(() => {
    // Simulate fetching analytics data
    const generateData = () => {
      const dates = Array.from({ length: parseInt(timeframe) }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        return date.toISOString().split("T")[0]
      }).reverse()

      const newData: AnalyticsData = {
        pageViews: {
          total: Math.floor(Math.random() * 10000),
          change: Math.floor(Math.random() * 40) - 20,
          data: dates.map((date) => ({
            date,
            value: Math.floor(Math.random() * 1000),
          })),
        },
        visitors: {
          total: Math.floor(Math.random() * 5000),
          change: Math.floor(Math.random() * 40) - 20,
          data: dates.map((date) => ({
            date,
            value: Math.floor(Math.random() * 500),
          })),
        },
        avgTime: {
          value: `${Math.floor(Math.random() * 3)}:${Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, "0")}`,
          change: Math.floor(Math.random() * 40) - 20,
        },
        bounceRate: {
          value: Math.floor(Math.random() * 100),
          change: Math.floor(Math.random() * 40) - 20,
        },
        topPages: [
          { name: "/", value: Math.floor(Math.random() * 1000) },
          { name: "/blog", value: Math.floor(Math.random() * 1000) },
          { name: "/projects", value: Math.floor(Math.random() * 1000) },
          { name: "/about", value: Math.floor(Math.random() * 1000) },
        ],
        deviceShare: [
          { name: "Desktop", value: Math.floor(Math.random() * 70) + 30 },
          { name: "Mobile", value: Math.floor(Math.random() * 40) + 20 },
          { name: "Tablet", value: Math.floor(Math.random() * 20) + 5 },
        ],
      }

      setData(newData)
    }

    generateData()
  }, [timeframe])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="14d">Last 14 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.pageViews.total}</div>
            <p className="text-xs text-muted-foreground">
              {data.pageViews.change > 0 ? "+" : ""}
              {data.pageViews.change}% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.visitors.total}</div>
            <p className="text-xs text-muted-foreground">
              {data.visitors.change > 0 ? "+" : ""}
              {data.visitors.change}% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time on Site</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.avgTime.value}</div>
            <p className="text-xs text-muted-foreground">
              {data.avgTime.change > 0 ? "+" : ""}
              {data.avgTime.change}% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.bounceRate.value}%</div>
            <p className="text-xs text-muted-foreground">
              {data.bounceRate.change > 0 ? "+" : ""}
              {data.bounceRate.change}% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Page Views Over Time</CardTitle>
            <CardDescription>Daily page views for the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.pageViews.data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.topPages}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Distribution</CardTitle>
            <CardDescription>Visitors by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.deviceShare}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.deviceShare.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

