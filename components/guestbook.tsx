"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Loader2, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

type GuestbookEntry = {
  id: string
  name: string
  message: string
  createdAt: string
}

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name,
      message,
      createdAt: new Date().toISOString(),
    }

    setEntries([newEntry, ...entries])
    setName("")
    setMessage("")
    setIsSubmitting(false)

    toast({
      title: "Success!",
      description: "Your message has been added to the guestbook.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Guestbook
        </CardTitle>
        <CardDescription>
          Leave a message for future visitors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Sign Guestbook"
            )}
          </Button>
        </form>

        <div className="space-y-4">
          <AnimatePresence>
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{entry.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(entry.createdAt), "MMM d, yyyy")}
                    </p>
                  </div>
                  <p className="text-muted-foreground">{entry.message}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

