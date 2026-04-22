import Link from "next/link";
import { getPriceRange, listCategories } from "@/server/services/products.service";
import { DiscoverClient } from "@/components/discover/DiscoverClient";

export const dynamic = "force-dynamic";

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: { q?: string; c?: string };
}) {
  const [categories, priceRange] = await Promise.all([
    listCategories(),
    getPriceRange(),
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-8">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
            Каталог
          </p>
          <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink-950 sm:text-5xl">
            Настоящие товары из российских магазинов.
          </h1>
        </div>
        <Link
          href="/app"
          className="hidden text-sm font-medium text-ink-500 hover:text-ink-900 md:block"
        >
          На главную
        </Link>
      </header>

      <DiscoverClient
        categories={categories}
        priceRange={priceRange}
        initialQuery={{
          q: searchParams.q ?? "",
          category: searchParams.c ?? "all",
        }}
      />
    </div>
  );
}
