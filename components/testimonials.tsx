"use client"

import Image from "next/image"
import { Quote } from 'lucide-react'
import { motion } from "framer-motion"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

const testimonials = [
  {
    quote:
      "Working with them was a fantastic experience. They delivered our project on time and exceeded our expectations with the quality of their work.",
    author: "Sarah Johnson",
    title: "CEO, TechStart",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "Their attention to detail and technical expertise helped us create a beautiful and performant web application. Highly recommended!",
    author: "Michael Chen",
    title: "CTO, Innovation Labs",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "Outstanding development skills and great communication throughout the project. They're now our go-to developer for all web projects.",
    author: "Emily Rodriguez",
    title: "Product Manager, DesignCo",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function Testimonials() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold">Client Testimonials</h2>
        <p className="mt-2 text-muted-foreground">
          What clients say about working with me
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.author}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <Quote className="h-8 w-8 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{testimonial.quote}</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-4">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

