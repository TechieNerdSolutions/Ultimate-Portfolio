import { Inter, Raleway, Fira_Code } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from 'next/script'

import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { CustomCursor } from "@/components/custom-cursor"
import { Footer } from "@/components/footer"
import { MouseSpotlight } from "@/components/mouse-spotlight"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ChatWidget } from "@/components/chat-widget"
import { SkipLink } from "@/components/skip-link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { StatusIndicator } from "@/components/status-indicator"
import { cn } from "@/lib/utils"

import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" })
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira" })

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          raleway.variable,
          firaCode.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SkipLink />
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center justify-between">
                <MainNav />
                <div className="flex items-center gap-2">
                  <LanguageSwitcher />
                  <StatusIndicator />
                </div>
              </div>
            </header>
            <main id="main-content" tabIndex={-1} className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <CustomCursor />
          <MouseSpotlight />
          <ScrollToTop />
          <ChatWidget />
          <Suspense fallback={null}>
            <Analytics />
            <SpeedInsights />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}

