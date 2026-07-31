import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Renamed from middleware.ts per Next.js 16 (proxy.ts is the new convention;
// middleware.ts still works today but is deprecated and will be removed).
// Same optimistic cookie-only check as before — the real, DB-verified check
// still lives in app/dashboard/layout.tsx.
export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};