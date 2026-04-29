import mongoose from 'mongoose'

export async function connectDB() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    console.warn('⚠  MONGODB_URI not set — running without database (in-memory mode)')
    return
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log('✓ MongoDB connected')
  } catch (err) {
    console.error('✗ MongoDB connection failed:', err.message)
    console.warn('  Continuing without database — messages will not be persisted.')
  }
}
