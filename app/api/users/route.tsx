import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import {
  findUserByEmail,
  updateUserByEmail,
} from "@/db/repositories/UserRepository";
import { User } from "@/kysely/types";

export async function GET(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.json({ error: "غیر مجاز" }, { status: 401 });
  }
  try {
    const userEmail = token.email;
    const user = await findUserByEmail(userEmail!);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
export async function PATCH(request: NextRequest) {
  const user: User = await request.json();
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    await updateUserByEmail(token?.email!, user);
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
