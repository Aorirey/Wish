import "server-only";
import { prisma } from "@/server/db";
import {
  toFriendSummaryDTO,
  toUserDTO,
  toWishItemDTO,
} from "@/server/dto";
import type {
  ActivityEventDTO,
  FriendSearchResultDTO,
  FriendSummaryDTO,
  UserDTO,
  WishItemDTO,
} from "@/types/api";

export async function getMe(): Promise<UserDTO> {
  const me = await prisma.user.findFirst({ where: { isMe: true } });
  if (!me) throw new Error("Seed the database first (npm run db:seed).");
  return toUserDTO(me);
}

export type UpdateMePatch = Partial<
  Pick<UserDTO, "name" | "handle" | "bio" | "color" | "avatar" | "birthday">
>;

export async function updateMe(patch: UpdateMePatch): Promise<UserDTO> {
  const me = await prisma.user.findFirst({ where: { isMe: true } });
  if (!me) throw new Error("No `me` user in database.");

  const updated = await prisma.user.update({
    where: { id: me.id },
    data: {
      name: patch.name ?? me.name,
      handle: patch.handle ?? me.handle,
      bio: patch.bio ?? me.bio,
      color: patch.color ?? me.color,
      avatar: patch.avatar === undefined ? me.avatar : patch.avatar,
      birthday:
        patch.birthday === undefined
          ? me.birthday
          : patch.birthday === null
          ? null
          : new Date(patch.birthday),
    },
  });
  return toUserDTO(updated);
}

export async function listFriends(): Promise<FriendSummaryDTO[]> {
  const me = await prisma.user.findFirst({ where: { isMe: true } });
  if (!me) return [];

  const follows = await prisma.follow.findMany({
    where: { followerId: me.id },
    orderBy: { createdAt: "desc" },
    include: {
      following: {
        include: {
          wishItems: {
            take: 3,
            orderBy: { addedAt: "desc" },
            include: { product: true },
          },
          _count: { select: { wishItems: true } },
        },
      },
    },
  });

  return follows.map((f) =>
    toFriendSummaryDTO(
      f.following,
      f.following._count.wishItems,
      f.following.wishItems.map((w) => w.product.image)
    )
  );
}

export async function searchUsersByHandle(query: string): Promise<FriendSearchResultDTO[]> {
  const me = await prisma.user.findFirst({ where: { isMe: true } });
  if (!me) throw new Error("No `me` user in database.");

  const normalized = query
    .trim()
    .toLowerCase()
    .replace(/^@+/, "")
    .replace(/[^a-z0-9_]/g, "");
  if (normalized.length < 2) return [];

  const rows = await prisma.user.findMany({
    where: {
      isMe: false,
      handle: { contains: normalized, mode: "insensitive" },
    },
    orderBy: { lastActive: "desc" },
    take: 20,
  });

  const followedIds = new Set(
    (
      await prisma.follow.findMany({
        where: { followerId: me.id, followingId: { in: rows.map((r) => r.id) } },
        select: { followingId: true },
      })
    ).map((x) => x.followingId)
  );

  return rows.map((u) => ({
    ...toUserDTO(u),
    isFollowing: followedIds.has(u.id),
  }));
}

export async function followByHandle(handle: string): Promise<UserDTO> {
  const me = await prisma.user.findFirst({ where: { isMe: true } });
  if (!me) throw new Error("No `me` user in database.");

  const normalized = handle
    .trim()
    .toLowerCase()
    .replace(/^@+/, "")
    .replace(/[^a-z0-9_]/g, "");
  if (!normalized) throw new Error("Укажите username.");

  const target = await prisma.user.findUnique({
    where: { handle: normalized },
  });
  if (!target || target.isMe) throw new Error("Пользователь не найден.");

  await prisma.follow.upsert({
    where: {
      followerId_followingId: { followerId: me.id, followingId: target.id },
    },
    update: {},
    create: {
      followerId: me.id,
      followingId: target.id,
    },
  });

  return toUserDTO(target);
}

export async function unfollowFriend(id: string): Promise<void> {
  const me = await prisma.user.findFirst({ where: { isMe: true } });
  if (!me) throw new Error("No `me` user in database.");
  await prisma.follow.deleteMany({
    where: { followerId: me.id, followingId: id },
  });
}

export async function getFriend(id: string) {
  const me = await prisma.user.findFirst({ where: { isMe: true } });
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user || user.isMe) return null;
  if (me) {
    const isFollowing = await prisma.follow.findUnique({
      where: {
        followerId_followingId: { followerId: me.id, followingId: id },
      },
    });
    if (!isFollowing) return null;
  }

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
  const me = await prisma.user.findFirst({ where: { isMe: true } });
  if (!me) return [];
  const followRows = await prisma.follow.findMany({
    where: { followerId: me.id },
    select: { followingId: true },
  });
  const followingIds = followRows.map((r) => r.followingId);
  if (followingIds.length === 0) return [];
  const rows = await prisma.wishItem.findMany({
    where: { userId: { in: followingIds } },
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
