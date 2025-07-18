import dbConnect from "@/lib/dbConnect";
import { ApiResponse } from "@/utils/ApiResponse";
import UserModel from "@/models/User.model";

export async function POST(req) {
    await dbConnect();

    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return Response.json(new ApiResponse(400, "Email and OTP are required"), { status: 400 });
        }

        const user = await UserModel.findOne({ email, verifyCode: otp, verifyCodeExpiresAt: { $gt: Date.now() } });
        if (!user) {
            return Response.json(new ApiResponse(400, "Invalid or expired OTP"), { status: 400 });
        }

        await user.save();

        return Response.json(new ApiResponse(200, "Correct OTP"), { status: 200 });
    } catch (error) {
        console.error("Error in forgot password verification route:", error);
        return Response.json(new ApiResponse(500, "Internal server error"), { status: 500 });
    }
}