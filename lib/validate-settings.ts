import { z } from 'zod'
import type { Settings } from '@/types/settings'

const settingsSchema = z.object({
  general: z.object({
    title: z.string().min(2),
    description: z.string().min(10),
    author: z.string().min(2),
    email: z.string().email(),
    github: z.string().url(),
    linkedin: z.string().url(),
    twitter: z.string().url().optional(),
    website: z.string().url().optional(),
    googleAnalytics: z.string().optional(),
  }),
  pages: z.object({
    pages: z.object({
      home: z.boolean(),
      about: z.boolean(),
      projects: z.boolean(),
      blog: z.boolean(),
      contact: z.boolean(),
      resume: z.boolean(),
      utilities: z.boolean(),
      guestbook: z.boolean(),
      dashboard: z.boolean(),
    }),
  }),
  theme: z.object({
    theme: z.enum(['light', 'dark', 'system']),
    primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
    fontFamily: z.enum(['inter', 'manrope', 'system']),
    borderRadius: z.enum(['none', 'small', 'medium', 'large']),
    enableAnimation: z.boolean(),
    customCss: z.string().optional(),
  }),
  integrations: z.object({
    github: z.object({
      token: z.string(),
      username: z.string(),
    }).optional(),
    googleAnalytics: z.object({
      measurementId: z.string(),
    }).optional(),
    smtp: z.object({
      host: z.string(),
      port: z.number(),
      user: z.string(),
      password: z.string(),
    }).optional(),
    vercel: z.object({
      token: z.string(),
      teamId: z.string().optional(),
    }).optional(),
  }).optional(),
})

export function validateSettings(settings: unknown): settings is Settings {
  try {
    settingsSchema.parse(settings)
    return true
  } catch (error) {
    return false
  }
}

