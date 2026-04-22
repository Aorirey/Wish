"use client";

import { useEffect } from "react";
import { useProfile, useWishlist } from "@/store/wishlist";
import type { UserDTO, WishItemDTO } from "@/types/api";

export function AppBootstrap({
  me,
  wishlist,
}: {
  me: UserDTO;
  wishlist: WishItemDTO[];
}) {
  const hydrateWl = useWishlist((s) => s.hydrate);
  const hydrateP = useProfile((s) => s.hydrate);

  useEffect(() => {
    hydrateWl(wishlist);
    hydrateP({
      id: me.id,
      name: me.name,
      handle: me.handle,
      bio: me.bio,
      color: me.color,
    });
  }, [me, wishlist, hydrateWl, hydrateP]);

  return null;
}
