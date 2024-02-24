import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { Mailer } from "@/app/utils/Mailer";
import crypto from "crypto";

export async function GET(
  request: NextRequest,
  { params: { email } }: { params: { email: string } }
) {
  try {
    const user = await prisma.user.findFirst({ where: { email: email } });
    const forgetPasswordToken = crypto.randomBytes(8).toString("hex");
    const forgetPasswordLink = `http://localhost:3000/api/auth/forgetpassword/callback/${forgetPasswordToken}`;
    if (user) {
      const updatedUser = await prisma.user.update({
        where: { email: email },
        data: { forgetPasswordToken: forgetPasswordToken },
      });
      const info = Mailer.sendMail({
        from: "NanoShop",
        to: user.email!,
        subject: "یازیابی پسورد",
        html: `<a href=${forgetPasswordLink}>بازیابی پسورد</a>`,
      });
    } else {
      return NextResponse.json(
        { error: "این ایمیل ثبت نشده است" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
  return NextResponse.json({
    message:
      "ایمیل بازیابی پسورد با موفقیت ارسال شد. اگر مشاهده نکردید. لطفا قسمت اسپم را چک کنید",
  });
}
