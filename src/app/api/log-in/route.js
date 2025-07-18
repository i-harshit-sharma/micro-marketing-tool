// app/api/login/route.js
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "@/models/User.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  await dbConnect();

  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return Response.json(new ApiError(400, "Identifier and password required"), { status: 400 });
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
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 10, // 15 min
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    //   maxAge: 60 * 60 * 24 * 7, // 7 days
    maxAge: 20, // 10 seconds
    });

    return Response.json(new ApiResponse(200, {
      message: "Login successful"
    }));
  } catch (error) {
    console.error(error);
    return Response.json(new ApiError(500, "Internal server error"), { status: 500 });
  }
}
