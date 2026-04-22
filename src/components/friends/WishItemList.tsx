"use client";

import { useState, useTransition } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { toast } from "@/components/ui/Toaster";
import type { WishItemDTO } from "@/types/api";

export function WishItemList({
  friendId,
  friendName,
  wishItems,
  initialReserved,
}: {
  friendId: string;
  friendName: string;
  wishItems: WishItemDTO[];
  initialReserved: Record<string, boolean>;
}) {
  const [reserved, setReserved] = useState<Record<string, boolean>>(initialReserved);
  const [, startTransition] = useTransition();
  const firstName = friendName.split(" ")[0];

  const toggle = async (productId: string, productTitle: string) => {
    const wasReserved = !!reserved[productId];
    setReserved((r) => ({ ...r, [productId]: !wasReserved }));

    startTransition(async () => {
      try {
        const res = await fetch(`/api/reservations/${friendId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
        });
        if (!res.ok) throw new Error("fail");
        const data: { reserved: boolean } = await res.json();
        setReserved((r) => ({ ...r, [productId]: data.reserved }));
        toast({
          title: data.reserved ? "Забронировано — отлично" : "Бронь снята",
          description: productTitle,
          tone: data.reserved ? "success" : "default",
        });
      } catch {
        setReserved((r) => ({ ...r, [productId]: wasReserved }));
        toast({ title: "Не получилось изменить бронь" });
      }
    });
  };

  return (
    <section>
      <div className="mb-5 flex items-end justify-between">
        <h2 className="font-display text-2xl font-medium text-ink-950">
          Вишлист: {firstName}
        </h2>
        <p className="text-xs text-ink-400">
          Забронируйте подарок, чтобы никто не повторился.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {wishItems.map((w, i) => {
          const isReserved = !!reserved[w.product.id];
          return (
            <ProductCard
              key={w.product.id}
              product={w.product}
              index={i}
              showHeart={false}
              actionSlot={
                <button
                  onClick={() => toggle(w.product.id, w.product.title)}
                  className={
                    "w-full rounded-full border px-3 py-2 text-xs font-medium transition " +
                    (isReserved
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-ink-200 bg-white text-ink-700 hover:border-ink-900 hover:bg-ink-950 hover:text-white")
                  }
                >
                  {isReserved ? "Забронировано вами" : "Забронировать подарок"}
                </button>
              }
            />
          );
        })}
      </div>
    </section>
  );
}
