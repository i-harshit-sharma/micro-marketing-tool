import { z } from 'zod';

export const forgotPasswordRequestSchema = z.object({
  email: z.email('A valid email is required'),
});
