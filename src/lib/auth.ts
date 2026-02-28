import jwt, { SignOptions } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

/**
 * JWT Authentication Utilities
 */

const JWT_SECRET = process.env.JWT_SECRET || 'build-time-placeholder-secret';
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '7d') as string;

// Warn if JWT_SECRET is not set in production
if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  console.warn('WARNING: JWT_SECRET environment variable is not set in production!');
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
    { expiresIn: JWT_EXPIRES_IN } as SignOptions
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
