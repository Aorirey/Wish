"use client";

import { cn, initials } from "@/lib/utils";
import Image from "next/image";

export function Avatar({
  src,
  name,
  size = 40,
  ring,
  className,
}: {
  src?: string;
  name: string;
  size?: number;
  ring?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink-200 text-ink-700",
        className
      )}
      style={{
        width: size,
        height: size,
        boxShadow: ring ? `0 0 0 2px ${ring}, 0 0 0 4px rgba(255,255,255,.9)` : undefined,
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          width={size * 2}
          height={size * 2}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-xs font-semibold">{initials(name)}</span>
      )}
    </div>
  );
}
