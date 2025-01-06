'use client'

import { useEffect, useState } from 'react'
import { SettingsContext } from '@/contexts/settings-context'
import type { Settings } from '@/types/settings'

interface SettingsProviderProps {
  children: React.ReactNode
  initialSettings: Settings
}

export function SettingsProvider({ children, initialSettings }: SettingsProviderProps) {
  const [settings, setSettings] = useState(initialSettings)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setSettings(initialSettings)
  }, [initialSettings])

  return (
    <SettingsContext.Provider value={{ settings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  )
}

