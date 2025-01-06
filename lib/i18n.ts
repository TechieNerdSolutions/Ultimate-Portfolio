import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'

export async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance?: any,
  resources?: any
) {
  const i18n = i18nInstance || createInstance()

  i18n.use(initReactI18next)

  if (!resources) {
    i18n.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./dictionaries/${language}/${namespace}.json`)
      )
    )
  }

  await i18n.init({
    lng: locale,
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', 'fr', 'de'],
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : ['en', 'es', 'fr', 'de'],
  })

  return i18n
}
