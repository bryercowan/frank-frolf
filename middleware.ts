import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let cookieName = "next-auth.session-token";
  if (process.env.NODE_ENV === "production") {
    cookieName = "__Secure-next-auth.session-token";
  }
  const sessionToken = request.cookies.get(cookieName);

  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  if (!sessionToken && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (sessionToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
