import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NewFriendForm } from "@/components/friends/NewFriendForm";

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
          Новый друг
        </p>
        <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink-950 dark:text-white sm:text-5xl">
          Заведите карточку.
        </h1>
        <p className="mt-3 max-w-lg text-ink-500 dark:text-ink-400">
          Минимум — имя. Добавьте дату рождения и фото — Wishly будет напоминать
          и помогать. Всё остаётся у вас на устройстве.
        </p>
      </header>

      <NewFriendForm />
    </div>
  );
}
