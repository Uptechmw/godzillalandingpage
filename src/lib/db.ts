import { PrismaClient } from '@prisma/client';

/**
 * Prisma Client Singleton
 * 
 * Prevents multiple instances in development (hot reload)
 * and ensures proper connection pooling in production.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Dynamically enforce pgbouncer=true for Supabase transaction pooler
const getDatabaseUrl = () => {
  let url = process.env.DATABASE_URL || '';
  if (url && !url.includes('pgbouncer=true')) {
    url += url.includes('?') ? '&pgbouncer=true' : '?pgbouncer=true';
  }
  return url;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
