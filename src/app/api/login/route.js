// app/api/login/route.js
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "@/models/User.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { cookies } from "next/headers";
import { signInSchema } from "@/schema/signInSchema";

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

export async function POST(req) {
    await dbConnect();

    try {
        const { identifier, password } = await req.json();

        const result = signInSchema.safeParse({ identifier, password });
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(issue => {
                errors[issue.path[0]] = issue.message;
            });
            return Response.json(new ApiError(400, "Validation error", errors), { status: 400 });
        }

        const user = await UserModel.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user) {
            return Response.json(new ApiError(404, "User not found"), { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return Response.json(new ApiError(401, "Invalid credentials"), { status: 401 });
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        const cookieStore = await cookies();
        cookieStore.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 15, // 15 min
        });

        cookieStore.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 40, // 10 seconds
        });

        return Response.json(new ApiResponse(200, {
            message: "Login successful"
        }));
    } catch (error) {
        console.error(error);
        return Response.json(new ApiError(500, "Internal server error"), { status: 500 });
    }
}
