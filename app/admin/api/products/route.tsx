import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const product = await request.json();
    const savedProduct = await prisma?.product.create({ data: product });
    return NextResponse.json(savedProduct, { status: 200 });
  } catch (error: unknown) {
    if ((error as any)?.code == "P2002") {
      return NextResponse.json("نام تکراری است", { status: 400 });
    }
    return NextResponse.json((error as any)?.code, { status: 400 });
  }
}
