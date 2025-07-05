import { NextResponse } from "next/server";
import path from "path";
import { readFile } from "fs/promises";

export async function POST() {
  try {
    const filePath = path.join(process.cwd(), "server_response.json");
    const fileContent = await readFile(filePath, "utf-8");
    const jsonData = JSON.parse(fileContent);

    return NextResponse.json({
      success: true,
      content: jsonData,
    });
  } catch (err) {
    console.error("Lỗi đọc file mock:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
