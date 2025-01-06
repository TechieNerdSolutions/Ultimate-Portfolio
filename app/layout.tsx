import { Metadata } from 'next'

export const metadata: Metadata = {
  manifest: '/manifest.json',
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          href="/icons/icon-192x192.png"
        />
      </head>
      <body>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
