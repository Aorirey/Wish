"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Logo } from "@/components/ui/Logo";
import { useProfile } from "@/store/wishlist";
import { me } from "@/data/friends";

export function TopBar() {
  const name = useProfile((s) => s.name);
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-ink-200/70 bg-ink-50/80 px-4 py-3 backdrop-blur md:px-6">
      <Link href="/" className="md:hidden">
        <Logo showWord={false} />
      </Link>
      <form
        className="relative flex-1"
        onSubmit={(e) => {
          e.preventDefault();
          const q = new FormData(e.currentTarget).get("q");
          if (typeof q === "string" && q.length > 0) {
            window.location.href = `/app/discover?q=${encodeURIComponent(q)}`;
          }
        }}
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          name="q"
          type="search"
          placeholder="Поиск товаров, брендов, друзей…"
          className="w-full rounded-full border border-ink-200 bg-white/90 py-2 pl-9 pr-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-ink-400 focus:outline-none focus:ring-2 focus:ring-ink-900/5"
        />
      </form>
      <button
        type="button"
        className="hidden h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 transition hover:border-ink-300 hover:text-ink-900 md:inline-flex"
        aria-label="Уведомления"
      >
        <Bell className="h-4 w-4" />
      </button>
      <Link href="/app/profile" className="hidden md:inline-flex" aria-label={name}>
        <Avatar src={me.avatar} name={name} size={36} />
      </Link>
    </header>
  );
}
