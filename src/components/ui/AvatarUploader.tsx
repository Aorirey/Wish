"use client";

import { useRef, useState } from "react";
import { Camera, Loader2, X } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { toast } from "@/components/ui/Toaster";
import { cn } from "@/lib/utils";

const MAX_BYTES = 2 * 1024 * 1024; // 2 МБ — аватарки храним в БД в виде data URL

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  });
}

// Уменьшает картинку до квадрата `size`×`size` и возвращает webp data URL.
async function compressToDataUrl(file: File, size = 320): Promise<string> {
  const raw = await fileToDataUrl(file);
  const img = new Image();
  img.decoding = "async";
  img.src = raw;
  await new Promise<void>((ok, err) => {
    img.onload = () => ok();
    img.onerror = () => err(new Error("image load failed"));
  });
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return raw;
  const min = Math.min(img.width, img.height);
  const sx = (img.width - min) / 2;
  const sy = (img.height - min) / 2;
  ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);
  // webp лёгкий и всеми браузерами поддерживается
  return canvas.toDataURL("image/webp", 0.85);
}

export function AvatarUploader({
  src,
  name,
  size = 96,
  onChange,
  onClear,
  className,
}: {
  src: string | null;
  name: string;
  size?: number;
  onChange: (dataUrl: string) => void | Promise<void>;
  onClear?: () => void | Promise<void>;
  className?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (!file) return;
    if (!/^image\//.test(file.type)) {
      toast({ title: "Нужно изображение" });
      return;
    }
    if (file.size > MAX_BYTES) {
      toast({
        title: "Файл больше 2 МБ",
        description: "Попробуйте меньшее фото.",
      });
      return;
    }
    setUploading(true);
    try {
      // Сжимаем в квадрат 320×320 webp — получается 20-40 КБ, безопасно для БД.
      const dataUrl = await compressToDataUrl(file, 320);
      await onChange(dataUrl);
    } catch (e) {
      toast({
        title: "Не получилось загрузить",
        description: (e as Error).message,
      });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className={cn("relative inline-flex", className)}>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="group relative overflow-hidden rounded-full"
        style={{ width: size, height: size }}
        aria-label="Загрузить фото"
      >
        <Avatar src={src} name={name} size={size} />
        <span
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-ink-950/60 text-white opacity-0 transition",
            "group-hover:opacity-100 group-focus-visible:opacity-100",
            uploading && "opacity-100"
          )}
        >
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Camera className="h-5 w-5" />
          )}
        </span>
      </button>
      {src && onClear && !uploading && (
        <button
          type="button"
          onClick={() => onClear()}
          className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-ink-200 dark:border-ink-700 bg-white text-ink-600 dark:text-ink-400 shadow-card transition hover:border-accent-300 hover:bg-accent-50 hover:text-accent-700 dark:bg-ink-900 dark:hover:bg-accent-500/20"
          aria-label="Удалить фото"
        >
          <X className="h-3 w-3" />
        </button>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />
    </div>
  );
}
