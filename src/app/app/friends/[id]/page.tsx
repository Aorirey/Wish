"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Gift, Share2 } from "lucide-react";
import { friends } from "@/data/friends";
import { products } from "@/data/products";
import { Avatar } from "@/components/ui/Avatar";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPrice, timeAgo } from "@/lib/utils";
import { toast } from "@/components/ui/Toaster";

export default function FriendPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const friend = friends.find((f) => f.id === id);
  const [reserved, setReserved] = useState<Record<string, boolean>>({});

  if (!friend) notFound();

  const items = useMemo(
    () =>
      friend!.wishlist
        .map((pid) => products.find((p) => p.id === pid)!)
        .filter(Boolean),
    [friend]
  );

  const total = items.reduce((s, p) => s + p.price, 0);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 md:px-8">
      <Link
        href="/app/friends"
        className="inline-flex items-center gap-1 text-sm text-ink-500 transition hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" /> All friends
      </Link>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-ink-200/70 bg-white p-8 shadow-card"
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-40"
          style={{
            background: `linear-gradient(180deg, ${friend!.color} 0%, transparent 100%)`,
            opacity: 0.7,
          }}
        />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar src={friend!.avatar} name={friend!.name} size={80} ring="#fff" />
            <div>
              <h1 className="font-display text-4xl font-medium tracking-tight text-ink-950 sm:text-5xl">
                {friend!.name}
              </h1>
              <p className="mt-1 text-sm text-ink-500">
                @{friend!.handle} · active {timeAgo(friend!.lastActive)}
              </p>
              <p className="mt-3 max-w-md text-ink-600">{friend!.bio}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                toast({
                  title: "Reminder set",
                  description: `We'll ping you before ${friend!.name.split(" ")[0]}'s birthday.`,
                  tone: "success",
                })
              }
              className="btn-outline"
            >
              <Gift className="h-4 w-4" /> Remind me
            </button>
            <button
              onClick={() =>
                toast({ title: "Invitation sent", description: `${friend!.name} got a nudge.` })
              }
              className="btn-primary"
            >
              <Share2 className="h-4 w-4" /> Nudge
            </button>
          </div>
        </div>
        <div className="relative mt-8 grid grid-cols-3 gap-4 border-t border-ink-200/70 pt-6 text-sm">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-400">
              Items
            </p>
            <p className="mt-1 font-display text-2xl font-medium text-ink-950">
              {items.length}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-400">
              List value
            </p>
            <p className="mt-1 font-display text-2xl font-medium text-ink-950">
              {formatPrice(total)}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-400">
              Reserved by you
            </p>
            <p className="mt-1 font-display text-2xl font-medium text-ink-950">
              {Object.values(reserved).filter(Boolean).length}
            </p>
          </div>
        </div>
      </motion.section>

      <section>
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-display text-2xl font-medium text-ink-950">
            {friend!.name.split(" ")[0]}'s wishlist
          </h2>
          <p className="text-xs text-ink-400">
            Claim an item so no one doubles up.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p, i) => {
            const isReserved = !!reserved[p.id];
            return (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                showHeart={false}
                actionSlot={
                  <button
                    onClick={() => {
                      setReserved((r) => ({ ...r, [p.id]: !r[p.id] }));
                      toast({
                        title: isReserved ? "Unreserved" : "Reserved — nicely done",
                        description: p.title,
                        tone: isReserved ? "default" : "success",
                      });
                    }}
                    className={
                      "w-full rounded-full border px-3 py-2 text-xs font-medium transition " +
                      (isReserved
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-ink-200 bg-white text-ink-700 hover:border-ink-900 hover:bg-ink-950 hover:text-white")
                    }
                  >
                    {isReserved ? "Reserved by you" : "Reserve this gift"}
                  </button>
                }
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
