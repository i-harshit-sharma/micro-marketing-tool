import { resend } from "@/lib/resend";

import VerifyEmail from "@/emails/UserVerification";

export async function sendVerificationEmail(email,username, verificationLink) {
        try {
            const emailContent = VerifyEmail({
                verificationLink,
                email,
                username
            });
            const res = await resend.emails.send({
                from: "Harshit from Marketeer <no-reply-marketeer@harshits.live>",
                to: email,
                subject: "Marketeer Email Verification",
                react: emailContent,
            })
            return {success: true, message: "Verification email sent successfully"};
        } catch (error) {
            console.error("Error sending email:", error);
            return {success: false, error: "Failed to send verification email"};
            
        }


}