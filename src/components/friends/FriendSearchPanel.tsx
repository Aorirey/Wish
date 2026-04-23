"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search, UserPlus } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { toast } from "@/components/ui/Toaster";
import type { FriendSearchResultDTO } from "@/types/api";

export function FriendSearchPanel({ initiallyOpen = false }: { initiallyOpen?: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(initiallyOpen);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<FriendSearchResultDTO[]>([]);
  const [followingHandle, setFollowingHandle] = useState<string | null>(null);

  const normalized = useMemo(
    () => query.trim().toLowerCase().replace(/^@+/, "").replace(/[^a-z0-9_]/g, ""),
    [query]
  );

  const doSearch = async () => {
    if (normalized.length < 2) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/friends?q=${encodeURIComponent(normalized)}`);
      const data = (await res.json()) as { items?: FriendSearchResultDTO[] };
      if (!res.ok) throw new Error("Не удалось выполнить поиск.");
      setItems(data.items ?? []);
    } catch (e) {
      toast({ title: "Ошибка поиска", description: (e as Error).message });
    } finally {
      setLoading(false);
    }
  };

  const follow = async (handle: string) => {
    setFollowingHandle(handle);
    try {
      const res = await fetch("/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle }),
      });
      const data = (await res.json()) as { error?: string; name?: string };
      if (!res.ok) throw new Error(data.error ?? "Не удалось подписаться.");
      toast({
        title: "Готово",
        description: `Вы подписались на @${handle}`,
        tone: "success",
      });
      router.refresh();
      void doSearch();
    } catch (e) {
      toast({ title: "Не получилось", description: (e as Error).message });
    } finally {
      setFollowingHandle(null);
    }
  };

  return (
    <div className="w-full space-y-3">
      <button
        type="button"
        className="btn-primary"
        onClick={() => {
          setOpen((v) => !v);
          if (!open) setTimeout(() => document.getElementById("friend-search-input")?.focus(), 0);
        }}
      >
        <UserPlus className="h-4 w-4" /> Добавить друга
      </button>

      {open && (
        <div className="card p-4">
          <label
            htmlFor="friend-search-input"
            className="text-[11px] uppercase tracking-[0.14em] text-ink-400 dark:text-ink-500"
          >
            Поиск по username
          </label>
          <div className="mt-2 flex gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                id="friend-search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") void doSearch();
                }}
                className="input pl-9"
                placeholder="@username"
              />
            </div>
            <button
              type="button"
              onClick={() => void doSearch()}
              className="btn-outline"
              disabled={loading || normalized.length < 2}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Найти"}
            </button>
          </div>
          <p className="mt-1 text-[11px] text-ink-400 dark:text-ink-500">
            Введите минимум 2 символа username (без @ или с @).
          </p>

          {items.length > 0 && (
            <div className="mt-4 space-y-2">
              {items.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center justify-between rounded-xl border border-ink-200/70 dark:border-ink-700/60 px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <Avatar src={u.avatar ?? undefined} name={u.name} size={34} ring={u.color} />
                    <div>
                      <p className="text-sm font-medium text-ink-900 dark:text-ink-100">{u.name}</p>
                      <p className="text-xs text-ink-500 dark:text-ink-400">@{u.handle}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-outline"
                    disabled={u.isFollowing || followingHandle === u.handle}
                    onClick={() => void follow(u.handle)}
                  >
                    {u.isFollowing
                      ? "Подписка активна"
                      : followingHandle === u.handle
                      ? "Добавляем..."
                      : "Подписаться"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {!loading && normalized.length >= 2 && items.length === 0 && (
            <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">
              По запросу ничего не найдено.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
