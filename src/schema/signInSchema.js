import z from "zod";

export const signInSchema = z.object({
    identifier: z
        .string("Username or email must be a string").nonempty("Username or email is required"),
    password: z
        .string("Password must be a string").nonempty("Password is required")
        .min(6, 'Password must be at least 6 characters')
        .max(128, 'Password too long'),
});