import nodemailer from 'nodemailer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Anthropic from '@anthropic-ai/sdk';

/**
 * Service to validate external integration settings before saving.
 */
export class ConnectionTestService {
    /**
     * Tests SMTP credentials by attempting to send a small test email.
     */
    static async testSMTP(config: {
        host: string;
        port: number;
        user: string;
        pass: string;
        fromEmail: string;
    }): Promise<{ success: boolean; message: string }> {
        try {
            const transporter = nodemailer.createTransport({
                host: config.host,
                port: config.port,
                secure: config.port === 465,
                auth: {
                    user: config.user,
                    pass: config.pass
                }
            });

            await transporter.verify();

            // Optional: send a real test email
            // await transporter.sendMail({ ... });

            return { success: true, message: "SMTP Connection verified successfully." };
        } catch (error: any) {
            return { success: false, message: error.message || "Failed to connect to SMTP server." };
        }
    }

    /**
     * Tests Gemini API Key by running a minimal prompt.
     */
    static async testGemini(apiKey: string): Promise<{ success: boolean; message: string }> {
        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            // Minimal token usage test
            await model.generateContent("ping");

            return { success: true, message: "Gemini API Key verified successfully." };
        } catch (error: any) {
            return { success: false, message: error.message || "Failed to verify Gemini API Key." };
        }
    }

    /**
     * Tests Anthropic API Key.
     */
    static async testClaude(apiKey: string): Promise<{ success: boolean; message: string }> {
        try {
            const client = new Anthropic({ apiKey });

            await client.messages.create({
                model: "claude-3-haiku-20240307",
                max_tokens: 1,
                messages: [{ role: "user", content: "ping" }]
            });

            return { success: true, message: "Anthropic API Key verified successfully." };
        } catch (error: any) {
            return { success: false, message: error.message || "Failed to verify Anthropic API Key." };
        }
    }
}
