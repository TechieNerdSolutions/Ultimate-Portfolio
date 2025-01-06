"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Download, Github, Globe, Linkedin, Mail, Phone, Share2, Twitter } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

const socialLinks = [
  {
    name: "Website",
    icon: Globe,
    url: "https://example.com",
    color: "text-blue-500",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com",
    color: "text-gray-900 dark:text-white",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com",
    color: "text-blue-600",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com",
    color: "text-blue-400",
  },
]

export function VirtualCard() {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Your Name - Full Stack Developer",
          text: "Check out my portfolio and let's connect!",
          url: window.location.origin,
        })
      } else {
        await navigator.clipboard.writeText(window.location.origin)
        toast({
          title: "Link copied!",
          description: "The link has been copied to your clipboard.",
        })
      }
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Your Name
TITLE:Full Stack Developer
TEL:+1234567890
EMAIL:hello@example.com
URL:${window.location.origin}
END:VCARD`

    const blob = new Blob([vcard], { type: "text/vcard" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "contact.vcf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={isFlipped ? "back" : "front"}
          initial={{ rotateY: isFlipped ? -180 : 0, opacity: 0 }}
          animate={{ rotateY: isFlipped ? 0 : 0, opacity: 1 }}
          exit={{ rotateY: isFlipped ? 0 : 180, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="relative"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <Card className="relative cursor-pointer">
            {!isFlipped ? (
              <>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle>Your Name</CardTitle>
                      <CardDescription>Full Stack Developer</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>hello@example.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>+1 (234) 567-890</span>
                  </div>
                  <div className="flex gap-2">
                    {socialLinks.map((link) => (
                      <Button
                        key={link.name}
                        variant="ghost"
                        size="icon"
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={link.color}
                        >
                          <link.icon className="h-4 w-4" />
                          <span className="sr-only">{link.name}</span>
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="p-6">
                <div className="grid gap-4">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleShare()
                    }}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Contact
                  </Button>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDownloadVCard()
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download vCard
                  </Button>
                </div>
              </CardContent>
            )}
            <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              Click to flip
            </span>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

