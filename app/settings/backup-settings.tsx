'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Download, Upload, Loader2 } from 'lucide-react'
import { getSettings } from '@/lib/settings'
import { importSettings } from './actions'

export function BackupSettings() {
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const { toast } = useToast()

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const settings = await getSettings()
      const blob = new Blob([JSON.stringify(settings, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `portfolio-settings-${new Date().toISOString()}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Settings exported",
        description: "Your settings have been exported successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    const reader = new FileReader()

    reader.onload = async (e) => {
      try {
        const content = e.target?.result
        if (typeof content !== 'string') throw new Error('Invalid file')

        const result = await importSettings(content)
        if (!result.success) throw new Error(result.error)

        toast({
          title: "Settings imported",
          description: "Your settings have been imported successfully.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to import settings. Please check your file.",
          variant: "destructive",
        })
      } finally {
        setIsImporting(false)
      }
    }

    reader.readAsText(file)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backup Settings</CardTitle>
        <CardDescription>
          Export or import your portfolio settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Export Settings</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Download a backup of your current settings
          </p>
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="mt-4"
          >
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export Settings
              </>
            )}
          </Button>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Import Settings</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Restore settings from a backup file
          </p>
          <div className="mt-4">
            <input
              type="file"
              id="settings-import"
              className="hidden"
              accept=".json"
              onChange={handleImport}
              disabled={isImporting}
            />
            <Button
              asChild
              variant="outline"
              disabled={isImporting}
            >
              <label htmlFor="settings-import">
                {isImporting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Import Settings
                  </>
                )}
              </label>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

