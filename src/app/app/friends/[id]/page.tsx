import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Cake, Gift } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { formatPrice, timeAgo } from "@/lib/utils";
import { getFriend } from "@/server/services/users.service";
import { getMyReservationsFor } from "@/server/services/wishlist.service";
import { FriendActions } from "@/components/friends/FriendActions";
import { WishItemList } from "@/components/friends/WishItemList";

export const dynamic = "force-dynamic";

function daysUntilBirthday(iso: string | null): number | null {
  if (!iso) return null;
  const b = new Date(iso);
  if (Number.isNaN(b.getTime())) return null;
  const now = new Date();
  const next = new Date(now.getFullYear(), b.getMonth(), b.getDate());
  if (next < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
    next.setFullYear(next.getFullYear() + 1);
  }
  const diff = next.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatBirthday(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(d);
}

export default async function FriendPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getFriend(params.id);
  if (!data) notFound();

  const { user, wishItems } = data;
  const total = wishItems.reduce((s, w) => s + w.product.price, 0);
  const reserved = await getMyReservationsFor(user.id);

  const birthday = formatBirthday(user.birthday);
  const days = daysUntilBirthday(user.birthday);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 md:px-8">
      <Link
        href="/app/friends"
        className="inline-flex items-center gap-1 text-sm text-ink-500 dark:text-ink-400 transition hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" /> Все друзья
      </Link>

      <section className="relative overflow-hidden rounded-3xl border border-ink-200/70 dark:border-ink-700/60 bg-white p-8 shadow-card">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-40"
          style={{
            background: `linear-gradient(180deg, ${user.color} 0%, transparent 100%)`,
            opacity: 0.7,
          }}
        />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              src={user.avatar ?? undefined}
              name={user.name}
              size={80}
              ring="#fff"
            />
            <div>
              <h1 className="font-display text-4xl font-medium tracking-tight text-ink-950 dark:text-white sm:text-5xl">
                {user.name}
              </h1>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
                @{user.handle} · добавлен{" "}
                {timeAgo(user.lastActive)}
              </p>
              {user.bio && (
                <p className="mt-3 max-w-md text-ink-600 dark:text-ink-400">{user.bio}</p>
              )}
              {birthday && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-ink-200 dark:border-ink-700 bg-white/80 px-3 py-1 text-xs text-ink-700 dark:text-ink-300">
                  <Cake className="h-3.5 w-3.5 text-accent-600" />
                  <span>{birthday}</span>
                  {typeof days === "number" && days >= 0 && (
                    <span className="text-ink-400 dark:text-ink-500">
                      ·{" "}
                      {days === 0
                        ? "сегодня!"
                        : days === 1
                        ? "завтра"
                        : `через ${days} ${
                            days % 10 === 1 && days % 100 !== 11
                              ? "день"
                              : days % 10 >= 2 &&
                                days % 10 <= 4 &&
                                (days % 100 < 12 || days % 100 > 14)
                              ? "дня"
                              : "дней"
                          }`}
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
          <FriendActions friendId={user.id} friendName={user.name} />
        </div>
        <div className="relative mt-8 grid grid-cols-3 gap-4 border-t border-ink-200/70 dark:border-ink-700/60 pt-6 text-sm">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-400 dark:text-ink-500">
              Товаров
            </p>
            <p className="mt-1 font-display text-2xl font-medium text-ink-950 dark:text-white">
              {wishItems.length}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-400 dark:text-ink-500">
              Сумма списка
            </p>
            <p className="mt-1 font-display text-2xl font-medium text-ink-950 dark:text-white">
              {formatPrice(total)}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-400 dark:text-ink-500">
              Вы забронировали
            </p>
            <p className="mt-1 font-display text-2xl font-medium text-ink-950 dark:text-white">
              {Object.values(reserved).filter(Boolean).length}
            </p>
          </div>
        </div>
      </section>

      {wishItems.length === 0 ? (
        <section className="card flex flex-col items-center gap-4 p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
            <Gift className="h-6 w-6" />
          </div>
          <h2 className="font-display text-2xl font-medium text-ink-950 dark:text-white">
            Список пока пуст
          </h2>
          <p className="max-w-md text-sm text-ink-500 dark:text-ink-400">
            {user.name.split(" ")[0]} ещё ничего не добавил(а). Можно отправить
            пинг-напоминание или заглянуть позже.
          </p>
        </section>
      ) : (
        <WishItemList
          friendId={user.id}
          friendName={user.name}
          wishItems={wishItems}
          initialReserved={reserved}
        />
      )}
    </div>
  );
}
