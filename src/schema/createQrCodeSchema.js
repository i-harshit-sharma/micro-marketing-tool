import { z } from 'zod';

const customizationSchema = z.object({
  color: z.string().default('#000000'),            // hex string expected
  backgroundColor: z.string().default('#ffffff'),  // hex string expected
  logoUrl: z.string().url('Invalid logo URL').optional(),
});

export const createQRCodeSchema = z.object({
  userId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid userId').optional(),

  data: z.string().min(1, 'QR code data is required'),

  linkedShortLinkId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ShortLink ID').optional(),

  format: z.enum(['png', 'svg']).optional(),

  customization: customizationSchema.optional(),
});
