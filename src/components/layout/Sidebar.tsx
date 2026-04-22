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
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { friends } from "@/data/friends";
import { Avatar } from "@/components/ui/Avatar";
import { pluralizeItems } from "@/lib/utils";

const primaryNav = [
  { href: "/app", label: "Главная", icon: Sparkles, exact: true },
  { href: "/app/wishlist", label: "Мой вишлист", icon: Heart },
  { href: "/app/discover", label: "Каталог", icon: Compass },
  { href: "/app/friends", label: "Друзья", icon: Users },
  { href: "/app/profile", label: "Профиль", icon: UserCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[280px] shrink-0 flex-col border-r border-ink-200/70 bg-white/80 px-4 py-6 backdrop-blur md:flex lg:w-[300px]">
      <div className="px-2">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <nav className="mt-8 flex flex-col gap-1 px-1">
        {primaryNav.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active ? "text-ink-950" : "text-ink-500 hover:bg-ink-100 hover:text-ink-900"
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-ink-100"
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
          <p className="text-[11px] uppercase tracking-[0.14em] text-ink-400">
            Вы подписаны
          </p>
          <Link
            href="/app/friends"
            className="text-[11px] font-medium text-ink-500 hover:text-ink-900"
          >
            Все
          </Link>
        </div>
        <div className="mt-3 flex flex-col gap-1">
          {friends.slice(0, 5).map((f) => {
            const active = pathname === `/app/friends/${f.id}`;
            return (
              <Link
                key={f.id}
                href={`/app/friends/${f.id}`}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-2 py-2 transition",
                  active ? "bg-ink-100" : "hover:bg-ink-100/70"
                )}
              >
                <Avatar src={f.avatar} name={f.name} size={30} ring={f.color} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink-900">
                    {f.name.split(" ")[0]}
                  </p>
                  <p className="truncate text-[11px] text-ink-400">
                    {pluralizeItems(f.wishlist.length)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-auto px-1 pt-6">
        <div className="relative overflow-hidden rounded-2xl border border-ink-200/70 bg-gradient-to-br from-ink-900 to-ink-700 p-4 text-white">
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
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink-950 transition hover:bg-accent-500 hover:text-white"
          >
            Настроить
          </Link>
        </div>
      </div>
    </aside>
  );
}
