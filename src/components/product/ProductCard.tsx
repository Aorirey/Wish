"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/data/products";
import { cn, formatPrice } from "@/lib/utils";
import { HeartButton } from "./HeartButton";

export function ProductCard({
  product,
  index = 0,
  priority = false,
  showHeart = true,
  actionSlot,
}: {
  product: Product;
  index?: number;
  priority?: boolean;
  showHeart?: boolean;
  actionSlot?: React.ReactNode;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-20px_rgba(16,24,40,.18)]"
    >
      <Link
        href={`/app/product/${product.id}`}
        className="relative block aspect-[4/5] overflow-hidden bg-ink-100"
        style={{ backgroundColor: product.color ?? "#eaeaea" }}
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          priority={priority}
          className="object-cover transition duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="chip bg-white/85">
            <span className="h-1.5 w-1.5 rounded-full bg-ink-950" /> {product.store}
          </span>
          {product.originalPrice && (
            <span className="chip bg-accent-500/95 !text-white">
              −{Math.round(100 * (1 - product.price / product.originalPrice))}%
            </span>
          )}
        </div>
        {showHeart && (
          <div className="absolute bottom-3 right-3">
            <HeartButton productId={product.id} productTitle={product.title} size="md" />
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="min-w-0">
          <p className="truncate text-[11px] uppercase tracking-[0.14em] text-ink-400">
            {product.brand}
          </p>
          <h3 className="mt-1 line-clamp-2 text-[15px] font-medium leading-snug text-ink-900">
            {product.title}
          </h3>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-semibold text-ink-950">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-ink-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <a
            href={product.storeUrl}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border border-ink-200 px-2.5 py-1 text-xs font-medium text-ink-700 transition hover:border-ink-900 hover:bg-ink-950 hover:text-white"
            )}
          >
            Купить <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {actionSlot}
      </div>
    </motion.article>
  );
}
