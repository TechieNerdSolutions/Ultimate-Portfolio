"use client"

import { Download } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function DownloadCV() {
  const handleDownload = () => {
    // Using a direct link to the CV file stored in the public folder
    const link = document.createElement('a')
    link.href = '/cv.pdf' // Make sure to add your CV file to the public directory
    link.download = 'YourName-CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button onClick={handleDownload} variant="outline" className="w-full sm:w-auto">
      <Download className="mr-2 h-4 w-4" />
      Download CV
    </Button>
  )
}

