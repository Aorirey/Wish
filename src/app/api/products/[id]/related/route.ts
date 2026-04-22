import { NextResponse } from "next/server";
import { getRelatedProducts } from "@/server/services/products.service";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const items = await getRelatedProducts(params.id);
  return NextResponse.json({ items });
}
