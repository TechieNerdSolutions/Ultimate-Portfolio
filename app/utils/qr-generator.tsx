'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateQR } from "./actions"
import { Download, Loader2 } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

export function QrGenerator() {
  const [input, setInput] = useState('')
  const [size, setSize] = useState('200')
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const qrDataUrl = await generateQR(input, parseInt(size))
      setQrCode(qrDataUrl)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const downloadQR = () => {
    if (!qrCode) return
    const link = document.createElement('a')
    link.download = 'qr-code.png'
    link.href = qrCode
    link.click()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Generator</CardTitle>
        <CardDescription>
          Generate QR codes for URLs, text, or contact information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter text or URL"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="200">200px</SelectItem>
                <SelectItem value="300">300px</SelectItem>
                <SelectItem value="400">400px</SelectItem>
                <SelectItem value="500">500px</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Generate'
              )}
            </Button>
          </div>
          {qrCode && (
            <div className="flex flex-col items-center gap-4">
              <img src={qrCode} alt="Generated QR Code" />
              <Button onClick={downloadQR}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

