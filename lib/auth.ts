import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

/**
 * JWT Authentication Utilities
 */

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

export interface JWTPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

/**
 * Sign a JWT token for a user
 */
export function signToken(userId: string, email: string): string {
  return jwt.sign(
    { id: userId, email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
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
 * Get authenticated user from request
 */
export function getAuthUser(request: NextRequest): JWTPayload {
  const token = extractToken(request);
  
  if (!token) {
    throw new Error('No authentication token provided');
  }
  
  return verifyToken(token);
}
