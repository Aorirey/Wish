"use client";

import { useProfile } from "@/store/wishlist";

export function AmbientHello({ fallbackName }: { fallbackName: string }) {
  const stored = useProfile((s) => s.name);
  const hydrated = useProfile((s) => s.hydrated);
  const name = hydrated ? stored : fallbackName;
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
        Посмотрите, что сохраняют ваши друзья, и несколько вещей, которые стоит
        рассмотреть.
      </p>
    </div>
  );
}
