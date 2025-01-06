import { NextRequest, NextResponse } from 'next/server'
import { generateToken, verifyToken } from './tokens'

export async function csrf(handler: Function) {
  return async (req: NextRequest) => {
    if (req.method !== 'GET') {
      const token = req.headers.get('x-csrf-token')
      const cookie = req.cookies.get('csrf')

      if (!token || !cookie || token !== cookie.value) {
        return NextResponse.json(
          { error: 'Invalid CSRF token' },
          { status: 403 }
        )
      }
    }

    return handler(req)
  }
}

export function generateCsrfToken() {
  const token = generateToken()
  return {
    token,
    cookie: {
      name: 'csrf',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
    },
  }
}
