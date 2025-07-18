// app/middleware.js
import { NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

// const JWT_SECRET = process.env.JWT_SECRET
// const REFRESH_SECRET = process.env.REFRESH_SECRET
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET); // Must be Uint8Array
const REFRESH_SECRET = new TextEncoder().encode(process.env.REFRESH_SECRET); // Must be Uint8Array

async function verifyAccessToken(token) {
  try {
    console.log("Verifying access token...",token);
    const fl = await jwtVerify(token, JWT_SECRET);
    console.log("Access token payload:", fl);
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload
  } catch(e) {
    console.warn("Access token verification failed:", e);
    return null;
  }
}

async function refreshAccessToken(refreshToken) {
  console.log("Refreshing access token...");
  const { payload } = await jwtVerify(refreshToken, REFRESH_SECRET);
  console.log("Refresh token payload:", payload);
  const newAccessToken = await new SignJWT({ userId: payload.userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .sign(JWT_SECRET);

  return newAccessToken;
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  if (accessToken) {
    const payload = await verifyAccessToken(accessToken);
    if (payload) {
      // still valid → allow through
      return NextResponse.next();
    }
  }

  // access token invalid or missing → try refresh
  const refreshToken = req.cookies.get("refreshToken")?.value;
  if (refreshToken) {
    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      const res = NextResponse.next();

      // set new access token on response
      res.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 15,
        sameSite: "strict",
      });

      return res;
    } catch (e) {
      console.warn("Refresh failed:", e.message);
    }
  }

  // both failed → redirect to login
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
