'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Download, FileImage, Loader2 } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

export function ImageConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [format, setFormat] = useState('webp')
  const [quality, setQuality] = useState(80)
  const [isConverting, setIsConverting] = useState(false)
  const [convertedImage, setConvertedImage] = useState<string | null>(null)
  const { toast } = useToast()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive"
      })
      return
    }

    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const convertImage = async () => {
    if (!selectedFile) return

    setIsConverting(true)
    try {
      const image = new Image()
      image.src = preview!
      await new Promise((resolve) => { image.onload = resolve })

      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Could not get canvas context')

      ctx.drawImage(image, 0, 0)
      const convertedDataUrl = canvas.toDataURL(`image/${format}`, quality / 100)
      setConvertedImage(convertedDataUrl)

      toast({
        title: "Success",
        description: "Image converted successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert image",
        variant: "destructive"
      })
    } finally {
      setIsConverting(false)
    }
  }

  const downloadImage = () => {
    if (!convertedImage) return

    const link = document.createElement('a')
    link.href = convertedImage
    link.download = `converted-image.${format}`
    link.click()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Converter</CardTitle>
        <CardDescription>
          Convert images between different formats and optimize quality
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-contain p-4"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileImage className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, GIF, WEBP
                  </p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={isConverting}
              />
            </label>
          </div>

          {selectedFile && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium">Output Format</label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="webp">WebP</SelectItem>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium">Quality: {quality}%</label>
                  <Slider
                    value={[quality]}
                    onValueChange={(value) => setQuality(value[0])}
                    min={1}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>

              <Button
                onClick={convertImage}
                disabled={isConverting}
                className="w-full"
              >
                {isConverting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Converting...
                  </>
                ) : (
                  'Convert Image'
                )}
              </Button>

              {convertedImage && (
                <div className="space-y-2">
                  <img
                    src={convertedImage}
                    alt="Converted"
                    className="rounded-lg border"
                  />
                  <Button
                    onClick={downloadImage}
                    className="w-full"
                    variant="secondary"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Converted Image
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

