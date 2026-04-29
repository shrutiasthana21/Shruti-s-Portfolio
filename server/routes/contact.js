import { Router } from 'express'
import { body } from 'express-validator'
import rateLimit from 'express-rate-limit'
import { submitContact } from '../controllers/contactController.js'

const router = Router()

// ── Rate limiter: max 5 submissions per 15 min per IP ────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages sent. Please wait 15 minutes before trying again.',
  },
})

// ── Validation rules ─────────────────────────────────────────
const contactValidation = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 50 }).withMessage('First name must be 50 characters or less')
    .escape(),

  body('lastName')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Last name must be 50 characters or less')
    .escape(),

  body('email')
    .trim()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),

  body('subject')
    .optional()
    .trim()
    .isLength({ max: 120 }).withMessage('Subject must be 120 characters or less')
    .escape(),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
    .isLength({ max: 5000 }).withMessage('Message must be 5000 characters or less'),
]

// ── Route ────────────────────────────────────────────────────
router.post('/', contactLimiter, contactValidation, submitContact)

export default router
