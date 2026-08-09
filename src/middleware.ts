import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const APEX_HOST = "somvertical.ad";
const WWW_HOST = "www.somvertical.ad";

/**
 * Canonical host guard — permanent 301 www → apex.
 * Mirrors next.config + vercel.json so local production builds also enforce it.
 * No loop risk: only www is redirected; apex and preview hosts pass through.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (host === WWW_HOST) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = APEX_HOST;
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next internals and static assets; host redirect still covers page routes
  matcher: [
    "/((?!_next/static|_next/image|favicon.svg|assets/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)$).*)",
  ],
};
