import { NextResponse } from 'next/server'
import { serialize } from 'cookie'

export async function POST() {
  try {
    // Clear the auth cookie by setting it to expire immediately
    const cookie = serialize('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      path: '/',
    })

    const response = NextResponse.json({ success: true })
    response.headers.set('Set-Cookie', cookie)

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'An error occurred during logout' },
      { status: 500 }
    )
  }
}
