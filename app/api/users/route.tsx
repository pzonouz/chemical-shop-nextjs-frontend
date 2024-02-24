import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";

export async function POST(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token) {
    return NextResponse.json({ error: "غیر مجاز" }, { status: 401 });
  }
  try {
    const userEmail = token.email;
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: userEmail! },
    });
    return NextResponse.json({ user: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
