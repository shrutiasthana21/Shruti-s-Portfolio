import { validationResult } from 'express-validator'
import mongoose from 'mongoose'
import Contact from '../models/Contact.js'
import { createTransporter } from '../config/mailer.js'
import nodemailer from 'nodemailer'

/**
 * POST /api/contact
 * Accepts contact form submission, saves to DB, sends notification email.
 */
export async function submitContact(req, res) {
  // 1. Validate input
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, msg: e.msg })),
    })
  }

  const { firstName, lastName, email, subject, message } = req.body
  const ipAddress = req.ip || req.headers['x-forwarded-for'] || ''

  // 2. Persist to MongoDB (if connected)
  let savedContact = null
  if (mongoose.connection.readyState === 1) {
    try {
      savedContact = await Contact.create({
        firstName,
        lastName,
        email,
        subject,
        message,
        ipAddress,
      })
    } catch (dbErr) {
      console.error('DB save error:', dbErr.message)
      // Don't fail the request — continue to send email
    }
  }

  // 3. Send notification email
  try {
    const transporter = await createTransporter()

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER || 'noreply@portfolio.dev'}>`,
      to: process.env.CONTACT_RECIPIENT || process.env.SMTP_USER || 'hello@alexandrarosewood.com',
      replyTo: email,
      subject: subject
        ? `[Portfolio] ${subject}`
        : `[Portfolio] New message from ${firstName} ${lastName}`.trim(),
      text: buildPlainText({ firstName, lastName, email, subject, message }),
      html: buildHtml({ firstName, lastName, email, subject, message }),
    }

    const info = await transporter.sendMail(mailOptions)

    // Log Ethereal preview URL in development
    const previewUrl = nodemailer.getTestMessageUrl(info)
    if (previewUrl) {
      console.log('📧 Preview email at:', previewUrl)
    }
  } catch (mailErr) {
    console.error('Email send error:', mailErr.message)
    // Still return 200 — message was saved, email delivery is best-effort
  }

  return res.status(201).json({
    success: true,
    message: 'Your message has been received. I\'ll be in touch within 24 hours.',
    id: savedContact?._id,
  })
}

// ── Email templates ──────────────────────────────────────────

function buildPlainText({ firstName, lastName, email, subject, message }) {
  return [
    `New contact form submission`,
    `─────────────────────────`,
    `Name:    ${firstName} ${lastName}`.trim(),
    `Email:   ${email}`,
    `Subject: ${subject || '(none)'}`,
    ``,
    `Message:`,
    message,
  ].join('\n')
}

function buildHtml({ firstName, lastName, email, subject, message }) {
  const safeMessage = message.replace(/\n/g, '<br />')
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'DM Sans', Arial, sans-serif; background:#2C1E22; color:#fff; margin:0; padding:0; }
    .wrapper { max-width:560px; margin:40px auto; }
    .header { background:linear-gradient(135deg,#9E7C81,#735D69); padding:32px; border-radius:16px 16px 0 0; }
    .header h1 { margin:0; font-size:1.4rem; font-weight:300; letter-spacing:-0.01em; }
    .body { background:#3a2430; padding:32px; border-radius:0 0 16px 16px; }
    .field { margin-bottom:20px; }
    .label { font-size:0.68rem; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.45); margin-bottom:4px; }
    .value { font-size:0.95rem; color:#fff; }
    .message-box { background:rgba(158,124,129,0.1); border:1px solid rgba(158,124,129,0.2); border-radius:10px; padding:18px; margin-top:24px; line-height:1.7; font-size:0.93rem; color:rgba(255,255,255,0.85); }
    .footer { margin-top:24px; font-size:0.7rem; color:rgba(255,255,255,0.3); text-align:center; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>✦ New Portfolio Message</h1>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${firstName} ${lastName}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value">${email}</div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${subject || '(none)'}</div>
      </div>
      <div class="message-box">${safeMessage}</div>
      <div class="footer">Sent via asthanashruti7.com contact form</div>
    </div>
  </div>
</body>
</html>
  `.trim()
}
