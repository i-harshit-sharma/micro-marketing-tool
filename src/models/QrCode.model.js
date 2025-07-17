import mongoose from 'mongoose';

const qrCodeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },

  data: {
    type: String,
    required: true, // URL, text, etc.
  },

  linkedShortLinkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShortLink',
    required: false,
  },

  format: {
    type: String,
    enum: ['png', 'svg'],
    default: 'png',
  },

  customization: {
    color: { type: String, default: '#000000' },
    backgroundColor: { type: String, default: '#ffffff' },
    logoUrl: { type: String }, // optional: for embedded logos
  },
},{timestamps: true});

export default QrCode = mongoose.models.QRCode || mongoose.model('QRCode', qrCodeSchema);
