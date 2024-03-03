import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedItem = await prisma?.product.delete({
      where: { id: params.id },
    });
    return NextResponse.json(deletedItem, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await request.json();
    const savedProduct = await prisma?.product.updateMany({
      where: { id: params.id },
      data: product,
    });
    return NextResponse.json(savedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
