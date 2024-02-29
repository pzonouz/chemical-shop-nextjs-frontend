import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const itemName = params.name;
    const deletedItem = await prisma?.category.deleteMany({
      where: { name: itemName },
    });
    return NextResponse.json(deletedItem, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
