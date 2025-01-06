'use client'

import { usePathname } from 'next/navigation'

interface FormattedDateProps {
  date: Date | string
  format?: Intl.DateTimeFormatOptions
}

export function FormattedDate({
  date,
  format = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
}: FormattedDateProps) {
  const pathname = usePathname()
  const locale = pathname.split('/')[1]

  return (
    <time dateTime={new Date(date).toISOString()}>
      {new Intl.DateTimeFormat(locale, format).format(
        new Date(date)
      )}
    </time>
  )
}
