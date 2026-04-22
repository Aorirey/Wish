import { NextRequest, NextResponse } from "next/server";
import {
  addToMyWishlist,
  clearMyWishlist,
  getMyWishlist,
  removeFromMyWishlist,
  updateMyWishItem,
} from "@/server/services/wishlist.service";
import type { Priority } from "@/types/api";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await getMyWishlist();
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const productId: unknown = body.productId;
  if (typeof productId !== "string") {
    return NextResponse.json({ error: "productId required" }, { status: 400 });
  }
  const priority: Priority =
    body.priority === "low" || body.priority === "high" ? body.priority : "medium";
  const item = await addToMyWishlist(productId, priority);
  return NextResponse.json(item, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const productId: unknown = body.productId;
  if (typeof productId !== "string") {
    return NextResponse.json({ error: "productId required" }, { status: 400 });
  }
  const updated = await updateMyWishItem(productId, {
    priority:
      body.priority === "low" || body.priority === "medium" || body.priority === "high"
        ? body.priority
        : undefined,
    note: typeof body.note === "string" ? body.note : undefined,
  });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const productId = url.searchParams.get("productId");
  if (productId) {
    await removeFromMyWishlist(productId);
    return NextResponse.json({ ok: true });
  }
  if (url.searchParams.get("all") === "true") {
    await clearMyWishlist();
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "productId or all=true required" }, { status: 400 });
}
