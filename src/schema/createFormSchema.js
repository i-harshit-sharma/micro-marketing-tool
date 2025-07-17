import { z } from 'zod';

const fieldSchema = z.object({
    label: z.string().min(1, 'Field label is required'),
    type: z.enum(['text', 'textarea', 'radio', 'checkbox', 'select', 'rating']),
    options: z.array(z.string()).optional(), // used for select, radio, checkbox
    required: z.boolean().optional(),
});

export const createFeedbackFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().max(500).optional(),
    userId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid userId').optional(),
    fields: z.array(fieldSchema).min(1, 'At least one field is required'),
    slug: z.string().min(3).regex(/^[a-z0-9-]+$/, 'Slug must be URL-safe (lowercase, hyphens)').optional(),
    isActive: z.boolean().optional(),
});
