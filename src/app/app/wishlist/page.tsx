"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Heart,
  Link2,
  Share2,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useWishlist } from "@/store/wishlist";
import { products } from "@/data/products";
import { formatPrice, pluralizeItems, timeAgo } from "@/lib/utils";
import { toast } from "@/components/ui/Toaster";

type Filter = "all" | "high" | "medium" | "low";

function Empty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card flex flex-col items-center gap-4 p-12 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
        <Heart className="h-6 w-6" />
      </div>
      <h2 className="font-display text-2xl font-medium text-ink-950">
        Ваш список пока пуст
      </h2>
      <p className="max-w-md text-sm text-ink-500">
        Нажмите на сердечко рядом с тем, что радует глаз. Начните с того, что купили бы себе в хороший день.
      </p>
      <Link href="/app/discover" className="btn-primary">
        Посмотреть идеи <ArrowUpRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}

export default function MyWishlistPage() {
  const items = useWishlist((s) => s.items);
  const hydrated = useWishlist((s) => s.hydrated);
  const remove = useWishlist((s) => s.remove);
  const setPriority = useWishlist((s) => s.setPriority);
  const [filter, setFilter] = useState<Filter>("all");
  const [copied, setCopied] = useState(false);

  const rows = useMemo(() => {
    return items
      .map((i) => ({ ...i, product: products.find((p) => p.id === i.productId)! }))
      .filter((i) => i.product)
      .filter((i) => (filter === "all" ? true : i.priority === filter));
  }, [items, filter]);

  const total = useMemo(
    () => rows.reduce((sum, r) => sum + r.product.price, 0),
    [rows]
  );

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-5xl space-y-4 px-4 py-10 md:px-8">
        <div className="h-8 w-40 animate-pulse rounded bg-ink-100" />
        <div className="h-24 animate-pulse rounded-2xl bg-ink-100" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-ink-100" />
          ))}
        </div>
      </div>
    );
  }

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: `Все · ${items.length}` },
    {
      id: "high",
      label: `Мечтаю · ${items.filter((i) => i.priority === "high").length}`,
    },
    {
      id: "medium",
      label: `Скоро · ${items.filter((i) => i.priority === "medium").length}`,
    },
    {
      id: "low",
      label: `Может быть · ${items.filter((i) => i.priority === "low").length}`,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 md:px-8">
      <header className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
            Ваш список
          </p>
          <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink-950 sm:text-5xl">
            Тихо собираете желания.
          </h1>
          <p className="mt-2 text-ink-500">
            {pluralizeItems(items.length)} · на сумму {formatPrice(total)}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const url = typeof window !== "undefined" ? window.location.origin + "/app/wishlist" : "";
              if (typeof navigator !== "undefined" && navigator.clipboard) {
                navigator.clipboard.writeText(url);
              }
              setCopied(true);
              setTimeout(() => setCopied(false), 1600);
              toast({ title: "Ссылка скопирована", description: url, tone: "success" });
            }}
            className="btn-outline"
          >
            {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
            {copied ? "Скопировано" : "Копировать ссылку"}
          </button>
          <button
            onClick={() => toast({ title: "Меню шаринга открыто", description: "Теперь список можно отправить кому угодно." })}
            className="btn-primary"
          >
            <Share2 className="h-4 w-4" /> Поделиться
          </button>
        </div>
      </header>

      {items.length === 0 && <Empty />}

      {items.length > 0 && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={
                  "chip transition " +
                  (filter === f.id
                    ? "!border-ink-900 !bg-ink-950 !text-white"
                    : "")
                }
              >
                {f.label}
              </button>
            ))}
          </div>

          <AnimatePresence initial={false}>
            <motion.ul layout className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {rows.map((row) => (
                <motion.li
                  layout
                  key={row.productId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  className="card flex gap-4 overflow-hidden p-3"
                >
                  <Link
                    href={`/app/product/${row.product.id}`}
                    className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-ink-100"
                    style={{ backgroundColor: row.product.color }}
                  >
                    <Image
                      src={row.product.image}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="min-w-0">
                      <p className="truncate text-[11px] uppercase tracking-[0.14em] text-ink-400">
                        {row.product.brand} · {row.product.store}
                      </p>
                      <Link
                        href={`/app/product/${row.product.id}`}
                        className="mt-1 line-clamp-2 text-sm font-medium text-ink-900 hover:underline"
                      >
                        {row.product.title}
                      </Link>
                      <p className="mt-1 text-[11px] text-ink-400">
                        Добавлено {timeAgo(row.addedAt)}
                      </p>
                    </div>
                    <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                      <div className="flex items-center gap-1">
                        {(["low", "medium", "high"] as const).map((p) => {
                          const active = row.priority === p;
                          return (
                            <button
                              key={p}
                              onClick={() => setPriority(row.productId, p)}
                              className={
                                "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] transition " +
                                (active
                                  ? "border-ink-900 bg-ink-950 text-white"
                                  : "border-ink-200 text-ink-500 hover:border-ink-300 hover:text-ink-900")
                              }
                            >
                              {p === "high" && <Sparkles className="h-3 w-3" />}
                              {p === "high" ? "Мечтаю" : p === "medium" ? "Скоро" : "Может быть"}
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-base font-semibold text-ink-950">
                          {formatPrice(row.product.price)}
                        </span>
                        <button
                          onClick={() => {
                            remove(row.productId);
                            toast({ title: "Удалено из списка", description: row.product.title });
                          }}
                          aria-label="Удалить"
                          className="rounded-full p-1.5 text-ink-400 hover:bg-accent-50 hover:text-accent-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
