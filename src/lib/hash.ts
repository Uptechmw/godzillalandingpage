import bcrypt from 'bcryptjs';

/**
 * Password Hashing Utilities
 * Uses bcrypt with cost factor 12 for security
 */

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
