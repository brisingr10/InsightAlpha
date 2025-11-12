import { SignJWT, jwtVerify } from 'jose'
import { UserRole } from '@prisma/client'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-key'
)

export interface JWTPayload {
  userId: string
  email: string
  role: UserRole
}

/**
 * Create a JWT token
 */
export async function createToken(payload: JWTPayload): Promise<string> {
  const token = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // 7 days expiry
    .sign(JWT_SECRET)

  return token
}

/**
 * Verify a JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as JWTPayload
  } catch (error) {
    return null
  }
}
