import { NextResponse } from "next/server";
import { listCategories, getPriceRange } from "@/server/services/products.service";

export const dynamic = "force-dynamic";

export async function GET() {
  const [items, range] = await Promise.all([listCategories(), getPriceRange()]);
  return NextResponse.json({ items, priceRange: range });
}
