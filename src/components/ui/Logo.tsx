"use client";

import { cn } from "@/lib/utils";

export function Logo({
  className,
  showWord = true,
}: {
  className?: string;
  showWord?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl bg-ink-950 text-white">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 21s-7.5-4.5-9.5-10A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5C19.5 16.5 12 21 12 21Z" />
        </svg>
        <span
          className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent-500"
          aria-hidden="true"
        />
      </span>
      {showWord && (
        <span className="font-display text-[22px] font-medium tracking-tight text-ink-950">
          Wishly
        </span>
      )}
    </span>
  );
}
