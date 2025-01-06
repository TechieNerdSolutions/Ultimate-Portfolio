export function ProjectStructuredData({
  title,
  description,
  image,
  datePublished,
  author,
}: {
  title: string
  description: string
  image: string
  datePublished: string
  author: string
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    datePublished: datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
