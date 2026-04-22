import "server-only";
import { prisma } from "@/server/db";
import { toWishItemDTO } from "@/server/dto";
import type { Priority, WishItemDTO } from "@/types/api";
import { getMe } from "./users.service";

export async function getMyWishlist(): Promise<WishItemDTO[]> {
  const me = await getMe();
  const items = await prisma.wishItem.findMany({
    where: { userId: me.id },
    orderBy: { addedAt: "desc" },
    include: { product: { include: { category: true, store: true } } },
  });
  return items.map(toWishItemDTO);
}

export async function addToMyWishlist(
  productId: string,
  priority: Priority = "medium"
): Promise<WishItemDTO> {
  const me = await getMe();
  const existing = await prisma.wishItem.findUnique({
    where: { userId_productId: { userId: me.id, productId } },
    include: { product: { include: { category: true, store: true } } },
  });
  if (existing) return toWishItemDTO(existing);

  const created = await prisma.wishItem.create({
    data: { userId: me.id, productId, priority },
    include: { product: { include: { category: true, store: true } } },
  });
  return toWishItemDTO(created);
}

export async function removeFromMyWishlist(productId: string): Promise<void> {
  const me = await getMe();
  await prisma.wishItem.deleteMany({
    where: { userId: me.id, productId },
  });
}

export async function updateMyWishItem(
  productId: string,
  patch: { priority?: Priority; note?: string | null }
): Promise<WishItemDTO | null> {
  const me = await getMe();
  const existing = await prisma.wishItem.findUnique({
    where: { userId_productId: { userId: me.id, productId } },
  });
  if (!existing) return null;
  const updated = await prisma.wishItem.update({
    where: { id: existing.id },
    data: {
      priority: patch.priority ?? existing.priority,
      note: patch.note === undefined ? existing.note : patch.note,
    },
    include: { product: { include: { category: true, store: true } } },
  });
  return toWishItemDTO(updated);
}

export async function clearMyWishlist(): Promise<void> {
  const me = await getMe();
  await prisma.wishItem.deleteMany({ where: { userId: me.id } });
}

// ---- Reservations ----

export async function toggleReservation(
  productId: string,
  forUserId: string
): Promise<{ reserved: boolean }> {
  const me = await getMe();
  const existing = await prisma.reservation.findFirst({
    where: { userId: me.id, productId, forUserId },
  });
  if (existing) {
    await prisma.reservation.delete({ where: { id: existing.id } });
    return { reserved: false };
  }
  await prisma.reservation.create({
    data: { userId: me.id, productId, forUserId },
  });
  return { reserved: true };
}

export async function getMyReservationsFor(
  forUserId: string
): Promise<Record<string, boolean>> {
  const me = await getMe();
  const rows = await prisma.reservation.findMany({
    where: { userId: me.id, forUserId },
  });
  return Object.fromEntries(rows.map((r) => [r.productId, true]));
}
