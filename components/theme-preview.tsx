'use client'

import { Card } from "@/components/ui/card"
import { ThemeSettings } from "@/types/settings"

interface ThemePreviewProps {
  settings: Partial<ThemeSettings>
}

export function ThemePreview({ settings }: ThemePreviewProps) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-sm font-medium mb-3">Theme Preview</h3>
      <div className="space-y-4">
        <Card className="p-4">
          <div className="space-y-2">
            <div 
              className="h-2 w-24 rounded"
              style={{ backgroundColor: settings.primaryColor }}
            />
            <div className="h-2 w-16 bg-muted rounded" />
          </div>
        </Card>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            style={{ 
              borderRadius: {
                none: '0',
                small: '0.25rem',
                medium: '0.5rem',
                large: '1rem',
              }[settings.borderRadius || 'medium'],
              backgroundColor: settings.primaryColor,
            }}
          >
            Primary Button
          </button>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            style={{ 
              borderRadius: {
                none: '0',
                small: '0.25rem',
                medium: '0.5rem',
                large: '1rem',
              }[settings.borderRadius || 'medium']
            }}
          >
            Secondary Button
          </button>
        </div>
        <div 
          className="text-sm"
          style={{ 
            fontFamily: {
              inter: 'var(--font-inter)',
              manrope: 'var(--font-manrope)',
              system: 'system-ui, sans-serif',
            }[settings.fontFamily || 'inter']
          }}
        >
          <p>
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </div>
    </div>
  )
}

