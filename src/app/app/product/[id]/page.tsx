import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Store, Tag, Truck } from "lucide-react";
import {
  getProduct,
  getRelatedProducts,
  getSavedByUsers,
} from "@/server/services/products.service";
import { formatPrice } from "@/lib/utils";
import { HeartButton } from "@/components/product/HeartButton";
import { ProductCard } from "@/components/product/ProductCard";
import { Avatar } from "@/components/ui/Avatar";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  const [related, savedBy] = await Promise.all([
    getRelatedProducts(product.id, 4),
    getSavedByUsers(product.id),
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 md:px-8">
      <Link
        href="/app/discover"
        className="inline-flex items-center gap-1 text-sm text-ink-500 dark:text-ink-400 transition hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" /> Назад
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div
          className="relative aspect-square overflow-hidden rounded-3xl"
          style={{ backgroundColor: product.color ?? "#eee" }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
          <div className="absolute right-4 top-4">
            <HeartButton
              productId={product.id}
              productTitle={product.title}
              size="lg"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink-400 dark:text-ink-500">
            {product.brand}
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium leading-tight tracking-tight text-ink-950 dark:text-white sm:text-4xl">
            {product.title}
          </h1>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl font-semibold text-ink-950 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-ink-400 dark:text-ink-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="chip !border-accent-200 !bg-accent-50 !text-accent-600">
                  −{Math.round(100 * (1 - product.price / product.originalPrice))}%
                </span>
              </>
            )}
          </div>

          <p className="mt-6 text-pretty leading-relaxed text-ink-600 dark:text-ink-400">
            {product.description}
          </p>

          {product.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span key={t} className="chip">
                  <Tag className="h-3 w-3" /> {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <HeartButton
              productId={product.id}
              productTitle={product.title}
              size="md"
            />
            <a
              href={product.storeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary"
            >
              <Store className="h-4 w-4" /> Купить в {product.store.name}{" "}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 border-t border-ink-200/70 dark:border-ink-700/60 pt-6 text-sm">
            <div className="flex items-start gap-3">
              <Truck className="mt-0.5 h-4 w-4 text-ink-400 dark:text-ink-500" />
              <div>
                <p className="font-medium text-ink-900 dark:text-ink-100">
                  Доставка из {product.store.name}
                </p>
                <p className="text-xs text-ink-500 dark:text-ink-400">
                  Цены и наличие обновляются регулярно.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Store className="mt-0.5 h-4 w-4 text-ink-400 dark:text-ink-500" />
              <div>
                <p className="font-medium text-ink-900 dark:text-ink-100">{product.brand}</p>
                <p className="text-xs text-ink-500 dark:text-ink-400">
                  Открывается в новой вкладке. Wishly ничего не зарабатывает на переходе.
                </p>
              </div>
            </div>
          </div>

          {savedBy.length > 0 && (
            <div className="mt-8 rounded-2xl border border-ink-200/70 dark:border-ink-700/60 bg-white p-5">
              <p className="text-[11px] uppercase tracking-[0.14em] text-ink-400 dark:text-ink-500">
                Тоже сохранили
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {savedBy.map((u) => (
                    <Avatar
                      key={u.id}
                      src={u.avatar ?? undefined}
                      name={u.name}
                      size={32}
                      ring="#fff"
                    />
                  ))}
                </div>
                <p className="text-sm text-ink-600 dark:text-ink-400">
                  {savedBy
                    .slice(0, 2)
                    .map((u) => u.name.split(" ")[0])
                    .join(", ")}
                  {savedBy.length > 2 && ` и ещё ${savedBy.length - 2}`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="mb-5 font-display text-2xl font-medium text-ink-950 dark:text-white">
            Вам может понравиться
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
