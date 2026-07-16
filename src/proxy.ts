import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// In Next.js 16, the main function must be named 'proxy'
export async function proxy(request: NextRequest) {
  // 1. Retrieve the active user session from BetterAuth
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. If unauthorized, redirect to the login screen
  if (!session) {
    const loginUrl = new URL("/login", request.url);

    // Pass the original destination path as a parameter to return after sign-in
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  // 3. Continue processing the request downstream
  return NextResponse.next();
}

// 4. Target exact routes in TrailNest that require authentication
export const config = {
  matcher: ["/add-listing", "/my-listings", "/my-bookings", "/profile/:path*"],
};
