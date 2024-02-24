import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";

export async function GET(
  request: NextRequest,
  { params: { token } }: { params: { token: string } }
) {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: { emailVerificationToken: token },
    });
    if (user) {
      if (user.emailVerified) {
        return NextResponse.json(
          { message: "قبلا وریفای شده است" },
          { status: 400 }
        );
      }

      const updatedUser = await prisma.user.updateMany({
        where: { emailVerificationToken: token },
        data: { emailVerified: new Date() },
      });
      return NextResponse.json({ message: "با موفقیت انجام شد" });
    } else {
      return NextResponse.json({ error: "توکن اشتباه است" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
