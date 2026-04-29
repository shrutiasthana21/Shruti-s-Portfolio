import nodemailer from 'nodemailer'

/**
 * Returns a configured Nodemailer transporter.
 * Falls back to Ethereal (fake SMTP) in development if SMTP_HOST is not set.
 */
export async function createTransporter() {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  // Development fallback — Ethereal fake SMTP
  const testAccount = await nodemailer.createTestAccount()
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })
  console.log('📧 Ethereal test account:', testAccount.user)
  return transporter
}
