"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { products, categories, type Category } from "@/data/products";
import { cn, formatPrice } from "@/lib/utils";

const priceBuckets = [
  { id: "under3k", label: "До 3 000 ₽", test: (c: number) => c < 3000 },
  { id: "3-10k", label: "3 000 – 10 000 ₽", test: (c: number) => c >= 3000 && c < 10000 },
  { id: "10-30k", label: "10 000 – 30 000 ₽", test: (c: number) => c >= 10000 && c < 30000 },
  { id: "over30k", label: "От 30 000 ₽", test: (c: number) => c >= 30000 },
];

type SortBy = "trending" | "priceAsc" | "priceDesc";

export default function DiscoverPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
          <div className="h-8 w-48 animate-pulse rounded bg-ink-100" />
        </div>
      }
    >
      <DiscoverPage />
    </Suspense>
  );
}

function DiscoverPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialQ = sp.get("q") ?? "";
  const initialC = (sp.get("c") as Category) ?? "all";
  const [q, setQ] = useState(initialQ);
  const [cat, setCat] = useState<Category | "all">(initialC);
  const [bucket, setBucket] = useState<string | "all">("all");
  const [sort, setSort] = useState<SortBy>("trending");

  const filtered = useMemo(() => {
    const base = products.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (bucket !== "all") {
        const b = priceBuckets.find((b) => b.id === bucket);
        if (b && !b.test(p.price)) return false;
      }
      if (q.trim().length > 0) {
        const needle = q.toLowerCase();
        return (
          p.title.toLowerCase().includes(needle) ||
          p.brand.toLowerCase().includes(needle) ||
          p.store.toLowerCase().includes(needle) ||
          (p.tags ?? []).some((t) => t.toLowerCase().includes(needle))
        );
      }
      return true;
    });
    if (sort === "priceAsc") return [...base].sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") return [...base].sort((a, b) => b.price - a.price);
    return base;
  }, [q, cat, bucket, sort]);

  const clearAll = () => {
    setQ("");
    setCat("all");
    setBucket("all");
    setSort("trending");
    router.replace(pathname);
  };

  const activeFilterCount =
    (q ? 1 : 0) + (cat !== "all" ? 1 : 0) + (bucket !== "all" ? 1 : 0);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-8">
      <header>
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
          Каталог
        </p>
        <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink-950 sm:text-5xl">
          {filtered.length} вещей, которые стоит захотеть.
        </h1>
      </header>

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
              </button>
            ))}
            <span className="mx-2 h-5 w-px bg-ink-200" />
            {priceBuckets.map((b) => (
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
              {filtered.length} найдено
            </span>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
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
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}

      <p className="text-center text-xs text-ink-400">
        Показано {filtered.length} из {products.length}. Цены приблизительно соответствуют российской рознице ({formatPrice(Math.min(...products.map((p) => p.price)))}
        {" – "}
        {formatPrice(Math.max(...products.map((p) => p.price)))}).
      </p>
    </div>
  );
}
