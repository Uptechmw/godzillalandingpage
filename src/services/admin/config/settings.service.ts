import { prisma } from '@/lib/db';
import { EncryptionUtils } from '../utils/encryption';

/**
 * Service for managing plaintext site settings.
 */
export class SettingsService {
    static async get(key: string): Promise<string | null> {
        const setting = await prisma.setting.findUnique({ where: { key } });
        return setting?.value || null;
    }

    static async set(key: string, value: string, description?: string): Promise<void> {
        await prisma.setting.upsert({
            where: { key },
            update: { value, description },
            create: { key, value, description }
        });
    }

    static async getAll(): Promise<Record<string, string>> {
        const settings = await prisma.setting.findMany();
        return settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});
    }
}

/**
 * Service for managing encrypted secrets (API keys, SMTP credentials, etc.)
 */
export class SecretsService {
    private static cache = new Map<string, { value: string; expires: number }>();
    private static readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

    /**
     * Stores a secret encrypted in the database and archives the old version in SecretHistory.
     */
    static async setSecret(key: string, plaintext: string, adminId: string): Promise<void> {
        const encrypted = EncryptionUtils.encrypt(plaintext);

        // Get existing secret to archive it
        const existing = await prisma.secretSetting.findUnique({ where: { key } });

        await prisma.$transaction(async (tx) => {
            if (existing) {
                // Phase 2 Requirement: Archive old version to SecretHistory
                await tx.secretHistory.create({
                    data: {
                        secretKey: existing.key,
                        ciphertext: existing.ciphertext,
                        iv: existing.iv,
                        authTag: existing.authTag,
                        encryptionVersion: existing.encryptionVersion,
                        createdBy: existing.lastUpdatedBy
                    }
                });
            }

            await tx.secretSetting.upsert({
                where: { key },
                update: {
                    ciphertext: encrypted.ciphertext,
                    iv: encrypted.iv,
                    authTag: encrypted.authTag,
                    encryptionVersion: encrypted.version,
                    lastUpdatedBy: adminId
                },
                create: {
                    key,
                    ciphertext: encrypted.ciphertext,
                    iv: encrypted.iv,
                    authTag: encrypted.authTag,
                    encryptionVersion: encrypted.version,
                    lastUpdatedBy: adminId
                }
            });
        });

        // Invalidate in-memory cache
        this.cache.delete(key);

        // Audit Log
        await prisma.auditLog.create({
            data: {
                adminId,
                action: 'ROTATE_SECRET',
                module: 'SETTINGS',
                targetId: key,
                newValue: { action: 'KEY_ROTATED_AND_ARCHIVED', version: encrypted.version }
            }
        });
    }

    /**
     * Retrieves and decrypts a secret (Backend only) with in-memory caching.
     */
    static async getSecret(key: string): Promise<string | null> {
        // Check cache first
        const cached = this.cache.get(key);
        if (cached && cached.expires > Date.now()) {
            return cached.value;
        }

        const secret = await prisma.secretSetting.findUnique({ where: { key } });
        if (!secret) return null;

        try {
            const plaintext = EncryptionUtils.decrypt(
                secret.ciphertext,
                secret.iv,
                secret.authTag,
                secret.encryptionVersion
            );

            // Set cache
            this.cache.set(key, {
                value: plaintext,
                expires: Date.now() + this.CACHE_TTL
            });

            return plaintext;
        } catch (error) {
            console.error(`[SecretsService] Failed to decrypt secret for key: ${key}`);
            return null;
        }
    }

    /**
     * Lists keys and masked values for the admin UI.
     */
    static async listSecretsForAdmin(): Promise<any[]> {
        const secrets = await prisma.secretSetting.findMany({
            select: { key: true, updatedAt: true, lastUpdatedBy: true, encryptionVersion: true }
        });

        return secrets.map(s => ({
            key: s.key,
            updatedAt: s.updatedAt,
            lastUpdatedBy: s.lastUpdatedBy,
            encryptionVersion: s.encryptionVersion,
            value: '********' // Always masked for frontend
        }));
    }

    /**
     * Retrieves all SMTP settings and decrypts them for use in the email service.
     */
    static async getSmtpConfig(): Promise<any> {
        const [host, port, user, pass, fromName, fromEmail, secure] = await Promise.all([
            this.getSecret('SMTP_HOST'),
            this.getSecret('SMTP_PORT'),
            this.getSecret('SMTP_USERNAME'),
            this.getSecret('SMTP_PASSWORD'),
            this.getSecret('SMTP_FROM_NAME'),
            this.getSecret('SMTP_FROM_EMAIL'),
            this.getSecret('SMTP_SECURE'),
        ]);

        if (!host || !user || !pass) return null;

        return {
            host,
            port,
            user,
            pass,
            fromName,
            fromEmail,
            secure: secure === 'true',
        };
    }
}
