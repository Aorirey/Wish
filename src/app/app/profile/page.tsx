"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Trash2 } from "lucide-react";
import { useProfile, useWishlist } from "@/store/wishlist";
import { Avatar } from "@/components/ui/Avatar";
import { toast } from "@/components/ui/Toaster";
import { formatPrice, pluralizeItems } from "@/lib/utils";

const PALETTE = [
  "#ff5d83",
  "#f6bfcf",
  "#c2d6ff",
  "#b6dac3",
  "#ffd0a8",
  "#d4b0ff",
  "#ffe3a8",
  "#0b0b0b",
];

const MY_AVATAR = "https://i.pravatar.cc/160?img=68";

export default function ProfilePage() {
  const profile = useProfile();
  const wishlist = useWishlist((s) => s.items);
  const clear = useWishlist((s) => s.clear);

  const [draftName, setDraftName] = useState(profile.name);
  const [draftHandle, setDraftHandle] = useState(profile.handle);
  const [draftBio, setDraftBio] = useState(profile.bio);
  const [draftColor, setDraftColor] = useState(profile.color);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile.hydrated) {
      setDraftName(profile.name);
      setDraftHandle(profile.handle);
      setDraftBio(profile.bio);
      setDraftColor(profile.color);
    }
  }, [profile.hydrated, profile.name, profile.handle, profile.bio, profile.color]);

  const totalValue = wishlist.reduce((s, i) => s + i.product.price, 0);

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 md:px-8">
      <header>
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
          Ваш профиль
        </p>
        <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink-950 sm:text-5xl">
          Сделайте его своим.
        </h1>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-card"
      >
        <div
          aria-hidden
          className="h-32 w-full"
          style={{
            background: `linear-gradient(140deg, ${draftColor} 0%, #ffffff 120%)`,
          }}
        />
        <div className="flex flex-col gap-6 px-6 pb-6 md:flex-row md:items-end md:gap-8">
          <div className="-mt-12 flex items-center gap-4">
            <div className="rounded-full border-4 border-white shadow-card">
              <Avatar src={MY_AVATAR} name={draftName} size={96} />
            </div>
            <div>
              <p className="font-display text-2xl font-medium text-ink-950">
                {draftName || "Вы"}
              </p>
              <p className="text-sm text-ink-500">@{draftHandle || "you"}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-6 pt-0 md:grid-cols-2">
          <div>
            <label className="text-[11px] uppercase tracking-[0.14em] text-ink-400">
              Имя
            </label>
            <input
              className="input mt-2"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.14em] text-ink-400">
              Ник
            </label>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400">
                @
              </span>
              <input
                className="input pl-8"
                value={draftHandle}
                onChange={(e) =>
                  setDraftHandle(
                    e.target.value.replace(/[^a-z0-9_]/gi, "").toLowerCase()
                  )
                }
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="text-[11px] uppercase tracking-[0.14em] text-ink-400">
              О себе
            </label>
            <textarea
              rows={3}
              className="input mt-2 resize-none"
              value={draftBio}
              onChange={(e) => setDraftBio(e.target.value)}
              placeholder="Пара слов о том, что вы собираете…"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-[11px] uppercase tracking-[0.14em] text-ink-400">
              Акцентный цвет
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {PALETTE.map((c) => (
                <button
                  key={c}
                  onClick={() => setDraftColor(c)}
                  className="relative h-9 w-9 rounded-full border border-ink-200"
                  style={{ backgroundColor: c }}
                  aria-label={`Выбрать цвет ${c}`}
                >
                  {draftColor === c && (
                    <span className="absolute inset-0 flex items-center justify-center text-white">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-ink-200/70 bg-ink-50/70 px-6 py-4">
          <button
            onClick={() => {
              setDraftName(profile.name);
              setDraftHandle(profile.handle);
              setDraftBio(profile.bio);
              setDraftColor(profile.color);
            }}
            className="btn-ghost"
            disabled={saving}
          >
            Сбросить
          </button>
          <button
            onClick={async () => {
              setSaving(true);
              try {
                await profile.setProfile({
                  name: draftName,
                  handle: draftHandle,
                  bio: draftBio,
                  color: draftColor,
                });
                toast({ title: "Профиль обновлён", tone: "success" });
              } catch {
                toast({ title: "Не удалось сохранить" });
              } finally {
                setSaving(false);
              }
            }}
            className="btn-primary"
            disabled={saving}
          >
            {saving ? "Сохраняем…" : "Сохранить"}
          </button>
        </div>
      </motion.section>

      <section className="card p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-400">
              Ваши данные
            </p>
            <h2 className="mt-1 font-display text-xl font-medium text-ink-950">
              {pluralizeItems(wishlist.length)} · {formatPrice(totalValue)}
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              Хранятся в базе данных Wishly. В любой момент можно очистить.
            </p>
          </div>
          <button
            onClick={() => {
              if (confirm("Очистить весь вишлист?")) {
                clear();
                toast({ title: "Список очищен" });
              }
            }}
            className="btn-outline text-accent-600 hover:!bg-accent-50 hover:!text-accent-700"
          >
            <Trash2 className="h-4 w-4" /> Очистить список
          </button>
        </div>
        {wishlist.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {wishlist.slice(0, 10).map((i) => (
              <div
                key={i.product.id}
                className="relative h-12 w-12 overflow-hidden rounded-lg bg-ink-100"
                style={{ backgroundColor: i.product.color ?? "#eaeaea" }}
              >
                <Image
                  src={i.product.image}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
