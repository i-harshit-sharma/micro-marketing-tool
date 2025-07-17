import { z } from 'zod';

export const createCampaignSchema = z.object({
    name: z
        .string()
        .min(3, 'Campaign name must be at least 3 characters')
        .max(100, 'Campaign name is too long'),

    description: z
        .string()
        .max(500, 'Description too long')
        .optional(),

    users: z
        .array(
            z.object({
                userId: z.string(),
                role: z.enum(['owner', 'editor', 'viewer']).default('editor'),
            })
        )
        .nonempty('At least one user is required'),

    shortLinks: z
        .array(z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ShortLink ID'))
        .optional(),

    feedbackForms: z
        .array(z.string().regex(/^[a-f\d]{24}$/i, 'Invalid FeedbackForm ID'))
        .optional(),

    qrCodes: z
        .array(z.string().regex(/^[a-f\d]{24}$/i, 'Invalid QRCode ID'))
        .optional(),

    tags: z
        .array(z.string())
        .optional(),

    isActive: z.boolean().optional(),
});
