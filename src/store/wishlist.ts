"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishItem = {
  productId: string;
  addedAt: string; // ISO
  note?: string;
  priority: "low" | "medium" | "high";
};

type WishlistState = {
  items: WishItem[];
  hydrated: boolean;
  add: (productId: string, opts?: Partial<Omit<WishItem, "productId">>) => void;
  remove: (productId: string) => void;
  toggle: (productId: string) => void;
  setPriority: (productId: string, p: WishItem["priority"]) => void;
  setNote: (productId: string, note: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
  markHydrated: () => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      add: (productId, opts) => {
        if (get().items.some((i) => i.productId === productId)) return;
        set((s) => ({
          items: [
            {
              productId,
              addedAt: new Date().toISOString(),
              priority: opts?.priority ?? "medium",
              note: opts?.note,
            },
            ...s.items,
          ],
        }));
      },
      remove: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      toggle: (productId) => {
        const exists = get().items.some((i) => i.productId === productId);
        if (exists) get().remove(productId);
        else get().add(productId);
      },
      setPriority: (productId, priority) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.productId === productId ? { ...i, priority } : i
          ),
        })),
      setNote: (productId, note) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.productId === productId ? { ...i, note } : i
          ),
        })),
      has: (productId) => get().items.some((i) => i.productId === productId),
      clear: () => set({ items: [] }),
      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "wishly:wishlist",
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    }
  )
);

type ProfileState = {
  name: string;
  handle: string;
  bio: string;
  color: string;
  setProfile: (p: Partial<Omit<ProfileState, "setProfile">>) => void;
};

export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      name: "You",
      handle: "you",
      bio: "Collecting small, quiet upgrades.",
      color: "#ff5d83",
      setProfile: (p) => set((s) => ({ ...s, ...p })),
    }),
    { name: "wishly:profile" }
  )
);
