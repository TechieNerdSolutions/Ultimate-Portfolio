'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  if (!showPrompt) return null

  return (
    <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Install Portfolio App</DialogTitle>
          <DialogDescription>
            Install this app on your device for quick and easy access.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowPrompt(false)}
            className="rounded-md px-4 py-2 text-muted-foreground hover:bg-secondary"
          >
            Not Now
          </button>
          <button
            onClick={handleInstall}
            className="rounded-md bg-primary px-4 py-2 text-white"
          >
            Install
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
