import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_SIZE = 3 * 1024 * 1024; // 3 МБ
const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

// POST /api/uploads/avatar — multipart/form-data с полем `file`.
// Возвращает { url } для дальнейшего PATCH /api/me { avatar: url }.
export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");

  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "Не передан файл" }, { status: 400 });
  }

  const type = (file as File).type;
  const ext = ALLOWED[type];
  if (!ext) {
    return NextResponse.json(
      { error: "Поддерживаются только JPG, PNG, WEBP или GIF" },
      { status: 400 }
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Файл больше 3 МБ" },
      { status: 400 }
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const name = `${crypto.randomBytes(12).toString("hex")}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", "avatars");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), bytes);

  const url = `/uploads/avatars/${name}`;
  return NextResponse.json({ url }, { status: 201 });
}
