export const defaultLocale = 'en'
export const locales = ['en', 'es', 'fr', 'de']

export type Locale = (typeof locales)[number]

export const localeNames = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
}

export function getLocaleDirection(locale: Locale) {
  return 'ltr'
}

