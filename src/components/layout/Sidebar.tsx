"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Compass,
  Heart,
  Users,
  UserCircle,
  Sparkles,
  Gift,
  UserPlus,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn, pluralizeItems } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import type { FriendSummaryDTO } from "@/types/api";

type NavItem = {
  href: string;
  label: string;
  icon: typeof Sparkles;
  isActive: (pathname: string) => boolean;
};

const primaryNav: NavItem[] = [
  {
    href: "/app",
    label: "Главная",
    icon: Sparkles,
    isActive: (p) => p === "/app",
  },
  {
    href: "/app/wishlist",
    label: "Мой вишлист",
    icon: Heart,
    isActive: (p) => p.startsWith("/app/wishlist"),
  },
  {
    href: "/app/discover",
    label: "Каталог",
    icon: Compass,
    isActive: (p) => p.startsWith("/app/discover"),
  },
  {
    href: "/app/friends",
    label: "Друзья",
    icon: Users,
    isActive: (p) => p.startsWith("/app/friends") && p !== "/app/friends/new",
  },
  {
    href: "/app/friends/new",
    label: "Добавить друга",
    icon: UserPlus,
    isActive: (p) => p === "/app/friends/new",
  },
  {
    href: "/app/profile",
    label: "Профиль",
    icon: UserCircle,
    isActive: (p) => p.startsWith("/app/profile"),
  },
];

export function Sidebar({ friends }: { friends: FriendSummaryDTO[] }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[280px] shrink-0 flex-col border-r border-ink-200/70 dark:border-ink-700/60 bg-white/80 px-4 py-6 backdrop-blur md:flex lg:w-[300px] dark:bg-ink-950/70">
      <div className="px-2">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <nav className="mt-8 flex flex-col gap-1 px-1">
        {primaryNav.map((item) => {
          const active = item.isActive(pathname);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "text-ink-950 dark:text-white"
                  : "text-ink-500 hover:bg-ink-100 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-ink-100"
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-ink-100 dark:bg-ink-800"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon className="relative h-4 w-4" />
              <span className="relative">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 px-1">
        <div className="flex items-center justify-between px-2">
          <p className="text-[11px] uppercase tracking-[0.14em] text-ink-400 dark:text-ink-500">
            Ваши друзья
          </p>
          <Link
            href="/app/friends"
            className="text-[11px] font-medium text-ink-500 dark:text-ink-400 hover:text-ink-900"
          >
            Все
          </Link>
        </div>
        {friends.length === 0 ? (
          <Link
            href="/app/friends/new"
            className="mt-3 flex items-center gap-2 rounded-xl border border-dashed border-ink-200 px-3 py-3 text-xs text-ink-500 transition hover:border-ink-300 hover:text-ink-900 dark:text-ink-100 dark:border-ink-700 dark:hover:border-ink-500 dark:hover:text-white"
          >
            <UserPlus className="h-3.5 w-3.5" />
            Добавить первого друга
          </Link>
        ) : (
          <div className="mt-3 flex flex-col gap-1">
            {friends.map((f) => {
              const active = pathname === `/app/friends/${f.id}`;
              return (
                <Link
                  key={f.id}
                  href={`/app/friends/${f.id}`}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-2 py-2 transition",
                    active
                      ? "bg-ink-100 dark:bg-ink-800"
                      : "hover:bg-ink-100/70 dark:hover:bg-ink-900"
                  )}
                >
                  <Avatar
                    src={f.avatar ?? undefined}
                    name={f.name}
                    size={30}
                    ring={f.color}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink-900 dark:text-ink-100">
                      {f.name.split(" ")[0]}
                    </p>
                    <p className="truncate text-[11px] text-ink-400 dark:text-ink-500">
                      {pluralizeItems(f.wishCount)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-auto px-1 pt-6">
        <div className="relative overflow-hidden rounded-2xl border border-ink-200/70 dark:border-ink-700/60 bg-gradient-to-br from-ink-900 to-ink-700 p-4 text-white">
          <div className="noise opacity-40" />
          <Gift className="h-5 w-5 text-accent-300" />
          <p className="mt-3 font-display text-[17px] leading-snug">
            Скоро день рождения?
          </p>
          <p className="mt-1 text-xs text-ink-200/90">
            Превратите свой вишлист в аккуратную ссылку, которой не стыдно поделиться с друзьями.
          </p>
          <Link
            href="/app/profile"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink-950 dark:text-white transition hover:bg-accent-500 hover:text-white"
          >
            Настроить
          </Link>
        </div>
      </div>
    </aside>
  );
}
