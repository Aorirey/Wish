import { NextRequest, NextResponse } from "next/server";
import { listProducts } from "@/server/services/products.service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  const toNum = (v: string | null) => (v === null || v === "" ? undefined : Number(v));

  const data = await listProducts({
    q: sp.get("q") ?? undefined,
    category: sp.get("category") ?? undefined,
    store: sp.get("store") ?? undefined,
    minPrice: toNum(sp.get("minPrice")),
    maxPrice: toNum(sp.get("maxPrice")),
    sort: (sp.get("sort") as "trending" | "priceAsc" | "priceDesc" | "new") ?? undefined,
    limit: toNum(sp.get("limit")),
    offset: toNum(sp.get("offset")),
  });

  return NextResponse.json(data);
}
