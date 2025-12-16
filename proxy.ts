import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  // Define public paths that don't require authentication
  const publicPaths = ["/auth/sign", "/"];

  const isAuthPage = pathname.startsWith("/auth/sign");
  
  const isPublic = publicPaths.some((p) => {
    if (p === "/") {
      return pathname === "/"; // Exactly home
    }
    return pathname === p || pathname.startsWith(p + "/");
  });

  // If user is signed in but trying to access auth page, redirect to profile
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // If not signed in and trying to access a protected page, redirect to sign in
  if (!session && !isPublic) {
    return NextResponse.redirect(new URL("/auth/sign", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (api/*)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, logo.png (public files)
     * - files with extensions (.png, .jpg, .svg, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|logo.png|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)',
  ],
};
