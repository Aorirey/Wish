import { NextResponse } from "next/server";
import { getRecentActivity } from "@/server/services/users.service";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Number(url.searchParams.get("limit") ?? "10");
  const items = await getRecentActivity(Number.isFinite(limit) ? limit : 10);
  return NextResponse.json({ items });
}
