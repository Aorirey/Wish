import { PrismaClient } from "@prisma/client";
import { SEED_CATEGORIES, SEED_STORES, SEED_PRODUCTS } from "./catalog";

const prisma = new PrismaClient();

// Мы намеренно НЕ сидим фейковых друзей — друзья создаются пользователем
// вручную в разделе «Друзья». Только один пользователь: me.
async function main() {
  console.log("🗑  Clearing tables…");
  await prisma.reservation.deleteMany();
  await prisma.wishItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  await prisma.store.deleteMany();
  await prisma.category.deleteMany();

  console.log("📂 Categories…");
  for (const c of SEED_CATEGORIES) {
    await prisma.category.create({ data: c });
  }

  console.log("🏬 Stores…");
  for (const s of SEED_STORES) {
    await prisma.store.create({ data: s });
  }

  console.log(`📦 Products (${SEED_PRODUCTS.length})…`);
  for (const p of SEED_PRODUCTS) {
    await prisma.product.create({
      data: {
        id: p.id,
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
      },
    });
  }

  console.log("👤 Me…");
  await prisma.user.create({
    data: {
      id: "u_me",
      name: "Вы",
      handle: "you",
      avatar: null, // изначально без аватара — пользователь загрузит сам
      bio: "",
      color: "#ff5d83",
      isMe: true,
    },
  });

  const count = await prisma.product.count();
  console.log(`\n✅ Seed complete: ${count} products. Список друзей — пустой, добавляйте в приложении.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
