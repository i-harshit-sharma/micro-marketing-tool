import { z } from 'zod';

export const shortenUrlSchema = z.object({
  userId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid userId').optional(),

  originalUrl: z.string().url('Invalid original URL'),

  customSlug: z
    .string()
    .min(3, 'Custom slug must be at least 3 characters')
    .max(30, 'Custom slug must be under 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Slug can only contain letters, numbers, underscores and hyphens')
    .optional(),

  expiresAt: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (typeof val === 'string' ? new Date(val) : val)),

  isActive: z.boolean().optional(),
});
