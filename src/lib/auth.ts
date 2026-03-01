import * as jose from 'jose';
import { NextRequest } from 'next/server';

/**
 * JWT Authentication Utilities (Edge Runtime Compatible)
 * Using 'jose' instead of 'jsonwebtoken' so it works in Middleware
 */

const JWT_SECRET = process.env.JWT_SECRET || 'build-time-placeholder-secret';
const secret = new TextEncoder().encode(JWT_SECRET);

export interface JWTPayload {
  id: string;
  email: string;
}

/**
 * Sign a JWT token for a user
 */
export async function signToken(userId: string, email: string): Promise<string> {
  const token = await new jose.SignJWT({ id: userId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  return token;
}

/**
 * Sync version of signToken (legacy/compatibility if needed)
 * Note: jose is inherently async. For now, we update callers to await.
 */

/**
 * Verify and decode a JWT token (Async)
 */
export async function verifyToken(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return payload as unknown as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Extract token from Authorization header
 */
export function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    return null;
  }

  // Support both "Bearer <token>" and "<token>"
  const parts = authHeader.split(' ');
  return parts.length === 2 ? parts[1] : authHeader;
}

/**
 * Get authenticated user from request (Async)
 */
export async function getAuthUser(request: NextRequest): Promise<JWTPayload> {
  const token = extractToken(request);

  if (!token) {
    throw new Error('No authentication token provided');
  }

  return await verifyToken(token);
}
