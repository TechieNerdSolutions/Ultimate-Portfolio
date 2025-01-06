'use client'

import { createContext, useContext } from 'react'
import type { Settings } from '@/types/settings'

interface SettingsContextType {
  settings: Settings
  isLoading: boolean
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

