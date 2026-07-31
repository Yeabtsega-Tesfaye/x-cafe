import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// This is an OPTIMISTIC check only — it looks for a session cookie without
// verifying it against the database, so it's fast enough to run on every
// request but is not the real security boundary. The actual verified check
// lives in app/dashboard/layout.tsx. This just gives logged-out users a fast
// redirect instead of letting them load the page and bounce.
export function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};