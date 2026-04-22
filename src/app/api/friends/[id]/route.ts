import { NextResponse } from "next/server";
import { deleteFriend, getFriend } from "@/server/services/users.service";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const data = await getFriend(params.id);
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await deleteFriend(params.id);
  return NextResponse.json({ ok: true });
}
