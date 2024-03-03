import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { User } from "../auth/register/route";
import prisma from "../../../prisma/prisma";

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
    const user = await prisma.user.findFirst({
      where: { email: userEmail! },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        mobile: true,
        createdAt: true,
        address: true,
      },
    });
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
    const updatedUser = await prisma.user.updateMany({
      where: { email: token?.email },
      data: user,
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
