import { Metadata } from "next"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing your portfolio website",
}

export default function AdminPage() {
  return <AnalyticsDashboard />
}

