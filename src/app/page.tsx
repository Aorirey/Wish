import { listProducts } from "@/server/services/products.service";
import { listFriends } from "@/server/services/users.service";
import { LandingClient } from "@/components/landing/LandingClient";
import { prisma } from "@/server/db";

export const dynamic = "force-dynamic";

export default async function Landing() {
  const featuredIds = [
    "p_airpods_pro_2",
    "p_laneige_mask",
    "p_sony_wh1000xm5",
    "p_lego_orchid",
    "p_nb_574",
    "p_jbl_flip",
  ];

  const showcaseIds = [
    "p_sony_wh1000xm5",
    "p_stanley_quencher",
    "p_dyson_airwrap",
    "p_lego_orchid",
    "p_nb_574",
    "p_fujifilm_xt30",
    "p_at_turntable",
    "p_letique_lip",
  ];

  const [featured, showcase, friends, totalProducts, totalStores, totalAdds] =
    await Promise.all([
      prisma.product.findMany({
        where: { id: { in: featuredIds } },
        include: { category: true, store: true },
      }),
      prisma.product.findMany({
        where: { id: { in: showcaseIds } },
        include: { category: true, store: true },
      }),
      listFriends(),
      prisma.product.count(),
      prisma.store.count(),
      prisma.wishItem.count(),
    ]);

  // Преобразуем в DTO через listProducts-подобную сериализацию.
  const featuredProducts = featuredIds
    .map((id) => featured.find((p) => p.id === id))
    .filter(Boolean)
    .map((p) => ({
      id: p!.id,
      title: p!.title,
      image: p!.image,
      color: p!.color ?? undefined,
    }));

  const showcaseProducts = showcaseIds
    .map((id) => showcase.find((p) => p.id === id))
    .filter(Boolean)
    .map((p) => ({
      id: p!.id,
      title: p!.title,
      brand: p!.brand,
      price: p!.price,
      image: p!.image,
      color: p!.color ?? undefined,
    }));

  return (
    <LandingClient
      floats={featuredProducts}
      showcase={showcaseProducts}
      friendAvatars={friends
        .slice(0, 4)
        .map((f) => f.avatar ?? "")
        .filter(Boolean)}
      stats={{
        products: totalProducts,
        stores: totalStores,
        adds: totalAdds,
      }}
    />
  );
}
