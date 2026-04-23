"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Cake, Check, Loader2 } from "lucide-react";
import { AvatarUploader } from "@/components/ui/AvatarUploader";
import { toast } from "@/components/ui/Toaster";
import type { UserDTO } from "@/types/api";

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

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function NewFriendForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [bio, setBio] = useState("");
  const [color, setColor] = useState("#c2d6ff");
  const [birthday, setBirthday] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const disabled = name.trim().length === 0 || saving;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    setSaving(true);
    try {
      const res = await fetch("/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          handle: handle.trim() || undefined,
          bio: bio.trim() || undefined,
          color,
          avatar,
          birthday: birthday || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      const friend = data as UserDTO;
      toast({ title: "Друг добавлен", description: friend.name, tone: "success" });
      router.push(`/app/friends/${friend.id}`);
      router.refresh();
    } catch (e) {
      toast({
        title: "Не получилось создать",
        description: (e as Error).message,
      });
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="card divide-y divide-ink-200/70 dark:divide-ink-700/60 overflow-hidden"
    >
      <div className="flex items-center gap-5 p-6">
        <AvatarUploader
          src={avatar}
          name={name || "Друг"}
          size={96}
          onChange={(url) => setAvatar(url)}
          onClear={() => setAvatar(null)}
        />
        <div className="min-w-0 flex-1 text-sm text-ink-500 dark:text-ink-400">
          <p>
            Нажмите на круг, чтобы загрузить фото. Мы принимаем JPG, PNG, WEBP и
            GIF до 3 МБ.
          </p>
          <p className="mt-1">
            Если фото пока нет — оставьте как есть, отобразятся инициалы.
          </p>
        </div>
      </div>

      <div className="grid gap-5 p-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="text-[11px] uppercase tracking-[0.14em] text-ink-400 dark:text-ink-500">
            Имя <span className="text-accent-600">*</span>
          </label>
          <input
            required
            autoFocus
            className="input mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Например, Мама"
            maxLength={60}
          />
        </div>
        <div>
          <label className="text-[11px] uppercase tracking-[0.14em] text-ink-400 dark:text-ink-500">
            Ник (опционально)
          </label>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ink-500">
              @
            </span>
            <input
              className="input pl-8"
              value={handle}
              onChange={(e) =>
                setHandle(
                  e.target.value.replace(/[^a-z0-9_]/gi, "").toLowerCase()
                )
              }
              placeholder="mama"
            />
          </div>
          <p className="mt-1 text-[11px] text-ink-400 dark:text-ink-500">
            Если оставить пустым — сгенерируем из имени.
          </p>
        </div>
        <div>
          <label className="text-[11px] uppercase tracking-[0.14em] text-ink-400 dark:text-ink-500">
            Дата рождения
          </label>
          <div className="relative mt-2">
            <Cake className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400 dark:text-ink-500" />
            <input
              type="date"
              className="input pl-9"
              value={birthday}
              max={today()}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="text-[11px] uppercase tracking-[0.14em] text-ink-400 dark:text-ink-500">
            Пара слов о человеке
          </label>
          <textarea
            className="input mt-2 resize-none"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Архитектор, обожает виниловые пластинки, терпеть не может красные розы."
            maxLength={240}
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-[11px] uppercase tracking-[0.14em] text-ink-400 dark:text-ink-500">
            Акцентный цвет карточки
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {PALETTE.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setColor(c)}
                className="relative h-9 w-9 rounded-full border border-ink-200 dark:border-ink-700"
                style={{ backgroundColor: c }}
                aria-label={`Выбрать цвет ${c}`}
              >
                {color === c && (
                  <span className="absolute inset-0 flex items-center justify-center text-white">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 bg-ink-50/70 px-6 py-4 dark:bg-ink-950/60">
        <p className="text-xs text-ink-400 dark:text-ink-500">
          После создания вы сможете добавлять подарки в их вишлист.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => history.back()}
            className="btn-ghost"
            disabled={saving}
          >
            Отмена
          </button>
          <button type="submit" className="btn-primary" disabled={disabled}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Создаём…
              </>
            ) : (
              "Добавить друга"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
