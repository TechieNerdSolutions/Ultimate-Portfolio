import { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export const baseMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Your Portfolio",
    template: "%s | Your Portfolio",
  },
  description: "A showcase of my work and thoughts on web development",
  keywords: [
    "web development",
    "frontend",
    "backend",
    "full-stack",
    "react",
    "next.js",
    "typescript",
  ],
  authors: [
    {
      name: "Your Name",
      url: baseUrl,
    },
  ],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "Your Portfolio",
    description: "A showcase of my work and thoughts on web development",
    siteName: "Your Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Portfolio",
    description: "A showcase of my work and thoughts on web development",
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

