"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { Book, Code2, CommandIcon, File, Loader2, Search, X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type SearchResult = {
  id: string
  title: string
  description: string
  type: "project" | "blog" | "snippet" | "resource"
  url: string
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    title: "AI-Powered Task Manager",
    description: "A smart task management application",
    type: "project",
    url: "/projects/task-manager",
  },
  {
    id: "2",
    title: "Modern JavaScript for React Developers",
    description: "A comprehensive guide to JavaScript",
    type: "resource",
    url: "/resources/modern-javascript",
  },
  {
    id: "3",
    title: "Building with Next.js",
    description: "Learn how to build with Next.js",
    type: "blog",
    url: "/blog/building-with-nextjs",
  },
  {
    id: "4",
    title: "React Custom Hook - useLocalStorage",
    description: "A custom hook for localStorage",
    type: "snippet",
    url: "/snippets/use-local-storage",
  },
]

export function GlobalSearch() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSearch = async (value: string) => {
    setSearch(value)
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const filtered = mockResults.filter(
      (result) =>
        result.title.toLowerCase().includes(value.toLowerCase()) ||
        result.description.toLowerCase().includes(value.toLowerCase())
    )

    setResults(filtered)
    setLoading(false)
  }

  const getIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "project":
        return <File className="h-4 w-4" />
      case "blog":
        return <Book className="h-4 w-4" />
      case "snippet":
        return <Code2 className="h-4 w-4" />
      case "resource":
        return <Book className="h-4 w-4" />
    }
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0">
          <DialogHeader className="px-4 pb-4 pt-4">
            <DialogTitle asChild>
              <div className="flex items-center gap-2 text-lg font-normal">
                <CommandIcon className="h-5 w-5" />
                Command Menu
              </div>
            </DialogTitle>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t">
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Command.Input
                value={search}
                onValueChange={handleSearch}
                placeholder="Search..."
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
              {search && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleSearch("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Command.List className="max-h-[300px] overflow-y-auto p-2">
              {loading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : results.length === 0 ? (
                <p className="p-4 text-center text-sm text-muted-foreground">
                  No results found.
                </p>
              ) : (
                results.map((result) => (
                  <Command.Item
                    key={result.id}
                    value={result.title}
                    onSelect={() => {
                      router.push(result.url)
                      setOpen(false)
                    }}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm"
                  >
                    {getIcon(result.type)}
                    <div className="flex flex-col">
                      <span>{result.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {result.description}
                      </span>
                    </div>
                  </Command.Item>
                ))
              )}
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}

