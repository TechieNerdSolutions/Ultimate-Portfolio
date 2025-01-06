'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { History, RotateCcw, Loader2 } from 'lucide-react'
import { getSettingsHistory, restoreSettings } from '@/lib/db'
import { format } from 'date-fns'

interface SettingsVersion {
  timestamp: string
  settings: any
}

export function SettingsHistory() {
  const [versions, setVersions] = useState<SettingsVersion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)
  const { toast } = useToast()

  const loadHistory = async () => {
    setIsLoading(true)
    try {
      const history = await getSettingsHistory()
      setVersions(history)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load settings history",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRestore = async (version: number) => {
    setIsRestoring(true)
    try {
      const success = await restoreSettings(version)
      if (success) {
        toast({
          title: "Settings restored",
          description: "Your settings have been restored successfully",
        })
        // Reload the page to apply restored settings
        window.location.reload()
      } else {
        throw new Error('Failed to restore settings')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to restore settings",
        variant: "destructive",
      })
    } finally {
      setIsRestoring(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings History</CardTitle>
        <CardDescription>
          View and restore previous versions of your settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          onClick={loadHistory}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <History className="mr-2 h-4 w-4" />
              Load History
            </>
          )}
        </Button>

        {versions.length > 0 && (
          <div className="space-y-2">
            {versions.map((version, index) => (
              <div
                key={version.timestamp}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Version {versions.length - index}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(version.timestamp), 'PPpp')}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRestore(index)}
                  disabled={isRestoring}
                >
                  {isRestoring ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RotateCcw className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}

        {versions.length === 0 && !isLoading && (
          <p className="text-sm text-muted-foreground">
            No history available
          </p>
        )}
      </CardContent>
    </Card>
  )
}

