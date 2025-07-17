import mongoose from 'mongoose';

const clickEventSchema = new mongoose.Schema({
  shortLinkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShortLink',
  },
  clickedAt: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
  },
  country: {
    type: String,
  },
  device: {
    type: String,
  },
  browser: {
    type: String,
  },
  referrer: {
    type: String,
  },
  clickType: {
    type: String,
    enum: ['direct', 'qr', 'email', 'social', 'other'],
    default: 'other',
  },
});

export default ClickEvent = mongoose.models.ClickEvent || mongoose.model('ClickEvent', clickEventSchema);
