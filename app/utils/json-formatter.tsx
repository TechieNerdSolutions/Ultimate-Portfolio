'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Copy, FileJson, Loader2 } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

export function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const formatJson = () => {
    setIsProcessing(true)
    setError('')
    
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
    } catch (err) {
      setError('Invalid JSON format')
      toast({
        title: "Error",
        description: "Invalid JSON format. Please check your input.",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const minifyJson = () => {
    setIsProcessing(true)
    setError('')
    
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
    } catch (err) {
      setError('Invalid JSON format')
      toast({
        title: "Error",
        description: "Invalid JSON format. Please check your input.",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    toast({
      title: "Copied!",
      description: "JSON copied to clipboard"
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>JSON Formatter</CardTitle>
        <CardDescription>
          Format, validate, and minify JSON data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Paste your JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono h-[200px]"
          />
          
          <div className="flex gap-2">
            <Button onClick={formatJson} disabled={isProcessing}>
              {isProcessing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileJson className="mr-2 h-4 w-4" />
              )}
              Format
            </Button>
            <Button onClick={minifyJson} disabled={isProcessing} variant="secondary">
              Minify
            </Button>
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {output && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Result:</span>
                <Button size="sm" variant="ghost" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <pre className="rounded-md bg-muted p-4 font-mono text-sm overflow-auto max-h-[200px]">
                {output}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

