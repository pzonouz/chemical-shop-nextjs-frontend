import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedItem = await prisma?.category.deleteMany({
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
    const category = await request.json();
    const savedCategory = await prisma?.category.updateMany({
      where: { id: params.id },
      data: category,
    });
    return NextResponse.json(savedCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
