'use client'

import { LayoutSettings } from "@/types/settings"

interface LayoutPreviewProps {
  settings: LayoutSettings
}

export function LayoutPreview({ settings }: LayoutPreviewProps) {
  return (
    <div className="relative aspect-video w-full border rounded-lg overflow-hidden">
      {/* Header */}
      <div
        className={`absolute top-0 left-0 right-0 bg-primary/10 ${
          settings.header.sticky ? 'sticky top-0' : ''
        }`}
        style={{ height: settings.header.height }}
      >
        <div className="h-full flex items-center px-4">
          <div className="h-2 w-8 bg-primary rounded" />
        </div>
      </div>

      {/* Sidebar */}
      {settings.type === 'custom' && settings.sidebar?.enabled && (
        <div
          className="absolute top-0 bottom-0 bg-muted"
          style={{
            width: settings.sidebar.width,
            [settings.sidebar.position]: 0,
          }}
        >
          <div className="p-4 space-y-2">
            <div className="h-2 w-12 bg-primary/20 rounded" />
            <div className="h-2 w-16 bg-primary/20 rounded" />
            <div className="h-2 w-14 bg-primary/20 rounded" />
          </div>
        </div>
      )}

      {/* Content Area */}
      <div
        className="h-full"
        style={{
          marginTop: settings.header.height,
          marginLeft: settings.type === 'custom' && settings.sidebar?.enabled && settings.sidebar.position === 'left' ? settings.sidebar.width : 0,
          marginRight: settings.type === 'custom' && settings.sidebar?.enabled && settings.sidebar.position === 'right' ? settings.sidebar.width : 0,
        }}
      >
        <div className="p-4 space-y-2">
          <div className="h-2 w-24 bg-primary/20 rounded" />
          <div className="h-2 w-32 bg-primary/20 rounded" />
          <div className="h-2 w-20 bg-primary/20 rounded" />
        </div>
      </div>

      {/* Footer */}
      {settings.footer.enabled && (
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-primary/10">
          <div className="h-full flex items-center justify-between px-4">
            <div className="h-2 w-24 bg-primary/20 rounded" />
            {settings.footer.showSocialLinks && (
              <div className="flex gap-2">
                <div className="h-4 w-4 rounded-full bg-primary/20" />
                <div className="h-4 w-4 rounded-full bg-primary/20" />
                <div className="h-4 w-4 rounded-full bg-primary/20" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

