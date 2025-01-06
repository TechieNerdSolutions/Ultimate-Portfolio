'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { uploadFile } from "./actions"
import { FileUp, Loader2, Copy, Download } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

export function FileSharing() {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [shareUrl, setShareUrl] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.size <= 100 * 1024 * 1024) { // 100MB limit
      setFile(selectedFile)
    } else {
      toast({
        title: "Error",
        description: "File size must be less than 100MB",
        variant: "destructive"
      })
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await uploadFile(formData, (progress) => {
        setProgress(progress)
      })

      setShareUrl(response.url)
      toast({
        title: "Success",
        description: "File uploaded successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
      setProgress(0)
    }
  }

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "Copied!",
      description: "Share URL copied to clipboard"
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Sharing</CardTitle>
        <CardDescription>
          Share files up to 100MB. Files are automatically deleted after 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileUp className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  Max file size: 100MB
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </label>
          </div>

          {file && (
            <div className="space-y-2">
              <p className="text-sm font-medium">{file.name}</p>
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Upload'
                )}
              </Button>
              {isUploading && (
                <Progress value={progress} className="h-2" />
              )}
            </div>
          )}

          {shareUrl && (
            <div className="flex items-center gap-2 rounded-md border p-2">
              <span className="flex-1 font-mono text-sm truncate">
                {shareUrl}
              </span>
              <Button size="sm" variant="ghost" onClick={copyShareUrl}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" asChild>
                <a href={shareUrl} download>
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

