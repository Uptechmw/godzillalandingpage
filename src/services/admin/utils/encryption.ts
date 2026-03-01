import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

/**
 * Encryption Utility for Godzilla Coder Admin Dashboard.
 * Uses AES-256-GCM for secure, authenticated encryption of sensitive secrets.
 */
export class EncryptionUtils {
    private static readonly ALGORITHM = 'aes-256-gcm';
    private static readonly IV_LENGTH = 16;
    private static readonly AUTH_TAG_LENGTH = 16;

    /**
     * Centralized Registry of Master Keys for Versioned Decryption.
     * v1: Initial master key.
     */
    private static readonly KEY_REGISTRY: Record<string, string | undefined> = {
        v1: process.env.MASTER_ENCRYPTION_KEY || 'temporary-dev-secret-change-me-in-production'
    };

    private static readonly CURRENT_VERSION = 'v1';

    /**
     * Derives a 32-byte key from a specific version of the Master Key.
     */
    private static getEncryptionKey(version: string = this.CURRENT_VERSION): Buffer {
        const masterKey = this.KEY_REGISTRY[version];
        if (!masterKey) {
            throw new Error(`Encryption key version '${version}' is not defined in the registry.`);
        }
        return scryptSync(masterKey, 'godzilla-coder-salt', 32);
    }

    /**
     * Encrypts a plaintext string using the LATEST key version.
     * Returns ciphertext, iv, authTag, and version.
     */
    static encrypt(plaintext: string): { ciphertext: string; iv: string; authTag: string; version: string } {
        const version = this.CURRENT_VERSION;
        const key = this.getEncryptionKey(version);
        const iv = randomBytes(this.IV_LENGTH);
        const cipher = createCipheriv(this.ALGORITHM, key, iv);

        let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
        ciphertext += cipher.final('hex');

        const authTag = cipher.getAuthTag().toString('hex');

        return {
            ciphertext,
            iv: iv.toString('hex'),
            authTag,
            version
        };
    }

    /**
     * Decrypts a ciphertext using its specific key version, IV, and Auth Tag.
     */
    static decrypt(ciphertext: string, ivHex: string, authTagHex: string, version: string = 'v1'): string {
        const key = this.getEncryptionKey(version);
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');
        const decipher = createDecipheriv(this.ALGORITHM, key, iv);

        decipher.setAuthTag(authTag);

        let plaintext = decipher.update(ciphertext, 'hex', 'utf8');
        plaintext += decipher.final('utf8');

        return plaintext;
    }

    /**
     * Helper to mask sensitive values for the UI (e.g., sk_live_****abcd)
     */
    static maskSecret(value: string): string {
        if (!value || value.length < 8) return '********';
        const prefix = value.substring(0, 7);
        const suffix = value.substring(value.length - 4);
        return `${prefix}****${suffix}`;
    }
}
