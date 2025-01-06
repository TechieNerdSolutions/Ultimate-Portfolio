type Person = {
  name: string
  headline: string
  description: string
  image: string
  sameAs: string[]
  url: string
}

type BlogPosting = {
  title: string
  description: string
  image: string
  datePublished: string
  author: Person
  url: string
}

export function generatePersonSchema(person: Person) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: person.url,
    image: person.image,
    jobTitle: person.headline,
    description: person.description,
    sameAs: person.sameAs,
  }
}

export function generateBlogPostSchema(post: BlogPosting) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.datePublished,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: post.author.url,
    },
    url: post.url,
  }
}

