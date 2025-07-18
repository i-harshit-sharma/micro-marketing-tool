import z from "zod";
import UserModel from "@/models/User.model";
import { ApiResponse } from "@/utils/ApiResponse";
import dbConnect from "@/lib/dbConnect";

const ForgotPasswordSchema = z.object({
  email: z.email(),
});

export async function POST(req) {
  await dbConnect();

  const { email } = await req.json();

  const result = ForgotPasswordSchema.safeParse({ email });
  if (!result.success) {
    return Response.json(
      new ApiResponse(400, result.error.message),
      { status: 400 }
    );
  }

  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) {
    return Response.json(
      new ApiResponse(200, "Email sent to user if exists"),
      { status: 200 }
    );
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = Date.now() + 10 * 60 * 1000;

  const updatedUser = await UserModel.findOneAndUpdate(
    { email },
    {
      $set: {
        verifyCode: otp,
        verifyCodeExpiresAt: otpExpiry,
      },
    },
    { new: true }
  );

  // TODO: Send the OTP to email here

  return Response.json(new ApiResponse(200, "Email sent to user if exists"), {
    status: 200,
  });
}
