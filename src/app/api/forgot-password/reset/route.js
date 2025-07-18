import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { ApiResponse } from "@/utils/ApiResponse";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await dbConnect();

    try {
        const { email, otp, newPassword } = await req.json();

        if (!email || !newPassword || !otp) {
            return Response.json(new ApiResponse(400, "Email, OTP, and new password are required"), { status: 400 });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return Response.json(new ApiResponse(404, "User not found"), { status: 404 });
        }

        user.password = await bcrypt.hash(newPassword, 12);
        user.verifyCode = null; // Clear the OTP
        user.verifyCodeExpiresAt = null; // Clear the OTP expiry

        await user.save();

        return Response.json(new ApiResponse(200, "Password reset successfully"), { status: 200 });
    } catch (error) {
        console.error("Error in forgot password reset route:", error);
        return Response.json(new ApiResponse(500, "Internal server error"), { status: 500 });
    }
}