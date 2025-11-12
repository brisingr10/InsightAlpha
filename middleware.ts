import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/auth/jwt'
import { UserRole } from '@prisma/client'

const publicPaths = ['/login', '/register']
const adminPaths = ['/admin', '/dashboard/admin']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Check for auth token
  const token = request.cookies.get('auth_token')?.value

  if (!token) {
    // Redirect to login if not authenticated
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Verify token
  const payload = await verifyToken(token)

  if (!payload) {
    // Invalid token, redirect to login
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Check admin-only routes
  if (
    adminPaths.some(path => pathname.startsWith(path)) &&
    payload.role !== UserRole.ADMIN
  ) {
    // Redirect non-admins to home
    return NextResponse.redirect(new URL('/home', request.url))
  }

  // Allow public company pages for authenticated users
  if (pathname.startsWith('/company/')) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
