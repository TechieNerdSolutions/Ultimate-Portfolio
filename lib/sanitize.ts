import DOMPurify from 'isomorphic-dompurify'
import { marked } from 'marked'

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'b',
      'i',
      'em',
      'strong',
      'a',
      'p',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'br',
      'code',
      'pre',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  })
}

export function markdownToSafeHtml(markdown: string): string {
  const html = marked(markdown)
  return sanitizeHtml(html)
}
