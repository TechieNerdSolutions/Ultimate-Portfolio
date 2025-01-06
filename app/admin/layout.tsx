import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { AdminNav } from "@/components/admin-nav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="container grid items-start gap-8 py-8">
      <AdminNav />
      {children}
    </div>
  )
}

