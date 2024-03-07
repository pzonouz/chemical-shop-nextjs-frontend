import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { Mailer } from "@/app/utils/Mailer";
import { User } from "@/kysely/types";
import {
  createUser,
  findUserByEmail,
} from "@/kysely/repositories/UserRepository";

export async function POST(request: NextRequest) {
  const data: User = await request.json();
  const { email, password, confirmPassword } = data;
  try {
    let user = await findUserByEmail(email);
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
    const emailVerificationAddress = `${request.nextUrl.origin}/api/auth/email/${verification_token}/verification`;
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await createUser({ email: email, hashedPassword: hashedPassword });
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
    return NextResponse.json(error, { status: 400 });
  }
}
