import { kv } from '@vercel/kv'
import { Settings } from '@/types/settings'

const SETTINGS_KEY = 'portfolio:settings'
const SETTINGS_HISTORY_KEY = 'portfolio:settings:history'

export async function getSettingsFromDb(): Promise<Settings | null> {
  try {
    return await kv.get(SETTINGS_KEY)
  } catch (error) {
    console.error('Failed to get settings:', error)
    return null
  }
}

export async function saveSettingsToDb(settings: Settings): Promise<void> {
  try {
    // Save current settings to history first
    const currentSettings = await getSettingsFromDb()
    if (currentSettings) {
      await kv.lpush(SETTINGS_HISTORY_KEY, {
        timestamp: new Date().toISOString(),
        settings: currentSettings,
      })
      // Keep only last 10 versions
      await kv.ltrim(SETTINGS_HISTORY_KEY, 0, 9)
    }

    // Save new settings
    await kv.set(SETTINGS_KEY, settings)
  } catch (error) {
    console.error('Failed to save settings:', error)
    throw new Error('Failed to save settings')
  }
}

export async function getSettingsHistory() {
  try {
    return await kv.lrange(SETTINGS_HISTORY_KEY, 0, -1)
  } catch (error) {
    console.error('Failed to get settings history:', error)
    return []
  }
}

export async function restoreSettings(version: number): Promise<boolean> {
  try {
    const history = await getSettingsHistory()
    const settings = history[version]?.settings
    if (!settings) return false

    await kv.set(SETTINGS_KEY, settings)
    return true
  } catch (error) {
    console.error('Failed to restore settings:', error)
    return false
  }
}

