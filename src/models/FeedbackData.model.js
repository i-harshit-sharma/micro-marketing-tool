import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FeedbackForm',
    required: true,
  },
  answers: [
    {
      label: String,     // e.g., "How was the service?"
      answer: mongoose.Schema.Types.Mixed, // text, array, rating etc.
    },
  ],
  submittedAt: { type: Date, default: Date.now },
  clickInfo:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClickEvent',
    required: false,
  }
});

export default FeedbackResponse = mongoose.models.FeedbackResponse || mongoose.model('FeedbackResponse', responseSchema);
