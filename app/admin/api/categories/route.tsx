import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const category = await request.json();
    const savedCategory = await prisma?.category.create({ data: category });
    return NextResponse.json(savedCategory, { status: 200 });
  } catch (error: unknown) {
    if ((error as any)?.code == "P2002") {
      return NextResponse.json("نام تکراری است", { status: 400 });
    }
    return NextResponse.json((error as any)?.code, { status: 400 });
  }
}
export async function PATCH(request: NextRequest) {
  try {
    const category = await request.json();
    const savedCategory = await prisma?.category.create({ data: category });
    return NextResponse.json(savedCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
