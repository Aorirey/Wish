"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Heart, Sparkles, Users, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/app", label: "Главная", icon: Sparkles, exact: true },
  { href: "/app/wishlist", label: "Список", icon: Heart },
  { href: "/app/discover", label: "Каталог", icon: Compass },
  { href: "/app/friends", label: "Друзья", icon: Users },
  { href: "/app/profile", label: "Вы", icon: UserCircle },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-200/70 bg-white/90 backdrop-blur md:hidden">
      <ul className="mx-auto grid max-w-screen-sm grid-cols-5">
        {items.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-2 py-3 text-[11px] transition",
                  active ? "text-ink-950" : "text-ink-400 hover:text-ink-700"
                )}
              >
                <Icon className={cn("h-5 w-5", active && "fill-accent-500/10")} />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
