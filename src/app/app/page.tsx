"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Heart, Sparkles, TrendingUp } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { products, categories } from "@/data/products";
import { friends } from "@/data/friends";
import { Avatar } from "@/components/ui/Avatar";
import { useWishlist, useProfile } from "@/store/wishlist";
import { formatPrice, timeAgo, pluralizeItems, pluralizeFriends } from "@/lib/utils";

function AmbientHello() {
  const name = useProfile((s) => s.name);
  const firstName = name.split(" ")[0];
  const hour = new Date().getHours();
  const greeting =
    hour < 5
      ? "Ещё не спите"
      : hour < 12
      ? "Доброе утро"
      : hour < 18
      ? "Добрый день"
      : "Добрый вечер";
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
        {greeting}
      </p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink-950 sm:text-5xl">
        Привет, {firstName}.
      </h1>
      <p className="mt-3 max-w-xl text-ink-500">
        Посмотрите, что сохраняют ваши друзья, и несколько вещей, которые стоит рассмотреть.
      </p>
    </div>
  );
}

function StatsRow() {
  const wishCount = useWishlist((s) => s.items.length);
  const cards = [
    {
      icon: Heart,
      label: "Ваш вишлист",
      value: pluralizeItems(wishCount),
      sub: "Аккуратно подобран",
    },
    {
      icon: Sparkles,
      label: "Подписки",
      value: pluralizeFriends(friends.length),
      sub: "Всегда что‑то находят",
    },
    {
      icon: TrendingUp,
      label: "За месяц",
      value: "12 480 списков",
      sub: "По всему сообществу",
    },
    {
      icon: Flame,
      label: "Горячая категория",
      value: "Кухня",
      sub: "+24% за неделю",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card p-4"
          >
            <div className="flex items-center gap-2 text-ink-500">
              <Icon className="h-3.5 w-3.5" />
              <span className="text-[11px] uppercase tracking-[0.14em]">
                {c.label}
              </span>
            </div>
            <p className="mt-3 font-display text-xl font-medium text-ink-950">
              {c.value}
            </p>
            <p className="mt-0.5 text-xs text-ink-400">{c.sub}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

function FriendActivity() {
  const events = friends
    .flatMap((f) =>
      f.wishlist.slice(0, 2).map((pid, i) => {
        const p = products.find((x) => x.id === pid)!;
        const t = new Date(f.lastActive);
        t.setHours(t.getHours() - i * 3);
        return { friend: f, product: p, when: t.toISOString() };
      })
    )
    .filter((e) => e.product)
    .sort((a, b) => +new Date(b.when) - +new Date(a.when))
    .slice(0, 6);

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-ink-200/70 px-5 py-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-ink-400">
            Активность друзей
          </p>
          <p className="mt-1 font-display text-lg font-medium text-ink-950">
            Свежие сохранения
          </p>
        </div>
        <Link
          href="/app/friends"
          className="text-xs font-medium text-ink-500 hover:text-ink-900"
        >
          Все друзья
        </Link>
      </div>
      <ul className="divide-y divide-ink-200/70">
        {events.map((e, i) => (
          <motion.li
            key={`${e.friend.id}-${e.product.id}-${i}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-3 px-5 py-3"
          >
            <Avatar src={e.friend.avatar} name={e.friend.name} size={36} ring={e.friend.color} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-ink-700">
                <Link
                  href={`/app/friends/${e.friend.id}`}
                  className="font-medium text-ink-950 hover:underline"
                >
                  {e.friend.name.split(" ")[0]}
                </Link>{" "}
                сохранил(а){" "}
                <Link
                  href={`/app/product/${e.product.id}`}
                  className="font-medium text-ink-950 hover:underline"
                >
                  {e.product.title}
                </Link>
              </p>
              <p className="mt-0.5 text-xs text-ink-400">
                {e.product.brand} · {formatPrice(e.product.price)} · {timeAgo(e.when)}
              </p>
            </div>
            <Link
              href={`/app/product/${e.product.id}`}
              className="relative hidden h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-ink-100 sm:block"
              style={{ backgroundColor: e.product.color }}
            >
              <Image
                src={e.product.image}
                alt=""
                fill
                sizes="48px"
                className="object-cover"
              />
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function TrendingStrip() {
  const items = [
    "p_airpods_pro_2",
    "p_stanley_quencher",
    "p_letique_lip",
    "p_lego_orchid",
    "p_nb_574",
    "p_onyx_palma",
    "p_demix_leggings",
    "p_fujifilm_xt30",
  ]
    .map((id) => products.find((p) => p.id === id)!)
    .filter(Boolean)
    .slice(0, 8);

  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-ink-400">
            В тренде у ваших друзей
          </p>
          <h2 className="mt-1 font-display text-2xl font-medium text-ink-950">
            Объективно хороший вкус
          </h2>
        </div>
        <Link
          href="/app/discover"
          className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-ink-950"
        >
          Все товары <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function CategoriesStrip() {
  return (
    <section>
      <div className="mb-4">
        <p className="text-[11px] uppercase tracking-[0.14em] text-ink-400">
          По категориям
        </p>
        <h2 className="mt-1 font-display text-2xl font-medium text-ink-950">
          Выберите настроение
        </h2>
      </div>
      <div className="scrollbar-thin -mx-2 flex gap-3 overflow-x-auto px-2 pb-2">
        {categories.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              href={`/app/discover?c=${c.id}`}
              className="flex min-w-[140px] flex-col gap-2 rounded-2xl border border-ink-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-card"
            >
              <span className="font-display text-2xl text-ink-500">{c.emoji}</span>
              <span className="text-sm font-medium text-ink-900">{c.label}</span>
              <span className="text-[11px] text-ink-400">
                {pluralizeItems(products.filter((p) => p.category === c.id).length)}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function AppHome() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-8 md:px-8">
      <AmbientHello />
      <StatsRow />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <TrendingStrip />
        <FriendActivity />
      </div>
      <CategoriesStrip />
    </div>
  );
}
