import { NextRequest, NextResponse } from "next/server";
import {
  getMyReservationsFor,
  toggleReservation,
} from "@/server/services/wishlist.service";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { friendId: string } }
) {
  const map = await getMyReservationsFor(params.friendId);
  return NextResponse.json(map);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { friendId: string } }
) {
  const body = await req.json().catch(() => ({}));
  const productId: unknown = body.productId;
  if (typeof productId !== "string") {
    return NextResponse.json({ error: "productId required" }, { status: 400 });
  }
  const res = await toggleReservation(productId, params.friendId);
  return NextResponse.json(res);
}
