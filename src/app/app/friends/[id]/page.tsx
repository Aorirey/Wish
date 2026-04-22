import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { formatPrice, timeAgo } from "@/lib/utils";
import { getFriend } from "@/server/services/users.service";
import { getMyReservationsFor } from "@/server/services/wishlist.service";
import { FriendActions } from "@/components/friends/FriendActions";
import { WishItemList } from "@/components/friends/WishItemList";

export const dynamic = "force-dynamic";

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

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 md:px-8">
      <Link
        href="/app/friends"
        className="inline-flex items-center gap-1 text-sm text-ink-500 transition hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" /> Все друзья
      </Link>

      <section className="relative overflow-hidden rounded-3xl border border-ink-200/70 bg-white p-8 shadow-card">
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
              <h1 className="font-display text-4xl font-medium tracking-tight text-ink-950 sm:text-5xl">
                {user.name}
              </h1>
              <p className="mt-1 text-sm text-ink-500">
                @{user.handle} · был(а) онлайн {timeAgo(user.lastActive)}
              </p>
              <p className="mt-3 max-w-md text-ink-600">{user.bio}</p>
            </div>
          </div>
          <FriendActions friendName={user.name} />
        </div>
        <div className="relative mt-8 grid grid-cols-3 gap-4 border-t border-ink-200/70 pt-6 text-sm">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-400">
              Товаров
            </p>
            <p className="mt-1 font-display text-2xl font-medium text-ink-950">
              {wishItems.length}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-400">
              Сумма списка
            </p>
            <p className="mt-1 font-display text-2xl font-medium text-ink-950">
              {formatPrice(total)}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-400">
              Вы забронировали
            </p>
            <p className="mt-1 font-display text-2xl font-medium text-ink-950">
              {Object.values(reserved).filter(Boolean).length}
            </p>
          </div>
        </div>
      </section>

      <WishItemList
        friendId={user.id}
        friendName={user.name}
        wishItems={wishItems}
        initialReserved={reserved}
      />
    </div>
  );
}
