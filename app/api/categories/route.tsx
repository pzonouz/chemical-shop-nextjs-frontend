import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";

export async function GET(request: NextRequest) {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true, image: true },
  });
  return NextResponse.json(categories, { status: 200 });
}
