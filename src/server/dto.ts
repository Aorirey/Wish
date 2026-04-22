import type { Category, Product, Store, User, WishItem } from "@prisma/client";
import type {
  CategoryDTO,
  FriendSummaryDTO,
  ProductDTO,
  StoreDTO,
  UserDTO,
  WishItemDTO,
} from "@/types/api";

export type ProductRow = Product & { category: Category; store: Store };

export function toProductDTO(p: ProductRow, savedByCount?: number): ProductDTO {
  return {
    id: p.id,
    title: p.title,
    brand: p.brand,
    description: p.description,
    price: p.price,
    originalPrice: p.originalPrice ?? null,
    currency: p.currency,
    image: p.image,
    color: p.color ?? null,
    tags: p.tags ? p.tags.split(",").filter(Boolean) : [],
    storeUrl: p.storeUrl,
    category: toCategoryDTO(p.category),
    store: toStoreDTO(p.store),
    createdAt: p.createdAt.toISOString(),
    savedByCount,
  };
}

export function toCategoryDTO(c: Category, productCount?: number): CategoryDTO {
  return {
    id: c.id,
    label: c.label,
    emoji: c.emoji,
    productCount,
  };
}

export function toStoreDTO(s: Store): StoreDTO {
  return { id: s.id, name: s.name, website: s.website };
}

export function toUserDTO(u: User): UserDTO {
  return {
    id: u.id,
    name: u.name,
    handle: u.handle,
    avatar: u.avatar ?? null,
    bio: u.bio,
    color: u.color,
    isMe: u.isMe,
    lastActive: u.lastActive.toISOString(),
  };
}

export function toFriendSummaryDTO(
  u: User,
  wishCount: number,
  previewImages: string[]
): FriendSummaryDTO {
  return {
    ...toUserDTO(u),
    wishCount,
    previewImages,
  };
}

export function toWishItemDTO(
  wi: WishItem & { product: ProductRow }
): WishItemDTO {
  return {
    id: wi.id,
    product: toProductDTO(wi.product),
    priority: (wi.priority as WishItemDTO["priority"]) ?? "medium",
    note: wi.note ?? null,
    addedAt: wi.addedAt.toISOString(),
  };
}
