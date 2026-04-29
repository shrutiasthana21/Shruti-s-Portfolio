import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name must be 50 characters or less'],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [50, 'Last name must be 50 characters or less'],
      default: '',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [120, 'Subject must be 120 characters or less'],
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [5000, 'Message must be 5000 characters or less'],
    },
    ipAddress: {
      type: String,
      default: '',
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Contact', contactSchema)
