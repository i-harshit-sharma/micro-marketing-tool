import { NextRequest, NextResponse } from "next/server";

const verifyAccessToken = (token) => {
  
  // Actual token verification logic
  return true; // Replace with real logic
};

const verifyAndRefreshRefreshToken = (token) => {
  // Actual refresh token logic
  return true; // Replace with real logic
};

export function middleware(req) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  console.log("Access Token:", accessToken);
  console.log("Refresh Token:", refreshToken);
  const isProtected = req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/profile");

  if (isProtected) {
    if (accessToken && verifyAccessToken(accessToken)) {
      console.log("Access token is valid");
      // ✅ Access token is valid
      return NextResponse.next();
    }

    if (refreshToken && verifyAndRefreshRefreshToken(refreshToken)) {
      console.log("Refresh token is valid, issuing new access token");
      // ✅ Refresh token is valid, issue new access token here (optional)
      return NextResponse.next();
    }

    // ❌ Neither token is valid
    console.log("No valid tokens found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }
  console.log("Not a protected route, allowing access");

  return NextResponse.next(); // Not a protected route
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
