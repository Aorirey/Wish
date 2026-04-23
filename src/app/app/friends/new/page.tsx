import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FriendSearchPanel } from "@/components/friends/FriendSearchPanel";

export default function NewFriendPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-10 md:px-8">
      <Link
        href="/app/friends"
        className="inline-flex items-center gap-1 text-sm text-ink-500 dark:text-ink-400 transition hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" /> Все друзья
      </Link>

      <header>
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink-400 dark:text-ink-500">
          Добавить друга
        </p>
        <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink-950 dark:text-white sm:text-5xl">
          Найдите по username.
        </h1>
        <p className="mt-3 max-w-lg text-ink-500 dark:text-ink-400">
          Друг сам настраивает свой профиль и username. Вам нужно только ввести
          его `@username` и подписаться.
        </p>
      </header>

      <FriendSearchPanel initiallyOpen />
    </div>
  );
}
