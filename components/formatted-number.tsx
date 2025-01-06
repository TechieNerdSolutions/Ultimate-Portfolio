'use client'

import { usePathname } from 'next/navigation'

interface FormattedNumberProps {
  value: number
  format?: Intl.NumberFormatOptions
}

export function FormattedNumber({
  value,
  format = {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  },
}: FormattedNumberProps) {
  const pathname = usePathname()
  const locale = pathname.split('/')[1]

  return (
    <span>
      {new Intl.NumberFormat(locale, format).format(value)}
    </span>
  )
}
