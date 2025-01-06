'use server'

import { revalidatePath } from 'next/cache'
import { updateSettings } from '@/lib/settings'
import { validateSettings } from '@/lib/validate-settings'
import type { GeneralSettings, PagesSettings, ThemeSettings, IntegrationSettings } from '@/types/settings'

export async function updateGeneralSettings(settings: GeneralSettings) {
  await updateSettings({ general: settings })
  revalidatePath('/settings')
  return { success: true }
}

export async function updatePagesSettings(settings: PagesSettings) {
  await updateSettings({ pages: settings })
  revalidatePath('/settings')
  return { success: true }
}

export async function updateThemeSettings(settings: ThemeSettings) {
  await updateSettings({ theme: settings })
  revalidatePath('/settings')
  return { success: true }
}

export async function updateIntegrationSettings(settings: IntegrationSettings) {
  await updateSettings({ integrations: settings })
  revalidatePath('/settings')
  return { success: true }
}

export async function importSettings(settings: string) {
  try {
    const parsedSettings = JSON.parse(settings)
    if (!validateSettings(parsedSettings)) {
      return { success: false, error: 'Invalid settings format' }
    }
    await updateSettings(parsedSettings)
    revalidatePath('/settings')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Invalid settings file' }
  }
}

