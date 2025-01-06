'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { FileUp, Copy, Eye, EyeOff } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function MarkdownPreview() {
  const [markdown, setMarkdown] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result
      if (typeof content === 'string') {
        setMarkdown(content)
      }
    }
    reader.readAsText(file)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown)
    toast({
      title: "Copied!",
      description: "Markdown copied to clipboard"
    })
  }

  const defaultMarkdown = `# Markdown Preview

## Features
- GitHub Flavored Markdown
- Live Preview
- File Upload
- Copy to Clipboard

## Example Table
| Feature | Status |
|---------|--------|
| Tables  | ✅     |
| Lists   | ✅     |
| Code    | ✅     |

## Code Example
\`\`\`typescript
function hello(name: string): string {
  return \`Hello, \${name}!\`
}
\`\`\`
`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Markdown Preview</CardTitle>
        <CardDescription>
          Write and preview markdown with GitHub Flavored Markdown support
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              type="file"
              className="hidden"
              id="markdown-file"
              accept=".md,.markdown,.txt"
              onChange={handleFileUpload}
            />
            <Button asChild variant="outline">
              <label htmlFor="markdown-file" className="cursor-pointer">
                <FileUp className="mr-2 h-4 w-4" />
                Upload Markdown
              </label>
            </Button>
            <Button variant="outline" onClick={() => setMarkdown(defaultMarkdown)}>
              Load Example
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsPreview(!isPreview)}
            >
              {isPreview ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Hide Preview
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Show Preview
                </>
              )}
            </Button>
            <Button variant="outline" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className={isPreview ? 'lg:block hidden' : 'block'}>
              <Textarea
                placeholder="Write your markdown here..."
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="font-mono h-[500px]"
              />
            </div>
            <div className={isPreview ? 'block' : 'lg:block hidden'}>
              <div className="prose prose-sm dark:prose-invert max-w-none rounded-md border p-4 h-[500px] overflow-auto">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {markdown || 'Preview will appear here...'}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

