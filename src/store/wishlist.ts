"use client";

import { create } from "zustand";
import type { Priority, WishItemDTO } from "@/types/api";

type State = {
  ids: Set<string>;
  items: WishItemDTO[];
  hydrated: boolean;
  pending: Set<string>;
  hydrate: (items: WishItemDTO[]) => void;
  has: (productId: string) => boolean;
  add: (productId: string, productTitle?: string) => Promise<void>;
  remove: (productId: string) => Promise<void>;
  toggle: (productId: string, productTitle?: string) => Promise<void>;
  setPriority: (productId: string, priority: Priority) => Promise<void>;
  clear: () => Promise<void>;
};

async function jsonFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export const useWishlist = create<State>((set, get) => ({
  ids: new Set<string>(),
  items: [],
  hydrated: false,
  pending: new Set<string>(),

  hydrate: (items) =>
    set({
      items,
      ids: new Set(items.map((i) => i.product.id)),
      hydrated: true,
    }),

  has: (productId) => get().ids.has(productId),

  add: async (productId) => {
    const state = get();
    if (state.ids.has(productId) || state.pending.has(productId)) return;

    const nextIds = new Set(state.ids);
    nextIds.add(productId);
    const nextPending = new Set(state.pending);
    nextPending.add(productId);
    set({ ids: nextIds, pending: nextPending });

    try {
      const item = await jsonFetch<WishItemDTO>("/api/me/wishlist", {
        method: "POST",
        body: JSON.stringify({ productId }),
      });
      const s = get();
      const nextItems = [item, ...s.items.filter((i) => i.product.id !== productId)];
      const nextP = new Set(s.pending);
      nextP.delete(productId);
      set({ items: nextItems, pending: nextP });
    } catch (e) {
      const s = get();
      const rollbackIds = new Set(s.ids);
      rollbackIds.delete(productId);
      const nextP = new Set(s.pending);
      nextP.delete(productId);
      set({ ids: rollbackIds, pending: nextP });
      throw e;
    }
  },

  remove: async (productId) => {
    const state = get();
    if (!state.ids.has(productId) || state.pending.has(productId)) return;

    const prevItems = state.items;
    const nextIds = new Set(state.ids);
    nextIds.delete(productId);
    const nextPending = new Set(state.pending);
    nextPending.add(productId);
    set({
      ids: nextIds,
      pending: nextPending,
      items: state.items.filter((i) => i.product.id !== productId),
    });

    try {
      await fetch(`/api/me/wishlist?productId=${encodeURIComponent(productId)}`, {
        method: "DELETE",
      });
      const s = get();
      const nextP = new Set(s.pending);
      nextP.delete(productId);
      set({ pending: nextP });
    } catch (e) {
      const s = get();
      const rollbackIds = new Set(s.ids);
      rollbackIds.add(productId);
      const nextP = new Set(s.pending);
      nextP.delete(productId);
      set({ ids: rollbackIds, items: prevItems, pending: nextP });
      throw e;
    }
  },

  toggle: async (productId, productTitle) => {
    if (get().has(productId)) {
      await get().remove(productId);
    } else {
      await get().add(productId, productTitle);
    }
  },

  setPriority: async (productId, priority) => {
    const state = get();
    const prev = state.items.find((i) => i.product.id === productId);
    if (!prev) return;

    set({
      items: state.items.map((i) =>
        i.product.id === productId ? { ...i, priority } : i
      ),
    });

    try {
      await jsonFetch<WishItemDTO>("/api/me/wishlist", {
        method: "PATCH",
        body: JSON.stringify({ productId, priority }),
      });
    } catch (e) {
      const s = get();
      set({
        items: s.items.map((i) =>
          i.product.id === productId ? { ...i, priority: prev.priority } : i
        ),
      });
      throw e;
    }
  },

  clear: async () => {
    set({ items: [], ids: new Set() });
    try {
      await fetch(`/api/me/wishlist?all=true`, { method: "DELETE" });
    } catch {
      // no‑op, повторим при следующей загрузке
    }
  },
}));

type ProfileState = {
  id: string | null;
  name: string;
  handle: string;
  bio: string;
  color: string;
  avatar: string | null;
  birthday: string | null; // ISO
  hydrated: boolean;
  hydrate: (p: {
    id: string;
    name: string;
    handle: string;
    bio: string;
    color: string;
    avatar: string | null;
    birthday: string | null;
  }) => void;
  setProfile: (
    patch: Partial<
      Pick<ProfileState, "name" | "handle" | "bio" | "color" | "avatar" | "birthday">
    >
  ) => Promise<void>;
};

export const useProfile = create<ProfileState>((set, get) => ({
  id: null,
  name: "Вы",
  handle: "you",
  bio: "",
  color: "#ff5d83",
  avatar: null,
  birthday: null,
  hydrated: false,

  hydrate: (p) => set({ ...p, hydrated: true }),

  setProfile: async (patch) => {
    const prev = { ...get() };
    set({ ...get(), ...patch });
    try {
      await jsonFetch("/api/me", {
        method: "PATCH",
        body: JSON.stringify(patch),
      });
    } catch (e) {
      set(prev);
      throw e;
    }
  },
}));
