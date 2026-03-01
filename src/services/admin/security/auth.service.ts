import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
// @ts-ignore - Prisma might not have generated the enum yet
import { AdminRole as PrismaAdminRole } from '@prisma/client';
import { RBACService, AdminPermission } from './rbac';
import { prisma as prismaClient } from '@/lib/db';
const prisma = prismaClient as any;
import { AdminOTPService } from './otp.service';
import { RateLimiterService } from './rate-limiter.service';
import { verifyPassword } from '@/lib/hash';

// Local type fallback for AdminRole
export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'SUPPORT' | 'BILLING_ADMIN';

function getAdminJwtSecret(): Uint8Array {
    const key = process.env.MASTER_ENCRYPTION_KEY || 'temporary-dev-secret-change-me-in-production';
    if (!process.env.MASTER_ENCRYPTION_KEY) {
        console.warn('[SECURITY] MASTER_ENCRYPTION_KEY is missing. Using insecure fallback.');
    }
    return new TextEncoder().encode(key);
}

const COOKIE_NAME = 'godzilla_admin_session';
const OTP_PENDING_COOKIE = 'godzilla_admin_otp_pending';

export interface AdminSession {
    adminId: string;
    email: string;
    name: string | null;
    role: AdminRole;
    mfaVerified: boolean;
}

export interface AdminTokenPayload {
    adminId: string;
    email: string;
    name: string | null;
    role: AdminRole;
    mfaVerified: boolean;
}

import { sendAdminOTPEmail } from '@/lib/email';
import { SecretsService } from '../config/settings.service';

/**
 * Service for administrative authentication and session management.
 */
export class AdminAuthService {
    /**
     * Initializes a login flow. If SUPER_ADMIN, requires OTP.
     */
    static async login(email: string, password: string, ip: string, userAgent: string): Promise<{ requires2FA: boolean; adminId?: string }> {
        // 1. Rate Limiting
        const isAllowed = await RateLimiterService.checkLoginAttempt(ip);
        if (!isAllowed) {
            throw new Error("Too many login attempts. Please try again in a minute.");
        }

        const admin = await prisma.adminUser.findUnique({ where: { email } });

        const isPasswordValid = admin ? await verifyPassword(password, admin.passwordHash) : false;

        if (!admin || !admin.active || !isPasswordValid) {
            if (admin) {
                const newAttempts = admin.failedLoginAttempts + 1;
                await prisma.adminUser.update({
                    where: { id: admin.id },
                    data: {
                        failedLoginAttempts: newAttempts,
                        lockedUntil: newAttempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null
                    }
                });

                if (newAttempts >= 5) {
                    throw new Error("Too many failed attempts. Account locked for 15 minutes.");
                }
            }
            throw new Error("Invalid credentials.");
        }

        if (admin.lockedUntil && admin.lockedUntil > new Date()) {
            throw new Error(`Account is locked until ${admin.lockedUntil.toLocaleTimeString()}.`);
        }

        // 2. IP Anomaly Detection
        if (admin.lastLoginIP && admin.lastLoginIP !== ip) {
            console.warn(`[SECURITY] Suspicious login for ${email} from new IP: ${ip} (Previous: ${admin.lastLoginIP})`);
        }

        await prisma.adminUser.update({
            where: { id: admin.id },
            data: {
                failedLoginAttempts: 0,
                lastLoginAt: new Date(),
                lastLoginIP: ip
            }
        });

        if (admin.role === 'SUPER_ADMIN') {
            const otp = await AdminOTPService.generateOTP(admin.id);
            console.log(`[SECURITY] OTP generated for ${email}: ${otp}`);

            // Fetch SMTP settings from database secrets
            try {
                const smtpConfig = await SecretsService.getSmtpConfig();
                await sendAdminOTPEmail(admin.email, otp, smtpConfig);
            } catch (emailError) {
                console.error('[SECURITY] Failed to send OTP email:', emailError);
            }

            const otpToken = await new SignJWT({ adminId: admin.id, email: admin.email, role: admin.role })
                .setProtectedHeader({ alg: 'HS256' })
                .setExpirationTime('5m')
                .sign(getAdminJwtSecret());

            (await cookies()).set(OTP_PENDING_COOKIE, otpToken, { httpOnly: true, secure: true });

            return { requires2FA: true, adminId: admin.id };
        }

        await this.createSession(admin.id, admin.email, admin.name, admin.role as AdminRole, true, ip, userAgent);
        return { requires2FA: false };
    }

    /**
     * Completes 2FA verification.
     */
    static async verify2FA(otp: string, ip: string, userAgent: string): Promise<void> {
        const otpToken = (await cookies()).get(OTP_PENDING_COOKIE)?.value;
        if (!otpToken) throw new Error("MFA session expired.");

        const { payload } = await jwtVerify(otpToken, getAdminJwtSecret());
        const { adminId, email, role } = payload as any;

        const isValid = await AdminOTPService.verifyOTP(adminId, otp);
        if (!isValid) {
            // Apply rate limiting on 2FA verification attempts too
            await RateLimiterService.check(`ratelimit:2fa_verify:${adminId}`, 5, 300); // Trigger a count even if we don't block here yet
            throw new Error("Invalid OTP.");
        }

        (await cookies()).delete(OTP_PENDING_COOKIE);
        await this.createSession(adminId, email, (payload as any).name || null, role, true, ip, userAgent);
    }

    /**
     * Creates a signed JWT and persists a session in the DB.
     */
    static async createSession(adminId: string, email: string, name: string | null, role: AdminRole, mfaVerified: boolean, ip: string, userAgent: string) {
        const token = await new SignJWT({ adminId, email, name, role, mfaVerified })
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
            path: '/',
            maxAge: 12 * 60 * 60 // 12 hours
        });
    }

    /**
     * Edge-compatible token verification (Used in Middleware)
     */
    static async verifyAdminToken(token: string): Promise<AdminTokenPayload | null> {
        try {
            const { payload } = await jwtVerify(token, getAdminJwtSecret());
            return payload as unknown as AdminTokenPayload;
        } catch (error) {
            return null;
        }
    }

    /**
     * Verifies the current admin session.
     */
    static async getSession(): Promise<AdminSession | null> {
        const token = (await cookies()).get(COOKIE_NAME)?.value;
        if (!token) return null;

        try {
            const { payload } = await jwtVerify(token, getAdminJwtSecret());
            const session = payload as any as AdminSession;

            const dbSession = await prisma.adminSession.findUnique({
                where: { token, revokedAt: null }
            });

            if (!dbSession || dbSession.expiresAt < new Date()) {
                return null;
            }

            return session;
        } catch (error) {
            return null;
        }
    }

    /**
     * Middleware check for RBAC.
     */
    static async guard(permission: AdminPermission): Promise<boolean> {
        const session = await this.getSession();
        if (!session) return false;

        if (session.role === 'SUPER_ADMIN' && !session.mfaVerified) {
            return false;
        }

        return RBACService.can(session.role, permission);
    }

    static async logout() {
        const token = (await cookies()).get(COOKIE_NAME)?.value;
        if (token) {
            await prisma.adminSession.update({
                where: { token },
                data: { revokedAt: new Date() }
            });
        }
        (await cookies()).delete(COOKIE_NAME);
    }
}
