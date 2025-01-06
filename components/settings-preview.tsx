'use client'

import { useState, useTransition } from 'react'
import { Settings } from '@/types/settings'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SettingsPreviewProps {
  settings: Partial<Settings>
  defaultSettings: Settings
}

export function SettingsPreview({ settings, defaultSettings }: SettingsPreviewProps) {
  const [isPending, startTransition] = useTransition()
  const [isPreviewVisible, setIsPreviewVisible] = useState(true)
  const mergedSettings = { ...defaultSettings, ...settings }

  const togglePreview = () => {
    startTransition(() => {
      setIsPreviewVisible(!isPreviewVisible)
    })
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex flex-col items-end space-y-4">
        <Button
          variant="outline"
          size="sm"
          onClick={togglePreview}
          className="shadow-lg"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isPreviewVisible ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" />
              Hide Preview
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Show Preview
            </>
          )}
        </Button>

        <Card
          className={cn(
            "w-[300px] p-4 shadow-lg transition-all duration-200",
            isPreviewVisible ? "translate-x-0" : "translate-x-[calc(100%+1rem)]"
          )}
        >
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Layout Preview</h3>
              <div 
                className="mt-2 rounded border p-2"
                style={{
                  backgroundColor: mergedSettings.theme.primaryColor,
                }}
              >
                <div className="h-4 w-24 rounded bg-white/20" />
              </div>
            </div>

            <div>
              <h3 className="font-medium">Typography</h3>
              <p
                className="mt-2"
                style={{
                  fontFamily: {
                    inter: 'var(--font-inter)',
                    manrope: 'var(--font-manrope)',
                    system: 'system-ui, sans-serif',
                  }[mergedSettings.theme.fontFamily],
                }}
              >
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <h3 className="font-medium">Navigation</h3>
              <div className="mt-2 space-y-1">
                {mergedSettings.general.navigation.map((item) => (
                  <div
                    key={item.id}
                    className="rounded px-2 py-1 text-sm"
                    style={{
                      backgroundColor: mergedSettings.theme.primaryColor + '20',
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Add more preview sections as needed */}
          </div>
        </Card>
      </div>
    </div>
  )
}

