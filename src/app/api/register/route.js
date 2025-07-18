import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import UserModel from "@/models/User.model";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";

export async function POST(req) {
    await dbConnect();

    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return Response.json(new ApiError(400, "All fields are required"), { status: 400 });
        }

        const existingUserWithEmail = await UserModel.findOne({ email });
        const existingUserWithUsername = await UserModel.findOne({ username });

        if (existingUserWithEmail) {
            return Response.json(new ApiError(400, "Email already exists"), { status: 400 });
        }

        if (existingUserWithUsername) {
            return Response.json(new ApiError(400, "Username already exists"), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        // const verifyLink = crypto.randomBytes(32).toString("hex");
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let verifyLink = '';
        for (let i = 0; i < 32; i++) {
            verifyLink += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            verifyLink,
            verifyLinkExpiresAt: expiryDate,
        });

        const emailResponse = await sendVerificationEmail(user.email, user.username, verifyLink);
        console.log("Email response:", emailResponse);
        if (!emailResponse.success) {
            console.error("Failed to send verification email:", emailResponse.error);
            return Response.json(new ApiError(500, "Failed to send verification email"), { status: 500 });
        }

        return Response.json(new ApiResponse(201, { message: "User created successfully" }), { status: 201 });
    } catch (error) {
        console.error("Error in sign-up route:", error);

        // Custom errors
        if (error instanceof ApiError) {
            return Response.json(error, { status: error.statusCode });
        }

        // Unknown or unexpected error
        return Response.json(new ApiError(500, "Internal Server Error", [], error?.stack), { status: 500 });
    }
}
