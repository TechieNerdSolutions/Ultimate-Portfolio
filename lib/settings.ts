import { cache } from 'react'
import { Settings } from '@/types/settings'
import { getSettingsFromDb, saveSettingsToDb } from './db'

const defaultSettings: Settings = {
  general: {
    title: "Ultimate Portfolio",
    description: "A modern, customizable portfolio template",
    author: "Your Name",
    email: "your@email.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
  },
  pages: {
    pages: {
      home: true,
      about: true,
      projects: true,
      blog: false,
      contact: true,
      resume: false,
      utilities: false,
      guestbook: false,
      dashboard: false,
    }
  },
  theme: {
    theme: "system",
    primaryColor: "#000000",
    fontFamily: "inter",
    borderRadius: "medium",
    enableAnimation: true,
  },
  integrations: {}
}

export const getSettings = cache(async () => {
  const settings = await getSettingsFromDb()
  return settings || defaultSettings
})

export async function updateSettings(settings: Partial<Settings>) {
  const currentSettings = await getSettings()
  const newSettings = {
    ...currentSettings,
    ...settings,
  }
  await saveSettingsToDb(newSettings)
}

export async function resetSettings() {
  await saveSettingsToDb(defaultSettings)
}

