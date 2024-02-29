import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";

export async function GET(request: NextRequest) {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories, { status: 200 });
}
