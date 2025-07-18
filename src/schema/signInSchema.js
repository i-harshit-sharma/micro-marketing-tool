import z from "zod";

export const signInSchema = z.object({
    identifier: z
        .string("Username or email is must be string").nonempty("Username or email is required"),
    password: z
        .string("Password is must be string").nonempty("Password is required")
        .min(6, 'Password must be at least 6 characters')
        .max(128, 'Password too long'),
});