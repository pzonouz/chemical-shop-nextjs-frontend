import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "../../../../prisma/prisma";

export interface User {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
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
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await prisma.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
      },
    });
    if (user) {
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
