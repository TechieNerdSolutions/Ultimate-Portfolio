import { Metadata } from "next"

type MetadataProps = {
  title?: string
  description?: string
  image?: string
  path: string
  type?: "website" | "article"
  publishedTime?: string
  authors?: Array<{ name: string; url: string }>
}

export function generateMetadata({
  title,
  description,
  image,
  path,
  type = "website",
  publishedTime,
  authors,
}: MetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const url = `${baseUrl}${path}`
  const ogImage = image || `${baseUrl}/og-image.jpg`

  return {
    title: title ? `${title} | Your Portfolio` : "Your Portfolio",
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title || "Your Portfolio",
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
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: title || "Your Portfolio",
      description,
      images: [ogImage],
      creator: "@yourusername",
    },
    authors: authors || [
      {
        name: "Your Name",
        url: baseUrl,
      },
    ],
  }
}

