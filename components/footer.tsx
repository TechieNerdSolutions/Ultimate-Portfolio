import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-8 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold">Your Name</h3>
            <p className="max-w-xs text-sm text-muted-foreground">
              A full-stack developer building modern web applications and sharing
              knowledge with the community.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-semibold">Navigation</h4>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-primary">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-primary">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Social</h4>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Contact</h4>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Contact Form
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:hello@example.com"
                    className="hover:text-primary"
                  >
                    Email Me
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="mailto:hello@example.com">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

