"use client";

import { motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type Theme } from "@/store/theme";
import { cn } from "@/lib/utils";

const ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export function ThemeToggle({
  variant = "compact",
  className,
}: {
  variant?: "compact" | "segmented";
  className?: string;
}) {
  const theme = useTheme((s) => s.theme);
  const resolved = useTheme((s) => s.resolved);
  const hydrated = useTheme((s) => s.hydrated);
  const setTheme = useTheme((s) => s.setTheme);

  if (variant === "compact") {
    // Одна кнопка — переключает light/dark. Долгое нажатие можно добавить позже.
    const next: Theme = resolved === "dark" ? "light" : "dark";
    const Icon = resolved === "dark" ? Sun : Moon;
    const label =
      resolved === "dark" ? "Светлая тема" : "Тёмная тема";
    return (
      <button
        type="button"
        suppressHydrationWarning
        aria-label={label}
        onClick={() => setTheme(next)}
        className={cn(
          "relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 transition hover:border-ink-300 hover:text-ink-900 dark:text-ink-100",
          "dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-ink-500 dark:hover:text-white",
          className
        )}
      >
        <motion.span
          key={resolved + String(hydrated)}
          initial={{ rotate: -40, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 24 }}
          className="inline-flex"
        >
          <Icon className="h-4 w-4" />
        </motion.span>
      </button>
    );
  }

  const options: { value: Theme; Icon: typeof Sun; label: string }[] = [
    { value: "light", Icon: ICONS.light, label: "Светлая" },
    { value: "system", Icon: ICONS.system, label: "Системная" },
    { value: "dark", Icon: ICONS.dark, label: "Тёмная" },
  ];

  return (
    <div
      suppressHydrationWarning
      className={cn(
        "relative inline-flex items-center gap-1 rounded-full border border-ink-200 bg-white p-1 text-sm dark:border-ink-700 dark:bg-ink-900",
        className
      )}
      role="radiogroup"
      aria-label="Тема оформления"
    >
      {options.map((opt) => {
        const active = theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(opt.value)}
            className={cn(
              "relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition",
              active
                ? "text-white dark:text-ink-950"
                : "text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white"
            )}
          >
            {active && (
              <motion.span
                layoutId="theme-toggle-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-full bg-ink-950 dark:bg-white"
              />
            )}
            <opt.Icon className="relative h-3.5 w-3.5" />
            <span className="relative hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
