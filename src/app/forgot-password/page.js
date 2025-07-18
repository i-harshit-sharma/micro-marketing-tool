"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import toast from "react-hot-toast";
import z from "zod";
import { useRouter } from "next/navigation";

const ForgotPasswordSchema = z.object({
  email: z.email("Invalid email format"),
});

const otpSchema = z.object({
  otp: z.string()
  .length(6, "OTP must be 6 digits")
  .regex(/^\d{6}$/, "OTP must contain only numbers")
});

const passwordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

function onSubmit(data) {
  toast("You submitted the following values", {
    description: (
      <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  })
}

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const result = ForgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message || "Validation error");
      });
      return;
    }

    try {
      await axios.post("/api/forgot-password/request", { email });
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err) {
      toast.error(`Failed to send OTP`);
      console.error("Error sending OTP:", err.request);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const result = otpSchema.safeParse({ otp });
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message || "Validation error");
      });
      return;
    }

    try {
      await axios.post("/api/forgot-password/verify", { email, otp });
      toast.success("OTP verified successfully");
    } catch (error) {
      toast.error(`Failed to verify OTP`);
      console.error("Error verifying OTP:", error);
      return;
      
    }

    setStep(3);

    console.log("Submitted OTP:", otp);
  };

  const submitPasswordReset = async (e) => {
    e.preventDefault();
    const result = passwordSchema.safeParse({ newPassword });
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message || "Validation error");
      });
      return;
    }
    try {
      await axios.post("/api/forgot-password/reset", { email, newPassword, otp });
      toast.success("Password reset successfully");
      router.push("/login");
    } catch (err) {
      toast.error(`Failed to reset password`);
      console.error("Error resetting password:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      {step === 1 && (
        <>
          <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
          <form onSubmit={handleSendOtp} className="w-full max-w-sm space-y-4">
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          <Button className="mt-4 w-full" type="submit">
            Send OTP
          </Button>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="text-xl font-semibold mb-4">Enter OTP</h1>
          <form onSubmit={handleOtpSubmit} className="w-full max-w-sm space-y-4">
            <label className="text-sm font-medium">One-Time Password</label>
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              className="w-full"
            >
              <InputOTPGroup className=" mt-2 text-black">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <p className="text-sm text-muted-foreground">
              Please enter the one-time password sent to your phone.
            </p>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </>
      )}

      {step === 3 && (

        <div className=" text-center text-lg font-medium">
          Enter new password for your account
          <form action="">
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          <Button onClick={submitPasswordReset} type="submit" className="mt-4 w-full">
            Reset Password
          </Button>
          </form>
        </div>

      )}
    </div>
  );
}
