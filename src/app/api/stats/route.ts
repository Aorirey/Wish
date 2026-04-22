import { NextResponse } from "next/server";
import {
  getHotCategory,
  getMonthlyStats,
} from "@/server/services/users.service";
import { prisma } from "@/server/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const [monthly, hot, totalProducts, totalStores] = await Promise.all([
    getMonthlyStats(),
    getHotCategory(),
    prisma.product.count(),
    prisma.store.count(),
  ]);

  const me = await prisma.user.findFirst({ where: { isMe: true } });
  const myCount = me
    ? await prisma.wishItem.count({ where: { userId: me.id } })
    : 0;

  return NextResponse.json({
    myCount,
    totalProducts,
    totalStores,
    addsLast30: monthly.addsLast30,
    totalUsers: monthly.totalUsers,
    hot,
  });
}
