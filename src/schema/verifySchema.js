import {z} from 'zod';

export const verifySchema = z.object({

    email: z.string().email('Invalid email address'),
    verificationCode: z.string().length(6, 'Verification code must be exactly 6 characters'),
});