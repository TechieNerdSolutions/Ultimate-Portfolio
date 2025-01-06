'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeSettings } from '@/types/settings'

const queryClient = new QueryClient()

interface ProvidersProps {
  children: React.ReactNode
  themeSettings: ThemeSettings
}

export function Providers({ children, themeSettings }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemeProvider
        attribute="class"
        defaultTheme={themeSettings.theme}
        enableSystem
      >
        {children}
      </NextThemeProvider>
    </QueryClientProvider>
  )
}

