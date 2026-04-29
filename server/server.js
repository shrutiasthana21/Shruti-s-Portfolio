import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import contactRoutes from './routes/contact.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// ── Routes ──────────────────────────────────────────────────
app.use('/api/contact', contactRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Global error handler
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ success: false, message: 'Internal server error' })
})

// ── Start ───────────────────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`)
  })
})
