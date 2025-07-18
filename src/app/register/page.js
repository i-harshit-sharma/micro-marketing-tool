"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signUpSchema } from "@/schema/signUpSchema"; 

export default function RegisterPage({ className, ...props }) {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("/api/status");
                if (res.status !== 200) {
                    toast.error("API is down", { position: "top-center" });
                }
            } catch {
                toast.error("API is down", { position: "top-center" });
            }
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordsMatch = password === confirmPassword;
        

        const result = signUpSchema.safeParse({ username, email, password });
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message || "Validation error");
                console.error("Validation error:", issue.message);
            });
            return;
        }
        if (!passwordsMatch) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await axios.post("/api/register", { username, email, password });
            toast.success("Registration successful!");
            setTimeout(() => router.push("/login"), 1500);
        } catch (err) {
            const msg = err?.response?.data?.message || "Something went wrong with API.";
            console.error("Registration error:", msg);
            toast.error(msg);
        }
    };

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card className="overflow-hidden p-0">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-2xl font-bold">Create an account</h1>
                                        <p className="text-muted-foreground text-balance">
                                            Register to get started with Marketeer
                                        </p>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            id="username"
                                            type="text"
                                            placeholder="Enter your username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>

                                    <Button type="submit" className="w-full">
                                        Register
                                    </Button>

                                    <div className="text-center text-sm">
                                        Already have an account?{" "}
                                        <Link href="/login" className="underline underline-offset-4">
                                            Log in
                                        </Link>
                                    </div>
                                </div>
                            </form>

                            <div className="bg-muted relative hidden md:block">
                                <img
                                    src="/static/bg.jpg"
                                    alt="Image"
                                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                        and <a href="#">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    );
}
