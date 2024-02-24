import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (request.nextUrl.pathname.startsWith("/users/dashboard") && !token) {
    return NextResponse.redirect(request.nextUrl.origin + "/api/auth/signin");
  }
  if (request.nextUrl.pathname.startsWith("/api/users") && !token) {
    return NextResponse.json({ error: "غیرمجاز" }, { status: 401 });
  }
}
