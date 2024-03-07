import { Product } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function POST(request: NextRequest) {
  try {
    const res: Product = await request.json();
    const savedProduct: Product = await prisma?.product.create({
      data: res,
    });
    return NextResponse.json(savedProduct, { status: 200 });
  } catch (error: unknown) {
    if ((error as any)?.code == "P2002") {
      return NextResponse.json("نام تکراری است", { status: 400 });
    }
    return NextResponse.json((error as any)?.code, { status: 400 });
  }
}
