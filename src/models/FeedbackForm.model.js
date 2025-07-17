import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
  label: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['text', 'textarea', 'radio', 'checkbox', 'select', 'rating'],
  },
  options: [String], // used for select, radio, checkbox
    conditional: {
    field: String,
    value: mongoose.Schema.Types.Mixed
  },
  required: { type: Boolean, default: false },
});

const feedbackFormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  fields: [fieldSchema],
  slug: { type: String, unique: true }, // e.g., /feedback/xyz123
  isActive: { type: Boolean, default: true },
},{timestamps: true});

export default feedbackForm = mongoose.models.FeedbackForm || mongoose.model('FeedbackForm', feedbackFormSchema);
