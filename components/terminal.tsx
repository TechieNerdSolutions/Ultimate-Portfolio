"use client"

import { useEffect, useRef, useState } from "react"
import { Command } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type CommandHistory = {
  command: string
  output: string
}

const commands = {
  help: "Available commands: help, about, contact, skills, clear",
  about: "I'm a full-stack developer with expertise in React, Next.js, and Node.js.",
  contact: "Email: hello@example.com\nGitHub: github.com/username\nLinkedIn: linkedin.com/in/username",
  skills: "Frontend: React, Next.js, TypeScript\nBackend: Node.js, Express, PostgreSQL\nTools: Git, Docker, AWS",
  clear: "clear",
}

export function Terminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<CommandHistory[]>([])
  const terminalEnd = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    terminalEnd.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [history])

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    let output = ""

    if (trimmedCmd === "clear") {
      setHistory([])
      return
    }

    if (trimmedCmd in commands) {
      output = commands[trimmedCmd as keyof typeof commands]
    } else {
      output = `Command not found: ${trimmedCmd}. Type 'help' for available commands.`
    }

    setHistory((prev) => [...prev, { command: cmd, output }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    handleCommand(input)
    setInput("")
  }

  return (
    <Card className="min-h-[400px] w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Command className="h-5 w-5" />
          Terminal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="font-code space-y-4">
          <p className="text-sm text-muted-foreground">
            Welcome! Type &apos;help&apos; to see available commands.
          </p>
          <div className="max-h-[300px] space-y-4 overflow-auto">
            {history.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span>{item.command}</span>
                </div>
                <div className="whitespace-pre-wrap pl-6 text-muted-foreground">
                  {item.output}
                </div>
              </div>
            ))}
            <div ref={terminalEnd} />
          </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-primary">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              aria-label="Terminal input"
            />
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

