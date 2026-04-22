import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, Heart, Sparkles, TrendingUp } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Avatar } from "@/components/ui/Avatar";
import { formatPrice, pluralizeFriends, pluralizeItems, timeAgo } from "@/lib/utils";
import {
  getHotCategory,
  getMe,
  getMonthlyStats,
  getRecentActivity,
  listFriends,
} from "@/server/services/users.service";
import {
  listCategories,
  listProducts,
} from "@/server/services/products.service";
import { getMyWishlist } from "@/server/services/wishlist.service";
import { AmbientHello } from "@/components/home/AmbientHello";
import { prisma } from "@/server/db";

export const dynamic = "force-dynamic";

export default async function AppHome() {
  const [me, wishlist, friends, activity, monthly, hot, categories, trending, totalProducts] =
    await Promise.all([
      getMe(),
      getMyWishlist(),
      listFriends(),
      getRecentActivity(6),
      getMonthlyStats(),
      getHotCategory(),
      listCategories(),
      listProducts({ limit: 8 }),
      prisma.product.count(),
    ]);

  const statsCards = [
    {
      icon: Heart,
      label: "Ваш вишлист",
      value: pluralizeItems(wishlist.length),
      sub: "Аккуратно подобран",
    },
    {
      icon: Sparkles,
      label: "Друзей",
      value: pluralizeFriends(friends.length),
      sub:
        friends.length === 0
          ? "Добавьте первого"
          : "Всегда что-то находят",
    },
    {
      icon: TrendingUp,
      label: "За месяц",
      value: `${monthly.addsLast30.toLocaleString("ru-RU")} сохранений`,
      sub: `В каталоге ${totalProducts} товаров`,
    },
    {
      icon: Flame,
      label: "Горячая категория",
      value: hot?.label ?? "Техника",
      sub: hot?.delta ?? "+24% за неделю",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-8 md:px-8">
      <AmbientHello fallbackName={me.name} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {statsCards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="card p-4">
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
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
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
            {trending.items.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>

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
          {activity.length === 0 && (
            <div className="p-6 text-center text-sm text-ink-500">
              <p className="mb-3">
                Пока некого читать. Добавьте кого-то из близких — и здесь будет
                лента их сохранений.
              </p>
              <Link
                href="/app/friends/new"
                className="inline-flex items-center gap-1 text-sm font-medium text-ink-900 hover:underline"
              >
                Добавить друга →
              </Link>
            </div>
          )}
          <ul className="divide-y divide-ink-200/70">
            {activity.map((e) => (
              <li key={e.id} className="flex items-center gap-3 px-5 py-3">
                <Avatar
                  src={e.user.avatar ?? undefined}
                  name={e.user.name}
                  size={36}
                  ring={e.user.color}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-ink-700">
                    <Link
                      href={`/app/friends/${e.user.id}`}
                      className="font-medium text-ink-950 hover:underline"
                    >
                      {e.user.name.split(" ")[0]}
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
                  style={{ backgroundColor: e.product.color ?? "#eaeaea" }}
                >
                  <Image
                    src={e.product.image}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

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
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/app/discover?c=${c.id}`}
              className="flex min-w-[140px] flex-col gap-2 rounded-2xl border border-ink-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-card"
            >
              <span className="font-display text-2xl text-ink-500">{c.emoji}</span>
              <span className="text-sm font-medium text-ink-900">{c.label}</span>
              <span className="text-[11px] text-ink-400">
                {pluralizeItems(c.productCount ?? 0)}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
