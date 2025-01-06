"use client"

import { useState } from "react"
import { Book, ExternalLink, Search, Tag } from 'lucide-react'
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const resources = [
  {
    title: "Modern JavaScript for React Developers",
    description:
      "A comprehensive guide to JavaScript features commonly used in React applications.",
    type: "Article",
    link: "https://example.com",
    tags: ["JavaScript", "React", "ES6"],
  },
  {
    title: "Building Scalable APIs with Node.js",
    description:
      "Learn how to build and structure large-scale Node.js applications.",
    type: "Course",
    link: "https://example.com",
    tags: ["Node.js", "API", "Backend"],
  },
  {
    title: "Advanced TypeScript Patterns",
    description: "Deep dive into TypeScript's advanced type system and patterns.",
    type: "Book",
    link: "https://example.com",
    tags: ["TypeScript", "Patterns"],
  },
  {
    title: "Web Performance Optimization",
    description:
      "Techniques and strategies for optimizing web application performance.",
    type: "Video",
    link: "https://example.com",
    tags: ["Performance", "Optimization"],
  },
]

const resourceTypes = ["All", "Article", "Course", "Book", "Video"]

export function ResourceLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    const matchesType =
      selectedType === "All" || resource.type === selectedType

    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h2 className="font-display text-3xl font-bold">Resource Library</h2>
        <p className="text-lg text-muted-foreground">
          Curated collection of learning resources and references
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={selectedType}
            onValueChange={setSelectedType}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {resourceTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filteredResources.map((resource, index) => (
          <motion.div
            key={resource.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="line-clamp-1">
                      {resource.title}
                    </CardTitle>
                    <CardDescription>{resource.type}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">Open resource</span>
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{resource.description}</p>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

