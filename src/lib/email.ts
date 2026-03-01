/**
 * Email Service
 * Supports SMTP (via nodemailer), Resend, or SendGrid
 * 
 * Provider priority:
 * 1. If SMTP_HOST is set -> use SMTP
 * 2. If EMAIL_PROVIDER is 'resend' and RESEND_API_KEY is set -> use Resend
 * 3. If EMAIL_PROVIDER is 'sendgrid' and SENDGRID_API_KEY is set -> use SendGrid
 */

import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send OTP verification email
 */
export async function sendOTPEmail(email: string, code: string, customConfig?: any): Promise<void> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0A0A0A; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .code { font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; background: white; padding: 20px; border-radius: 8px; margin: 20px 0; color: #00FF94; border: 2px solid #0A0A0A; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Godzilla Coder</h1>
            <p>Email Verification</p>
          </div>
          <div class="content">
            <p>Hi there!</p>
            <p>Thanks for signing up for Godzilla Coder. To complete your registration, please verify your email address using the code below:</p>
            <div class="code">${code}</div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Godzilla Coder. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail({
    to: email,
    subject: 'Verify your Godzilla Coder account',
    html,
  }, customConfig);
}

/**
 * Send Admin 2FA OTP email
 */
export async function sendAdminOTPEmail(email: string, code: string, customConfig?: any): Promise<void> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #F1F5F9; background: #0B1220; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { width: 48px; height: 48px; margin-bottom: 10px; }
          .title { font-size: 20px; font-weight: 700; color: #F1F5F9; letter-spacing: -0.02em; margin: 0; }
          .content { background: #111827; padding: 40px; border-radius: 16px; border: 1px solid #1F2937; text-align: center; }
          .subtitle { font-size: 14px; color: #94A3B8; margin-bottom: 24px; }
          .code { font-size: 38px; font-weight: 800; letter-spacing: 12px; color: #2563EB; background: #0B1220; padding: 24px; border-radius: 12px; margin: 20px 0; border: 1px solid #1F2937; display: inline-block; width: 80%; }
          .expiry { font-size: 12px; color: #475569; margin-top: 24px; }
          .footer { text-align: center; margin-top: 30px; color: #475569; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="title">GODZILLA CODER</div>
            <p style="color: #64748B; font-size: 12px; margin-top: 5px;">SECURITY PROTOCOL</p>
          </div>
          <div class="content">
            <h2 style="font-size: 18px; margin-bottom: 8px;">Verify Your Identity</h2>
            <p class="subtitle">Enter the clinical authorization code below to establish your secure session.</p>
            <div class="code">${code}</div>
            <p class="expiry">This code will expire in 5 minutes.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Godzilla AI. Protected by secure encryption.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail({
    to: email,
    subject: 'System Authorization Code',
    html,
  }, customConfig);
}

/**
 * Determine which provider to use and send
 */
async function sendEmail({ to, subject, html }: EmailOptions, customConfig?: any): Promise<void> {
  // If customConfig is provided, prioritize it (Admin side database secrets)
  if (customConfig && customConfig.host && customConfig.user && customConfig.pass) {
    await sendWithSMTP({ to, subject, html }, customConfig);
    return;
  }

  // Auto-detect: if SMTP credentials exist in env, use SMTP
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    await sendWithSMTP({ to, subject, html });
    return;
  }

  const provider = process.env.EMAIL_PROVIDER || 'resend';

  try {
    if (provider === 'resend') {
      await sendWithResend({ to, subject, html });
    } else if (provider === 'sendgrid') {
      await sendWithSendGrid({ to, subject, html });
    } else if (provider === 'smtp') {
      await sendWithSMTP({ to, subject, html });
    } else {
      throw new Error(`Unsupported email provider: ${provider}`);
    }
  } catch (error) {
    console.error('[Email Error]', error);
    throw new Error('Failed to send email');
  }
}

/**
 * Send email via SMTP (nodemailer)
 */
async function sendWithSMTP({ to, subject, html }: EmailOptions, customConfig?: any): Promise<void> {
  const host = customConfig?.host || process.env.SMTP_HOST;
  const port = parseInt(customConfig?.port || process.env.SMTP_PORT || '587');

  // Auto-detect secure based on port if SMTP_SECURE is not explicitly set
  const secure = customConfig?.secure !== undefined
    ? customConfig.secure
    : (process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === 'true'
      : port === 465);

  const user = customConfig?.user || process.env.SMTP_USER;
  const pass = customConfig?.pass || process.env.SMTP_PASS;
  const from = customConfig?.fromEmail || process.env.FROM_EMAIL || process.env.EMAIL_FROM || user || 'noreply@godzillaai.com';

  if (!host || !user || !pass) {
    throw new Error('SMTP credentials not fully configured (need host, user, pass)');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 10000, // 10s timeout instead of hanging
    tls: {
      // Do not fail on invalid certs in case user is using a local/development SMTP server
      rejectUnauthorized: false
    }
  });

  await transporter.sendMail({
    from: customConfig?.fromName ? `"${customConfig.fromName}" <${from}>` : from,
    to,
    subject,
    html,
  });

  console.log(`[Email] Sent via SMTP to ${to}`);
}

/**
 * Send email via Resend
 */
async function sendWithResend({ to, subject, html }: EmailOptions): Promise<void> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@godzillaai.com';

  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY not configured');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }
}

/**
 * Send email via SendGrid
 */
async function sendWithSendGrid({ to, subject, html }: EmailOptions): Promise<void> {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@godzillaai.com';

  if (!SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY not configured');
  }

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: EMAIL_FROM },
      subject,
      content: [{ type: 'text/html', value: html }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`SendGrid API error: ${error}`);
  }
}
