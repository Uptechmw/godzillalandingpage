import { prisma } from '@/lib/db';
import { randomInt, createHash } from 'crypto';
import { AdminAuthService } from '../security/auth.service';

/**
 * Service for managing Administrative 2FA (Email OTP).
 */
export class AdminOTPService {
    private static readonly OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
    private static readonly MAX_ATTEMPTS = 5;

    /**
     * Generates a 6-digit OTP, hashes it, and stores it in the DB.
     * Returns the plaintext OTP to be sent via email.
     */
    static async generateOTP(adminId: string): Promise<string> {
        const otp = randomInt(100000, 999999).toString();
        const otpHash = this.hashOTP(otp);
        const expiresAt = new Date(Date.now() + this.OTP_EXPIRY_MS);

        await prisma.adminOTP.create({
            data: {
                adminId,
                otpHash,
                expiresAt,
            }
        });

        return otp;
    }

    /**
     * Verifies an OTP for a given admin.
     */
    static async verifyOTP(adminId: string, otp: string): Promise<boolean> {
        const otpHash = this.hashOTP(otp);

        const record = await prisma.adminOTP.findFirst({
            where: {
                adminId,
                usedAt: null,
                expiresAt: { gt: new Date() }
            },
            orderBy: { createdAt: 'desc' }
        });

        if (!record) {
            throw {
                success: false,
                errorCode: 'OTP_EXPIRED',
                message: "Authorization code has expired or is invalid.",
                requestId: crypto.randomUUID()
            };
        }

        if (record.attemptCount >= this.MAX_ATTEMPTS) {
            throw {
                success: false,
                errorCode: 'OTP_TOO_MANY_ATTEMPTS',
                message: "Extreme failure count detected. Device locked.",
                requestId: crypto.randomUUID()
            };
        }

        if (record.otpHash !== otpHash) {
            await prisma.adminOTP.update({
                where: { id: record.id },
                data: { attemptCount: { increment: 1 } }
            });
            throw {
                success: false,
                errorCode: 'OTP_INVALID',
                message: "Invalid authorization code.",
                requestId: crypto.randomUUID()
            };
        }

        // Mark as used
        await prisma.adminOTP.update({
            where: { id: record.id },
            data: { usedAt: new Date() }
        });

        return true;
    }

    private static hashOTP(otp: string): string {
        return createHash('sha256').update(otp).digest('hex');
    }
}
