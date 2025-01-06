import { Suspense } from 'react'
import { initTranslations } from '@/lib/i18n'
import { LanguageSwitcher } from '@/components/language-switcher'

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const { t } = await initTranslations(lang, ['common'])

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">{t('hero.title')}</h1>
        <LanguageSwitcher />
      </header>

      <section className="mb-12 text-center">
        <h2 className="mb-4 text-2xl">{t('hero.subtitle')}</h2>
        <button className="rounded-md bg-primary px-6 py-3 text-white">
          {t('hero.cta')}
        </button>
      </section>

      <section>
        <h2 className="mb-6 text-3xl font-bold">
          {t('projects.title')}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Project cards */}
        </div>
        <div className="mt-8 text-center">
          <button className="text-primary hover:underline">
            {t('projects.viewAll')}
          </button>
        </div>
      </section>
    </div>
  )
}
