"use client";

import { useEffect } from "react";
import { useTheme } from "@/store/theme";

export function ThemeHydrator() {
  const hydrate = useTheme((s) => s.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  return null;
}
