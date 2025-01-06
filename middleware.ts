import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSettings } from '@/lib/settings'

export async function middleware(request: NextRequest) {
  // Skip middleware for API routes and static files
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/static')
  ) {
    return NextResponse.next()
  }

  const settings = await getSettings()

  // Always allow access to settings page
  if (request.nextUrl.pathname === '/settings') {
    return NextResponse.next()
  }

  // Check if the requested page is enabled
  const page = request.nextUrl.pathname.split('/')[1] || 'home'
  if (!settings.pages.pages[page as keyof typeof settings.pages.pages]) {
    return NextResponse.redirect(new URL('/404', request.url))
  }

  // Add settings to request headers for server components
  const response = NextResponse.next()
  response.headers.set('x-settings', JSON.stringify(settings))
  
  return response
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}

