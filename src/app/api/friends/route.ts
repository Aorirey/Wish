import { NextRequest, NextResponse } from "next/server";
import {
  followByHandle,
  listFriends,
  searchUsersByHandle,
} from "@/server/services/users.service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q) {
    const items = await searchUsersByHandle(q);
    return NextResponse.json({ items });
  }
  const items = await listFriends();
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (typeof body.handle !== "string" || body.handle.trim().length === 0) {
    return NextResponse.json({ error: "Username обязателен" }, { status: 400 });
  }
  try {
    const friend = await followByHandle(body.handle);
    return NextResponse.json(friend, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 400 }
    );
  }
}
