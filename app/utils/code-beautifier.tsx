'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUp, Copy, Loader2 } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import prettier from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'
import parserHtml from 'prettier/parser-html'
import parserCss from 'prettier/parser-postcss'

const languages = [
  { value: 'javascript', label: 'JavaScript', parser: 'babel' },
  { value: 'html', label: 'HTML', parser: 'html' },
  { value: 'css', label: 'CSS', parser: 'css' },
]

export function CodeBeautifier() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result
      if (typeof content === 'string') {
        setCode(content)
      }
    }
    reader.readAsText(file)
  }

  const beautifyCode = async () => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please enter some code to beautify",
        variant: "destructive"
      })
      return
    }

    setIsProcessing(true)
    try {
      const parser = languages.find(l => l.value === language)?.parser
      const options = {
        parser,
        plugins: [parserBabel, parserHtml, parserCss],
        semi: true,
        singleQuote: true,
        tabWidth: 2,
      }

      const formatted = await prettier.format(code, options)
      setCode(formatted)
      toast({
        title: "Success",
        description: "Code beautified successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to beautify code. Please check your input.",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copied!",
      description: "Code copied to clipboard"
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Beautifier</CardTitle>
        <CardDescription>
          Format and beautify your code with proper indentation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              type="file"
              className="hidden"
              id="code-file"
              accept=".js,.jsx,.ts,.tsx,.html,.css"
              onChange={handleFileUpload}
            />
            <Button asChild variant="outline">
              <label htmlFor="code-file" className="cursor-pointer">
                <FileUp className="mr-2 h-4 w-4" />
                Upload File
              </label>
            </Button>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <Textarea
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono h-[400px]"
          />

          <Button
            onClick={beautifyCode}
            disabled={isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Beautify Code'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

