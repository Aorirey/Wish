import "server-only";
import { prisma } from "@/server/db";
import {
  toFriendSummaryDTO,
  toUserDTO,
  toWishItemDTO,
} from "@/server/dto";
import type {
  ActivityEventDTO,
  FriendSummaryDTO,
  UserDTO,
  WishItemDTO,
} from "@/types/api";

export async function getMe(): Promise<UserDTO> {
  const me = await prisma.user.findFirst({ where: { isMe: true } });
  if (!me) throw new Error("Seed the database first (npm run db:seed).");
  return toUserDTO(me);
}

export async function updateMe(
  patch: Partial<Pick<UserDTO, "name" | "handle" | "bio" | "color">>
): Promise<UserDTO> {
  const me = await prisma.user.findFirst({ where: { isMe: true } });
  if (!me) throw new Error("No `me` user in database.");

  const updated = await prisma.user.update({
    where: { id: me.id },
    data: {
      name: patch.name ?? me.name,
      handle: patch.handle ?? me.handle,
      bio: patch.bio ?? me.bio,
      color: patch.color ?? me.color,
    },
  });
  return toUserDTO(updated);
}

export async function listFriends(): Promise<FriendSummaryDTO[]> {
  const rows = await prisma.user.findMany({
    where: { isMe: false },
    orderBy: { lastActive: "desc" },
    include: {
      wishItems: {
        take: 3,
        orderBy: { addedAt: "desc" },
        include: { product: true },
      },
      _count: { select: { wishItems: true } },
    },
  });

  return rows.map((u) =>
    toFriendSummaryDTO(
      u,
      u._count.wishItems,
      u.wishItems.map((w) => w.product.image)
    )
  );
}

export async function getFriend(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user || user.isMe) return null;

  const wishItems = await prisma.wishItem.findMany({
    where: { userId: id },
    orderBy: { addedAt: "desc" },
    include: {
      product: { include: { category: true, store: true } },
    },
  });

  return {
    user: toUserDTO(user),
    wishItems: wishItems.map(toWishItemDTO),
  };
}

export async function getRecentActivity(limit = 10): Promise<ActivityEventDTO[]> {
  const rows = await prisma.wishItem.findMany({
    where: { user: { isMe: false } },
    orderBy: { addedAt: "desc" },
    take: limit,
    include: {
      user: true,
      product: { include: { category: true, store: true } },
    },
  });
  return rows.map((r) => ({
    id: r.id,
    user: toUserDTO(r.user),
    product: {
      id: r.product.id,
      title: r.product.title,
      brand: r.product.brand,
      description: r.product.description,
      price: r.product.price,
      originalPrice: r.product.originalPrice ?? null,
      currency: r.product.currency,
      image: r.product.image,
      color: r.product.color ?? null,
      tags: r.product.tags ? r.product.tags.split(",").filter(Boolean) : [],
      storeUrl: r.product.storeUrl,
      createdAt: r.product.createdAt.toISOString(),
      category: {
        id: r.product.category.id,
        label: r.product.category.label,
        emoji: r.product.category.emoji,
      },
      store: {
        id: r.product.store.id,
        name: r.product.store.name,
        website: r.product.store.website,
      },
    },
    when: r.addedAt.toISOString(),
  }));
}

export async function getMonthlyStats() {
  const since = new Date();
  since.setDate(since.getDate() - 30);
  const [addsLast30, totalLists, totalUsers] = await Promise.all([
    prisma.wishItem.count({ where: { addedAt: { gte: since } } }),
    prisma.user.count(),
    prisma.user.count({ where: { isMe: false } }),
  ]);
  return { addsLast30, totalLists, totalUsers };
}

export async function getHotCategory(): Promise<{ label: string; delta: string } | null> {
  const since = new Date();
  since.setDate(since.getDate() - 30);
  const rows = await prisma.wishItem.groupBy({
    by: ["productId"],
    where: { addedAt: { gte: since } },
    _count: { productId: true },
  });
  if (rows.length === 0) return null;
  const products = await prisma.product.findMany({
    where: { id: { in: rows.map((r) => r.productId) } },
    include: { category: true },
  });
  const counts: Record<string, { label: string; count: number }> = {};
  for (const r of rows) {
    const p = products.find((x) => x.id === r.productId);
    if (!p) continue;
    const key = p.categoryId;
    counts[key] = counts[key] ?? { label: p.category.label, count: 0 };
    counts[key].count += r._count.productId;
  }
  const sorted = Object.values(counts).sort((a, b) => b.count - a.count);
  const top = sorted[0];
  if (!top) return null;
  return { label: top.label, delta: "+24% за неделю" };
}
