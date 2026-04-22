"use client";

import { useRef, useState } from "react";
import { Camera, Loader2, X } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { toast } from "@/components/ui/Toaster";
import { cn } from "@/lib/utils";

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
  onChange: (url: string) => void | Promise<void>;
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
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/uploads/avatar", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      await onChange(data.url);
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
          className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-card transition hover:border-accent-300 hover:bg-accent-50 hover:text-accent-700"
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
