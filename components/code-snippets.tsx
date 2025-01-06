"use client"

import { useState } from "react"
import { Check, Copy, Search } from 'lucide-react'
import { motion } from "framer-motion"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const codeSnippets = [
  {
    title: "React Custom Hook - useLocalStorage",
    description: "A custom hook for managing localStorage in React",
    language: "typescript",
    tags: ["React", "TypeScript", "Hooks"],
    code: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get stored value
  const storedValue = typeof window !== 'undefined' 
    ? window.localStorage.getItem(key)
    : null;

  // Set initial state
  const [value, setValue] = useState<T>(() => {
    try {
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
  },
  {
    title: "Next.js API Route with Rate Limiting",
    description: "API route with built-in rate limiting using Redis",
    language: "typescript",
    tags: ["Next.js", "API", "Redis"],
    code: `import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for');
  const { success } = await ratelimit.limit(ip ?? 'anonymous');

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  // Handle request
  return NextResponse.json({ message: 'Success' });
}`,
  },
]

export function CodeSnippets() {
  const [searchTerm, setSearchTerm] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredSnippets = codeSnippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  )

  const copyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h2 className="font-display text-3xl font-bold">Code Snippets</h2>
        <p className="text-lg text-muted-foreground">
          A collection of useful code snippets and utilities
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search snippets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filteredSnippets.map((snippet, index) => (
          <motion.div
            key={snippet.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="line-clamp-1">{snippet.title}</CardTitle>
                <CardDescription>{snippet.description}</CardDescription>
                <div className="flex flex-wrap gap-2">
                  {snippet.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4"
                    onClick={() => copyToClipboard(snippet.code, snippet.title)}
                  >
                    {copiedId === snippet.title ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <SyntaxHighlighter
                    language={snippet.language}
                    style={coldarkDark}
                    customStyle={{
                      margin: 0,
                      borderRadius: "0.5rem",
                      padding: "1rem",
                    }}
                  >
                    {snippet.code}
                  </SyntaxHighlighter>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

