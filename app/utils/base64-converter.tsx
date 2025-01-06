'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Copy, FileUp } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Base64Converter() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [activeTab, setActiveTab] = useState('encode')
  const { toast } = useToast()

  const handleEncode = () => {
    try {
      const encoded = btoa(text)
      setResult(encoded)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encode text. Make sure it contains valid characters.",
        variant: "destructive"
      })
    }
  }

  const handleDecode = () => {
    try {
      const decoded = atob(text)
      setResult(decoded)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decode Base64. Make sure the input is valid.",
        variant: "destructive"
      })
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result
      if (typeof content === 'string') {
        setText(content)
      }
    }
    reader.readAsText(file)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    toast({
      title: "Copied!",
      description: "Result copied to clipboard"
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Base64 Converter</CardTitle>
        <CardDescription>
          Encode or decode text to/from Base64 format
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
          </TabsList>

          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-2">
              <Input
                type="file"
                className="hidden"
                id="file-upload"
                onChange={handleFileUpload}
              />
              <Button asChild variant="outline">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload File
                </label>
              </Button>
            </div>

            <Textarea
              placeholder={activeTab === 'encode' ? "Enter text to encode..." : "Enter Base64 to decode..."}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="font-mono h-[150px]"
            />

            <Button 
              onClick={activeTab === 'encode' ? handleEncode : handleDecode}
              className="w-full"
            >
              {activeTab === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
            </Button>

            {result && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Result:</span>
                  <Button size="sm" variant="ghost" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <pre className="rounded-md bg-muted p-4 font-mono text-sm overflow-auto max-h-[150px] whitespace-pre-wrap">
                  {result}
                </pre>
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

