import { prisma } from '@/lib/db';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { AdminRole } from './auth.service';

const COOKIE_NAME = 'godzilla_admin_session';

function getAdminJwtSecret(): Uint8Array {
    const key = process.env.MASTER_ENCRYPTION_KEY || 'temporary-dev-secret-change-me-in-production';
    if (!process.env.MASTER_ENCRYPTION_KEY) {
        console.warn('[SECURITY] MASTER_ENCRYPTION_KEY is missing. Using insecure fallback.');
    }
    return new TextEncoder().encode(key);
}

export class AdminSessionService {
    /**
     * Creates a new session in DB and sets cookie.
     */
    static async createSession(adminId: string, email: string, role: AdminRole, mfaVerified: boolean, ip: string, userAgent: string) {
        const token = await new SignJWT({ adminId, email, role, mfaVerified })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('12h')
            .sign(getAdminJwtSecret());

        await prisma.adminSession.create({
            data: {
                adminId,
                token,
                ipAddress: ip,
                userAgent,
                expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000)
            }
        });

        (await cookies()).set(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });
    }

    /**
     * Retrieves and validates session.
     */
    static async getSession() {
        const token = (await cookies()).get(COOKIE_NAME)?.value;
        if (!token) return null;

        try {
            const { payload } = await jwtVerify(token, getAdminJwtSecret());

            // Critical: DB Check for Revocation
            const dbSession = await prisma.adminSession.findUnique({
                where: { token, revokedAt: null }
            });

            if (!dbSession || dbSession.expiresAt < new Date()) {
                return null;
            }

            return payload as any;
        } catch (error) {
            return null;
        }
    }

    /**
     * Revokes a specific session.
     */
    static async revokeSession(token: string) {
        await prisma.adminSession.update({
            where: { token },
            data: { revokedAt: new Date() }
        });
    }

    /**
     * Revokes all sessions for an admin (e.g., after password change).
     */
    static async revokeAllForAdmin(adminId: string) {
        await prisma.adminSession.updateMany({
            where: { adminId, revokedAt: null },
            data: { revokedAt: new Date() }
        });
    }
}
