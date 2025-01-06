"use client"

import { useState } from "react"
import { Loader2, Mail } from 'lucide-react'
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Success!",
      description: "You've been subscribed to the newsletter.",
    })

    setEmail("")
    setIsLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl border bg-card p-8 text-card-foreground shadow"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="rounded-full border-2 border-primary p-3">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-bold">
            Subscribe to my newsletter
          </h3>
          <p className="text-muted-foreground">
            Get notified about new projects, articles, and resources.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  )
}

