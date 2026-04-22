import { NextResponse } from "next/server";
import { listFriends } from "@/server/services/users.service";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await listFriends();
  return NextResponse.json({ items });
}
