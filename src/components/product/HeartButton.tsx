"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "@/store/wishlist";
import { toast } from "@/components/ui/Toaster";
import { cn } from "@/lib/utils";

export function HeartButton({
  productId,
  productTitle,
  size = "md",
  className,
}: {
  productId: string;
  productTitle?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const has = useWishlist((s) => s.has(productId));
  const hydrated = useWishlist((s) => s.hydrated);
  const toggle = useWishlist((s) => s.toggle);

  const dim =
    size === "sm"
      ? "h-8 w-8 [&_svg]:h-3.5 [&_svg]:w-3.5"
      : size === "lg"
      ? "h-12 w-12 [&_svg]:h-5 [&_svg]:w-5"
      : "h-10 w-10 [&_svg]:h-4 [&_svg]:w-4";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const wasOn = has;
        toggle(productId);
        toast({
          title: wasOn ? "Удалено из списка" : "Добавлено в список",
          description: productTitle,
          tone: wasOn ? "default" : "success",
        });
      }}
      className={cn(
        "group relative inline-flex items-center justify-center rounded-full border bg-white/90 text-ink-700 backdrop-blur transition",
        has
          ? "border-accent-200 bg-accent-50 text-accent-600"
          : "border-ink-200 hover:text-accent-600",
        dim,
        className
      )}
      aria-pressed={has}
      aria-label={has ? "Убрать из списка" : "Добавить в список"}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={String(has)}
          initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.6, opacity: 0, rotate: 12 }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
          className="inline-flex"
        >
          <Heart
            fill={has && hydrated ? "currentColor" : "transparent"}
            strokeWidth={2}
          />
        </motion.span>
      </AnimatePresence>
      {has && (
        <motion.span
          key="ring"
          initial={{ scale: 0.4, opacity: 0.6 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 rounded-full border border-accent-400"
        />
      )}
    </button>
  );
}
