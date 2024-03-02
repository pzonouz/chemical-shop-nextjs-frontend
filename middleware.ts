import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import user from "./lib/features/entities/user";

export default async function middleware(request: NextRequest) {
  let token = null;
  try {
    token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
  } catch (error) {
    token = null;
  }

  if (request.nextUrl.pathname.startsWith("/users/dashboard") && !token) {
    return NextResponse.redirect(request.nextUrl.origin + "/api/auth/signin");
  }
  if (request.nextUrl.pathname.startsWith("/api/users") && !token) {
    return NextResponse.json({ error: "غیرمجاز" }, { status: 401 });
  }
  if (
    request.nextUrl.pathname.startsWith("/admin/api") &&
    !(token?.role === "admin")
  ) {
    return NextResponse.json({ error: "غیرمجاز" }, { status: 401 });
  }
}
