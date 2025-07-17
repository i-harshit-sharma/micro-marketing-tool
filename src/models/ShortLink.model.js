import mongoose from 'mongoose';

const shortLinkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  customSlug: {
    type: String,
    unique: true,
    sparse: true, // only index if exists
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  expiresAt: {
    type: Date,
  },
},{timestamps: true});

export default ShortLink = mongoose.models.ShortLink || mongoose.model('ShortLink', shortLinkSchema);
