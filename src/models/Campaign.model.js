import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    users: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            role: {
                type: String,
                enum: ['owner', 'editor', 'viewer'],
                default: 'editor',
            },
        },
    ],

    shortLinks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ShortLink',
        },
    ],

    feedbackForms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FeedbackForm',
        },
    ],

    qrCodes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QRCode',
        },
    ],

    tags: [String],

    isActive: {
        type: Boolean,
        default: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default Campaign = mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);
