"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { BarChart, FileText, Folder, LayoutDashboard, Mail, Settings } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart,
  },
  {
    title: "Blog Posts",
    href: "/admin/posts",
    icon: FileText,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: Folder,
  },
  {
    title: "Newsletter",
    href: "/admin/newsletter",
    icon: Mail,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <h1 className="font-display text-2xl font-bold">Admin Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </div>
      <nav className="flex items-center gap-2">
        {adminNavItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.href}
              variant={pathname === item.href ? "default" : "ghost"}
              className={cn(
                "justify-start md:w-auto",
                pathname === item.href && "bg-primary"
              )}
              asChild
            >
              <Link href={item.href}>
                <Icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          )
        })}
      </nav>
    </div>
  )
}

