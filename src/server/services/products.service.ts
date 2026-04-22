import "server-only";
import { prisma } from "@/server/db";
import { toCategoryDTO, toProductDTO, toStoreDTO } from "@/server/dto";
import type {
  CategoryDTO,
  ProductDTO,
  ProductQuery,
  StoreDTO,
} from "@/types/api";
import type { Prisma } from "@prisma/client";

export async function listProducts(
  q: ProductQuery = {}
): Promise<{ total: number; items: ProductDTO[] }> {
  const where: Prisma.ProductWhereInput = {};

  if (q.category && q.category !== "all") where.categoryId = q.category;
  if (q.store) where.storeId = q.store;

  if (typeof q.minPrice === "number" || typeof q.maxPrice === "number") {
    where.price = {};
    if (typeof q.minPrice === "number") where.price.gte = q.minPrice;
    if (typeof q.maxPrice === "number") where.price.lt = q.maxPrice;
  }

  if (q.q && q.q.trim().length > 0) {
    const needle = q.q.trim();
    where.OR = [
      { title: { contains: needle } },
      { brand: { contains: needle } },
      { tags: { contains: needle } },
      { store: { name: { contains: needle } } },
    ];
  }

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    q.sort === "priceAsc"
      ? { price: "asc" }
      : q.sort === "priceDesc"
      ? { price: "desc" }
      : q.sort === "new"
      ? { createdAt: "desc" }
      : { id: "asc" }; // "trending" — стабильная сортировка

  const take = Math.min(q.limit ?? 60, 200);
  const skip = q.offset ?? 0;

  const [total, rows] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy,
      take,
      skip,
      include: { category: true, store: true },
    }),
  ]);

  return { total, items: rows.map((r) => toProductDTO(r)) };
}

export async function getProduct(id: string): Promise<ProductDTO | null> {
  const row = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      store: true,
      _count: { select: { wishItems: true } },
    },
  });
  if (!row) return null;
  return toProductDTO(row, row._count.wishItems);
}

export async function getRelatedProducts(
  id: string,
  limit = 8
): Promise<ProductDTO[]> {
  const p = await prisma.product.findUnique({ where: { id } });
  if (!p) return [];

  const rows = await prisma.product.findMany({
    where: { categoryId: p.categoryId, NOT: { id } },
    include: { category: true, store: true },
    take: limit,
  });
  return rows.map((r) => toProductDTO(r));
}

export async function listCategories(): Promise<CategoryDTO[]> {
  const rows = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
  });
  return rows.map((c) => toCategoryDTO(c, c._count.products));
}

export async function listStores(): Promise<StoreDTO[]> {
  const rows = await prisma.store.findMany({ orderBy: { name: "asc" } });
  return rows.map(toStoreDTO);
}

export async function getPriceRange(): Promise<{ min: number; max: number }> {
  const agg = await prisma.product.aggregate({
    _min: { price: true },
    _max: { price: true },
  });
  return { min: agg._min.price ?? 0, max: agg._max.price ?? 0 };
}

export async function getSavedByUsers(productId: string) {
  const items = await prisma.wishItem.findMany({
    where: { productId, user: { isMe: false } },
    include: { user: true },
    take: 12,
  });
  return items.map((i) => i.user);
}
