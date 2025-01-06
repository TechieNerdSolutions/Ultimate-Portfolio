import { Metadata } from "next"

interface SEOProps {
  title: string
  description: string
  image?: string
  type?: string
  path: string
}

export function generateMetadata({
  title,
  description,
  image,
  type = "website",
  path,
}: SEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const url = `${baseUrl}${path}`
  const ogImage = image || `${baseUrl}/og-image.jpg`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Your Portfolio",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@yourusername",
    },
    verification: {
      google: "your-google-verification-code",
    },
    alternates: {
      canonical: url,
    },
  }
}

