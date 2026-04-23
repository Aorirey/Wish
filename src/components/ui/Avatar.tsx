"use client";

import { cn, initials } from "@/lib/utils";
import Image from "next/image";

// data: URL — Next/Image не умеет, рендерим обычным <img>.
function isDataUrl(s: string) {
  return s.startsWith("data:");
}

export function Avatar({
  src,
  name,
  size = 40,
  ring,
  className,
}: {
  src?: string | null;
  name: string;
  size?: number;
  ring?: string;
  className?: string;
}) {
  const hasSrc = typeof src === "string" && src.length > 0;
  // Цвет пустого состояния — стабильно считаем из имени.
  const hue =
    name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360;

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium",
        className
      )}
      style={{
        width: size,
        height: size,
        background: hasSrc
          ? undefined
          : `linear-gradient(135deg, hsl(${hue} 70% 88%) 0%, hsl(${
              (hue + 30) % 360
            } 60% 78%) 100%)`,
        color: hasSrc ? undefined : `hsl(${hue} 40% 24%)`,
        fontSize: size * 0.38,
        boxShadow: ring
          ? `0 0 0 2px ${ring}, 0 0 0 4px rgba(255,255,255,.9)`
          : undefined,
      }}
    >
      {hasSrc ? (
        isDataUrl(src as string) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src as string}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={src as string}
            alt={name}
            width={size * 2}
            height={size * 2}
            className="h-full w-full object-cover"
          />
        )
      ) : (
        <span className="select-none tracking-tight">
          {initials(name) || "?"}
        </span>
      )}
    </div>
  );
}
