"use client";

import { create } from "zustand";

export type Theme = "light" | "dark" | "system";
type Resolved = "light" | "dark";

type ThemeState = {
  theme: Theme;
  resolved: Resolved;
  hydrated: boolean;
  setTheme: (t: Theme) => void;
  hydrate: () => void;
};

const STORAGE_KEY = "wishly:theme";

function systemPref(): Resolved {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function apply(resolved: Resolved) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (resolved === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  root.style.colorScheme = resolved;
}

export const useTheme = create<ThemeState>((set, get) => ({
  theme: "system",
  resolved: "light",
  hydrated: false,

  setTheme: (t) => {
    const resolved: Resolved = t === "system" ? systemPref() : t;
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, t);
      } catch {
        // ignore
      }
    }
    apply(resolved);
    set({ theme: t, resolved });
  },

  hydrate: () => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const theme: Theme =
      raw === "light" || raw === "dark" || raw === "system" ? raw : "system";
    const resolved: Resolved = theme === "system" ? systemPref() : theme;
    apply(resolved);
    set({ theme, resolved, hydrated: true });

    // Реагируем на изменение системной темы, если пользователь оставил "system".
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const { theme } = get();
      if (theme !== "system") return;
      const r: Resolved = mq.matches ? "dark" : "light";
      apply(r);
      set({ resolved: r });
    };
    mq.addEventListener("change", onChange);
  },
}));
