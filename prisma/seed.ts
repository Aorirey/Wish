import { PrismaClient } from "@prisma/client";
import { SEED_CATEGORIES, SEED_STORES, SEED_PRODUCTS } from "./catalog";

const prisma = new PrismaClient();

const SEED_FRIENDS = [
  {
    id: "u_me",
    name: "Вы",
    handle: "you",
    avatar: "https://i.pravatar.cc/160?img=68",
    bio: "Собираю маленькие приятные мелочи.",
    color: "#ff5d83",
    isMe: true,
    lastActive: new Date("2026-04-22T20:00:00Z"),
    wishlist: [
      { pid: "p_airpods_pro_2", priority: "high" },
      { pid: "p_moleskine", priority: "medium" },
      { pid: "p_hario_v60", priority: "low" },
    ],
  },
  {
    id: "u_maya",
    name: "Майя Линдгрен",
    handle: "maya",
    avatar: "https://i.pravatar.cc/160?img=47",
    bio: "Архитектор. Ведёт список вещей, от которых понедельник становится легче.",
    color: "#f6bfcf",
    lastActive: new Date("2026-04-21T09:14:00Z"),
    wishlist: [
      { pid: "p_dyson_airwrap", priority: "high" },
      { pid: "p_laneige_mask", priority: "medium" },
      { pid: "p_letique_lip", priority: "low" },
      { pid: "p_laric_diffuser", priority: "medium" },
      { pid: "p_lego_orchid", priority: "high" },
      { pid: "p_demix_leggings", priority: "medium" },
      { pid: "p_diptyque_candle", priority: "high" },
      { pid: "p_zarina_coat", priority: "medium" },
      { pid: "p_estel_professional", priority: "low" },
    ],
  },
  {
    id: "u_kirill",
    name: "Кирилл Окафор",
    handle: "kirill",
    avatar: "https://i.pravatar.cc/160?img=15",
    bio: "Продуктовый дизайнер, велосипедист, посредственный гитарист.",
    color: "#c2d6ff",
    lastActive: new Date("2026-04-22T18:02:00Z"),
    wishlist: [
      { pid: "p_sony_wh1000xm5", priority: "high" },
      { pid: "p_airpods_pro_2", priority: "medium" },
      { pid: "p_fujifilm_xt30", priority: "high" },
      { pid: "p_jbl_flip", priority: "low" },
      { pid: "p_nb_574", priority: "medium" },
      { pid: "p_columbia_powder", priority: "medium" },
      { pid: "p_keychron_k3", priority: "high" },
      { pid: "p_logitech_mxm3", priority: "medium" },
      { pid: "p_macbook_air_m3", priority: "high" },
    ],
  },
  {
    id: "u_sasha",
    name: "Саша Делакруа",
    handle: "sasha",
    avatar: "https://i.pravatar.cc/160?img=32",
    bio: "Пишет книги о еде. Готова умереть на холме «Staub против Le Creuset».",
    color: "#ffd0a8",
    lastActive: new Date("2026-04-22T13:47:00Z"),
    wishlist: [
      { pid: "p_lodge_cast_iron", priority: "high" },
      { pid: "p_opinel_12", priority: "high" },
      { pid: "p_aeropress", priority: "medium" },
      { pid: "p_bialetti", priority: "medium" },
      { pid: "p_atomic_habits", priority: "low" },
      { pid: "p_staub_cocotte", priority: "high" },
      { pid: "p_delonghi_dedica", priority: "high" },
      { pid: "p_le_creuset_kettle", priority: "medium" },
      { pid: "p_coffee_grinder", priority: "medium" },
      { pid: "p_kitchenaid_mixer", priority: "high" },
    ],
  },
  {
    id: "u_tim",
    name: "Тимофей Альбан",
    handle: "tim",
    avatar: "https://i.pravatar.cc/160?img=12",
    bio: "Рюкзак, поезд, палатка. 47 стран и одни кроссовки.",
    color: "#b6dac3",
    lastActive: new Date("2026-04-20T22:11:00Z"),
    wishlist: [
      { pid: "p_columbia_powder", priority: "high" },
      { pid: "p_outventure_down", priority: "medium" },
      { pid: "p_contigo_bottle", priority: "low" },
      { pid: "p_stanley_quencher", priority: "medium" },
      { pid: "p_instax_mini", priority: "medium" },
      { pid: "p_naturehike_tent", priority: "high" },
      { pid: "p_backpack_deuter", priority: "high" },
      { pid: "p_black_diamond_headlamp", priority: "medium" },
      { pid: "p_garmin_fenix", priority: "high" },
      { pid: "p_trekking_poles", priority: "low" },
    ],
  },
  {
    id: "u_irina",
    name: "Ирина Наумова",
    handle: "irina",
    avatar: "https://i.pravatar.cc/160?img=48",
    bio: "Читает запоем. Составляет идеальные плейлисты. Щепетильна насчёт бумаги.",
    color: "#d4b0ff",
    lastActive: new Date("2026-04-22T07:31:00Z"),
    wishlist: [
      { pid: "p_onyx_palma", priority: "high" },
      { pid: "p_atomic_habits", priority: "medium" },
      { pid: "p_manson_book", priority: "low" },
      { pid: "p_moleskine", priority: "medium" },
      { pid: "p_at_turntable", priority: "high" },
      { pid: "p_sberboom", priority: "medium" },
      { pid: "p_ishiguro_book", priority: "high" },
      { pid: "p_sapiens_book", priority: "medium" },
      { pid: "p_vinyl_queen", priority: "medium" },
      { pid: "p_vinyl_daft_punk", priority: "high" },
      { pid: "p_bookshelf_helper", priority: "low" },
    ],
  },
  {
    id: "u_danila",
    name: "Данила Марин",
    handle: "danila",
    avatar: "https://i.pravatar.cc/160?img=60",
    bio: "По выходным паяет синтезаторы. Знает, что такое Signal Chain.",
    color: "#ffe3a8",
    lastActive: new Date("2026-04-19T16:25:00Z"),
    wishlist: [
      { pid: "p_sberboom", priority: "high" },
      { pid: "p_at_turntable", priority: "high" },
      { pid: "p_jbl_flip", priority: "medium" },
      { pid: "p_ps5_slim", priority: "high" },
      { pid: "p_switch_oled", priority: "medium" },
      { pid: "p_station_mini_2", priority: "medium" },
      { pid: "p_marantz_amp", priority: "high" },
      { pid: "p_fender_guitar", priority: "high" },
      { pid: "p_yamaha_keyboard", priority: "medium" },
      { pid: "p_ds5_controller", priority: "low" },
      { pid: "p_rog_ally_x", priority: "high" },
    ],
  },
  {
    id: "u_dasha",
    name: "Даша Аронова",
    handle: "dasha",
    avatar: "https://i.pravatar.cc/160?img=23",
    bio: "Варит фильтр дома. Кулинарит по выходным, читает в транспорте.",
    color: "#f0d0c0",
    lastActive: new Date("2026-04-22T11:01:00Z"),
    wishlist: [
      { pid: "p_hario_v60", priority: "high" },
      { pid: "p_coffee_grinder", priority: "high" },
      { pid: "p_aeropress", priority: "medium" },
      { pid: "p_muji_kettle", priority: "medium" },
      { pid: "p_sketchbook", priority: "low" },
      { pid: "p_apple_watch_se", priority: "high" },
      { pid: "p_ipad_air", priority: "high" },
      { pid: "p_lime_hoodie", priority: "medium" },
      { pid: "p_casio_f91", priority: "low" },
    ],
  },
  {
    id: "u_artem",
    name: "Артём Волков",
    handle: "artem",
    avatar: "https://i.pravatar.cc/160?img=64",
    bio: "Задротит в Factorio, читает научпоп. В офисе часто в худи.",
    color: "#b3c1d6",
    lastActive: new Date("2026-04-22T19:44:00Z"),
    wishlist: [
      { pid: "p_nvidia_4070", priority: "high" },
      { pid: "p_razer_keyboard", priority: "high" },
      { pid: "p_logitech_g502", priority: "medium" },
      { pid: "p_corsair_headset", priority: "medium" },
      { pid: "p_steamdeck_oled", priority: "high" },
      { pid: "p_8bitdo_arcade", priority: "low" },
      { pid: "p_xbox_series_x", priority: "medium" },
      { pid: "p_sapiens_book", priority: "medium" },
      { pid: "p_marshall_major", priority: "medium" },
    ],
  },
  {
    id: "u_lena",
    name: "Лена Чернова",
    handle: "lena",
    avatar: "https://i.pravatar.cc/160?img=44",
    bio: "Мама двоих. Превращает хаос детской в дизайн‑объекты.",
    color: "#ffcad0",
    lastActive: new Date("2026-04-21T15:10:00Z"),
    wishlist: [
      { pid: "p_lego_city", priority: "medium" },
      { pid: "p_lego_botanical", priority: "high" },
      { pid: "p_kapla_wooden", priority: "high" },
      { pid: "p_kidizoom", priority: "medium" },
      { pid: "p_puzzle_ravensburger", priority: "low" },
      { pid: "p_scooter_micro", priority: "high" },
      { pid: "p_board_catan", priority: "medium" },
      { pid: "p_board_monopoly", priority: "low" },
      { pid: "p_bedsheet_seven", priority: "medium" },
      { pid: "p_hoff_sofa", priority: "high" },
    ],
  },
];

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

  console.log(`👥 Users (${SEED_FRIENDS.length})…`);
  for (const f of SEED_FRIENDS) {
    await prisma.user.create({
      data: {
        id: f.id,
        name: f.name,
        handle: f.handle,
        avatar: f.avatar,
        bio: f.bio,
        color: f.color,
        isMe: f.isMe ?? false,
        lastActive: f.lastActive,
      },
    });
    for (const item of f.wishlist) {
      await prisma.wishItem.create({
        data: {
          userId: f.id,
          productId: item.pid,
          priority: item.priority ?? "medium",
        },
      });
    }
  }

  const count = await prisma.product.count();
  const users = await prisma.user.count();
  const wi = await prisma.wishItem.count();
  console.log(`\n✅ Seed complete: ${count} products, ${users} users, ${wi} wish items.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
