import { PrismaClient } from "@prisma/client";
import { SEED_CATEGORIES, SEED_STORES, SEED_PRODUCTS } from "./catalog";

const prisma = new PrismaClient();

// Идемпотентный сид: безопасно запускать на каждом деплое.
// - Каталог (категории / магазины / товары) апсёртится.
// - Пользователь `u_me` создаётся только если его ещё нет.
// - Пользовательские данные (друзья, вишлисты, резервации) никогда не трогаются.
async function main() {
  console.log("📂 Upserting categories…");
  for (const c of SEED_CATEGORIES) {
    await prisma.category.upsert({
      where: { id: c.id },
      update: { label: c.label, emoji: c.emoji },
      create: c,
    });
  }

  console.log("🏬 Upserting stores…");
  for (const s of SEED_STORES) {
    await prisma.store.upsert({
      where: { id: s.id },
      update: { name: s.name, website: s.website },
      create: s,
    });
  }

  console.log(`📦 Upserting products (${SEED_PRODUCTS.length})…`);
  for (const p of SEED_PRODUCTS) {
    const data = {
      title: p.title,
      brand: p.brand,
      description: p.description,
      price: p.price,
      originalPrice: p.originalPrice ?? null,
      currency: p.currency ?? "RUB",
      image: p.image,
      color: p.color ?? null,
      tags: (p.tags ?? []).join(","),
      storeUrl: p.storeUrl,
      categoryId: p.categoryId,
      storeId: p.storeId,
    };
    await prisma.product.upsert({
      where: { id: p.id },
      update: data,
      create: { id: p.id, ...data },
    });
  }

  console.log("👤 Ensuring `me` user exists…");
  await prisma.user.upsert({
    where: { id: "u_me" },
    update: {},
    create: {
      id: "u_me",
      name: "Вы",
      handle: "you",
      avatar: null,
      bio: "",
      color: "#ff5d83",
      isMe: true,
    },
  });

  const count = await prisma.product.count();
  console.log(`\n✅ Seed complete: ${count} products. Пользовательские данные не затронуты.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
