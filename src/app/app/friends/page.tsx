import Link from "next/link";
import Image from "next/image";
import { Users } from "lucide-react";
import { listFriends } from "@/server/services/users.service";
import { Avatar } from "@/components/ui/Avatar";
import { pluralizeItems, timeAgo } from "@/lib/utils";
import { FriendSearchPanel } from "@/components/friends/FriendSearchPanel";

export const dynamic = "force-dynamic";

export default async function FriendsPage() {
  const friends = await listFriends();

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink-400 dark:text-ink-500">
            Ваши люди
          </p>
          <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink-950 dark:text-white sm:text-5xl">
            Друзья, тихо мечтающие.
          </h1>
          <p className="mt-2 max-w-xl text-ink-500 dark:text-ink-400">
            Заведите карточку близкого человека, добавьте дату рождения и его
            вишлисты. Wishly напомнит перед праздником и подскажет, что подарить.
          </p>
        </div>
        <FriendSearchPanel />
      </header>

      {friends.length === 0 ? (
        <section className="card flex flex-col items-center gap-5 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-50 dark:bg-ink-950 text-ink-600 dark:text-ink-400">
            <Users className="h-7 w-7" />
          </div>
          <div className="max-w-md space-y-2">
            <h2 className="font-display text-2xl font-medium text-ink-950 dark:text-white">
              Пока никого здесь нет
            </h2>
            <p className="text-sm text-ink-500 dark:text-ink-400">
              Пригласите мужа, сестру или лучшего друга — получится маленькая
              личная записная книжка подарков. Никаких ненужных аккаунтов.
            </p>
          </div>
          <FriendSearchPanel initiallyOpen />
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {friends.map((f) => (
            <Link
              key={f.id}
              href={`/app/friends/${f.id}`}
              className="group relative block overflow-hidden rounded-3xl border border-ink-200/70 dark:border-ink-700/60 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-20px_rgba(16,24,40,.18)]"
            >
              <div
                className="relative flex h-36 items-end overflow-hidden p-5"
                style={{
                  background: `linear-gradient(140deg, ${f.color} 0%, #ffffff 120%)`,
                }}
              >
                <div className="noise opacity-40" />
                <div className="relative flex items-center gap-3">
                  <Avatar
                    src={f.avatar ?? undefined}
                    name={f.name}
                    size={56}
                    ring="#fff"
                  />
                  <div>
                    <p className="font-display text-xl font-medium text-ink-950 dark:text-white">
                      {f.name}
                    </p>
                    <p className="text-sm text-ink-700/90">@{f.handle}</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="line-clamp-3 min-h-[3em] text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                  {f.bio || "Без описания."}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {f.previewImages.slice(0, 3).map((src, i) => (
                      <div
                        key={i}
                        className="relative h-12 w-12 overflow-hidden rounded-lg bg-ink-100 dark:bg-ink-800"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <span className="ml-2 text-xs text-ink-500 dark:text-ink-400">
                      {pluralizeItems(f.wishCount)} · {timeAgo(f.lastActive)}
                    </span>
                  </div>
                  <span className="rounded-full border border-ink-200 dark:border-ink-700 px-3 py-1 text-xs font-medium text-ink-700 dark:text-ink-300 transition group-hover:border-ink-900 group-hover:bg-ink-950 group-hover:text-white">
                    Открыть список
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
