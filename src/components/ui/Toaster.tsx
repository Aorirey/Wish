"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";

type Toast = { id: number; title: string; description?: string; tone?: "default" | "success" };

let externalPush: (t: Omit<Toast, "id">) => void = () => {};
export function toast(t: Omit<Toast, "id">) {
  externalPush(t);
}

export function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    externalPush = (t) => {
      const id = Date.now() + Math.random();
      setItems((prev) => [...prev, { id, ...t }]);
      setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }, 2800);
    };
    return () => {
      externalPush = () => {};
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[80] flex flex-col items-center gap-2 px-4 sm:bottom-6">
      <AnimatePresence initial={false}>
        {items.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="pointer-events-auto flex max-w-sm items-start gap-3 rounded-2xl border border-ink-200 bg-white px-4 py-3 shadow-card dark:border-ink-700 dark:bg-ink-900"
          >
            <div
              className={
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full " +
                (t.tone === "success"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                  : "bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-300")
              }
            >
              {t.tone === "success" ? (
                <Check className="h-3 w-3" strokeWidth={3} />
              ) : (
                <span className="block h-1.5 w-1.5 rounded-full bg-current" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink-900 dark:text-ink-100">
                {t.title}
              </p>
              {t.description && (
                <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">
                  {t.description}
                </p>
              )}
            </div>
            <button
              aria-label="Закрыть"
              onClick={() =>
                setItems((prev) => prev.filter((i) => i.id !== t.id))
              }
              className="rounded-full p-1 text-ink-400 dark:text-ink-500 hover:bg-ink-100 dark:bg-ink-800 hover:text-ink-700 dark:hover:bg-ink-800 dark:hover:text-ink-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
