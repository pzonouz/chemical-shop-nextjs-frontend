import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Mailer } from "@/app/utils/Mailer";

export async function GET(
  request: NextRequest,
  { params: { token } }: { params: { token: string } }
) {
  try {
    const randomPassword = crypto.randomBytes(8).toString("hex");
    const hashedPassword = bcrypt.hashSync(randomPassword, 10);

    const user = await prisma.user.findFirst({
      where: { forgetPasswordToken: token },
    });
    if (user) {
      await prisma.user.updateMany({
        where: { forgetPasswordToken: token },
        data: { hashedPassword: hashedPassword, forgetPasswordToken: null },
      });
      const info = await Mailer.sendMail({
        from: "NanoShop",
        to: user.email!,
        subject: "پسورد جدید",
        html: `<p>${randomPassword}</p>`,
      });
      return NextResponse.json({ message: "پسورد جدید به ایمیل شما ارسال شد" });
    } else {
      return NextResponse.json(
        {
          error: "توکن معتبر نیست. عملیات را دوباره انجام دهید",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
