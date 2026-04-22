import { NextResponse } from "next/server";
import { listStores } from "@/server/services/products.service";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await listStores();
  return NextResponse.json({ items });
}
