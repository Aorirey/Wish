"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, Loader2 } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { cn, formatPrice } from "@/lib/utils";
import type { CategoryDTO, ProductDTO } from "@/types/api";

type Filter = "all" | string;
type SortBy = "trending" | "priceAsc" | "priceDesc" | "new";

const PRICE_BUCKETS = [
  { id: "under3k", label: "До 3 000 ₽", min: 0, max: 300_000 },
  { id: "3-10k", label: "3 000 – 10 000 ₽", min: 300_000, max: 1_000_000 },
  { id: "10-30k", label: "10 000 – 30 000 ₽", min: 1_000_000, max: 3_000_000 },
  { id: "over30k", label: "От 30 000 ₽", min: 3_000_000, max: 100_000_000 },
];

export function DiscoverClient({
  categories,
  priceRange,
  initialQuery,
}: {
  categories: CategoryDTO[];
  priceRange: { min: number; max: number };
  initialQuery: { q: string; category: Filter };
}) {
  const [q, setQ] = useState(initialQuery.q);
  const [cat, setCat] = useState<Filter>(initialQuery.category);
  const [bucket, setBucket] = useState<string | "all">("all");
  const [sort, setSort] = useState<SortBy>("trending");

  const [items, setItems] = useState<ProductDTO[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const params = useMemo(() => {
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (cat !== "all") p.set("category", cat);
    if (bucket !== "all") {
      const b = PRICE_BUCKETS.find((x) => x.id === bucket);
      if (b) {
        p.set("minPrice", String(b.min));
        p.set("maxPrice", String(b.max));
      }
    }
    if (sort !== "trending") p.set("sort", sort);
    p.set("limit", "60");
    return p.toString();
  }, [q, cat, bucket, sort]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const controller = new AbortController();
    const run = async () => {
      try {
        const res = await fetch(`/api/products?${params}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        if (cancelled) return;
        setItems(data.items);
        setTotal(data.total);
      } catch (e) {
        if ((e as Error).name !== "AbortError") console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    const t = setTimeout(run, q.length > 0 ? 200 : 0);
    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(t);
    };
  }, [params, q.length]);

  const clearAll = () => {
    setQ("");
    setCat("all");
    setBucket("all");
    setSort("trending");
  };

  const activeFilterCount =
    (q ? 1 : 0) + (cat !== "all" ? 1 : 0) + (bucket !== "all" ? 1 : 0);

  return (
    <>
      <div className="sticky top-[56px] z-20 -mx-4 border-b border-ink-200/60 bg-ink-50/80 px-4 py-3 backdrop-blur md:top-[60px] md:mx-0 md:rounded-2xl md:border md:bg-white md:shadow-card">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Поиск по названию, бренду или тегу…"
              className="input flex-1"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortBy)}
              className="hidden rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-ink-400 focus:outline-none md:block"
            >
              <option value="trending">В тренде</option>
              <option value="new">Новые</option>
              <option value="priceAsc">Сначала дешевле</option>
              <option value="priceDesc">Сначала дороже</option>
            </select>
            {activeFilterCount > 0 && (
              <button onClick={clearAll} className="btn-ghost !px-3">
                <X className="h-4 w-4" /> Сбросить
              </button>
            )}
          </div>
          <div className="scrollbar-thin -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1">
            <button
              onClick={() => setCat("all")}
              className={cn(
                "chip shrink-0",
                cat === "all" && "!border-ink-900 !bg-ink-950 !text-white"
              )}
            >
              Все
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={cn(
                  "chip shrink-0",
                  cat === c.id && "!border-ink-900 !bg-ink-950 !text-white"
                )}
              >
                <span>{c.emoji}</span>
                {c.label}
                {typeof c.productCount === "number" && (
                  <span className="ml-1 text-ink-400">· {c.productCount}</span>
                )}
              </button>
            ))}
            <span className="mx-2 h-5 w-px bg-ink-200" />
            {PRICE_BUCKETS.map((b) => (
              <button
                key={b.id}
                onClick={() => setBucket(bucket === b.id ? "all" : b.id)}
                className={cn(
                  "chip shrink-0",
                  bucket === b.id && "!border-ink-900 !bg-ink-950 !text-white"
                )}
              >
                {b.label}
              </button>
            ))}
            <span className="ml-auto flex items-center gap-1 text-xs text-ink-400 md:hidden">
              <SlidersHorizontal className="h-3 w-3" />
              {total} найдено
            </span>
          </div>
        </div>
      </div>

      {loading && items.length === 0 ? (
        <div className="flex items-center justify-center py-24 text-ink-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="ml-2 text-sm">Загружаем каталог…</span>
        </div>
      ) : total === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card flex flex-col items-center gap-3 p-12 text-center"
        >
          <p className="font-display text-xl text-ink-950">Ничего не нашлось.</p>
          <p className="max-w-md text-sm text-ink-500">
            Попробуйте другой запрос или ослабьте фильтры по категории и цене.
          </p>
          <button onClick={clearAll} className="btn-outline mt-2">
            Сбросить фильтры
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}

      <p className="text-center text-xs text-ink-400">
        Показано {items.length} из {total}. Цены приблизительно соответствуют российской рознице (
        {formatPrice(priceRange.min)} – {formatPrice(priceRange.max)}).
      </p>
    </>
  );
}
