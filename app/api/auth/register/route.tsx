import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";

import prisma from "../../../../prisma/prisma";
import { Mailer } from "@/app/utils/Mailer";

export interface User {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  verification_token?: string;
  createdAt: Date;
  updatedAp: Date;
  addresses?: any[];
}

export async function POST(request: NextRequest) {
  const data: User = await request.json();
  const { email, password, confirmPassword } = data;
  try {
    let user = await prisma.user.findUnique({ where: { email: email } });
    if (user) {
      return NextResponse.json(
        { error: "ایمیل قبلا ثبت شده است" },
        { status: 400 }
      );
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "پسورد ها منطبق نیست" },
        { status: 400 }
      );
    }
    const verification_token = crypto.randomBytes(16).toString("hex");
    const emailVerificationAddress = `http://localhost:3000/api/auth/email/${verification_token}/verification`;
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await prisma.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
        emailVerificationToken: verification_token,
      },
    });
    if (user) {
      const emailResponse = await Mailer.sendMail({
        from: "Nanoshop",
        to: user.email!,
        subject: "Email Verification",
        html: `<p>Click this <a href=${emailVerificationAddress}>Link</a> to verify Email.</p>`,
      });
      return NextResponse.json({ status: 200 });
    }
    return NextResponse.json(
      { error: "مشکلی در ایجاد کاربر پیش آمده است" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
