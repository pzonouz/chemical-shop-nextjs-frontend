import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import crypto from "crypto";

// https://medium.com/@xhowais/next-js-file-upload-api-tutorial-local-directroy-7ec039efbd66
// https://www.youtube.com/watch?v=-_bhH4MLq1Y&t=73s
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const images_path = "/public/images/";
    const fileName = crypto.randomBytes(16).toString("hex");
    const extension = file.name.split(".")[1];
    const path = join(process.cwd() + images_path + fileName + "." + extension);
    await writeFile(path, buffer);
    return NextResponse.json(
      {
        path: request.nextUrl.origin + "/images/" + fileName + "." + extension,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json( error , { status: 400 });
  }
}
