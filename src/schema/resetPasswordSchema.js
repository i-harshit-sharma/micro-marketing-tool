export const resetPasswordSchema = z.object({
    email: z.email('A valid email is required'),

    verifyCode: z
        .string()
        .length(6, 'Verification code must be exactly 6 characters'),

    newPassword: z
        .string()
        .min(6, 'Password must be at least 6 characters'),

})
