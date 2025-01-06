'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { downloadSourceCode } from "./actions"

export function DownloadButton() {
  const [isDownloading, setIsDownloading] = useState(false)
  const { toast } = useToast()

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const base64 = await downloadSourceCode()
      
      // Convert base64 to blob
      const content = atob(base64)
      const bytes = new Uint8Array(content.length)
      for (let i = 0; i < content.length; i++) {
        bytes[i] = content.charCodeAt(i)
      }
      const blob = new Blob([bytes.buffer], { type: 'application/zip' })
      
      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'utilities-source-code.zip'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Success",
        description: "Source code downloaded successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download source code",
        variant: "destructive"
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      className="ml-auto"
    >
      {isDownloading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Downloading...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download Source Code
        </>
      )}
    </Button>
  )
}

