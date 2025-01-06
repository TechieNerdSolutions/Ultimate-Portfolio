'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
]

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const currentLocale = pathname.split('/')[1]

  const handleLanguageChange = (locale: string) => {
    const newPathname = pathname.replace(
      `/${currentLocale}`,
      `/${locale}`
    )
    router.push(newPathname)
  }

  return (
    <Select
      value={currentLocale}
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
