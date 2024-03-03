import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany({
    select: { id: true, name: true, image: true, categoryId: true },
  });
  return NextResponse.json(products, { status: 200 });
}
