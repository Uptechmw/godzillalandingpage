/**
 * Email Service
 * Supports Resend, SendGrid, or SMTP
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send OTP verification email
 */
export async function sendOTPEmail(email: string, code: string): Promise<void> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .code { font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; background: white; padding: 20px; border-radius: 8px; margin: 20px 0; color: #667eea; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🦖 Godzilla AI</h1>
            <p>Email Verification</p>
          </div>
          <div class="content">
            <p>Hi there!</p>
            <p>Thanks for signing up for Godzilla AI. To complete your registration, please verify your email address using the code below:</p>
            <div class="code">${code}</div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Godzilla AI. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail({
    to: email,
    subject: 'Verify your Godzilla AI account',
    html,
  });
}

/**
 * Send email using configured provider
 */
async function sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
  const provider = process.env.EMAIL_PROVIDER || 'resend';

  try {
    if (provider === 'resend') {
      await sendWithResend({ to, subject, html });
    } else if (provider === 'sendgrid') {
      await sendWithSendGrid({ to, subject, html });
    } else {
      throw new Error(`Unsupported email provider: ${provider}`);
    }
  } catch (error) {
    console.error('[Email Error]', error);
    throw new Error('Failed to send email');
  }
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
