import { useState } from "react";
import { DEFAULT_PALETTE, palettes } from "./palette";

const KEY = "aws-architect-palette";

export function getStoredPalette(): string {
  try {
    const v = localStorage.getItem(KEY);
    if (v && palettes[v]) return v;
  } catch {
    /* ignorar */
  }
  return DEFAULT_PALETTE;
}

export function applyPalette(id: string) {
  const scale = (palettes[id] ?? palettes[DEFAULT_PALETTE]).scale;
  for (const [shade, hex] of Object.entries(scale)) {
    document.documentElement.style.setProperty(
      `--chakra-colors-brand-${shade}`,
      hex,
    );
  }
}

export function usePalette() {
  const [id, setIdState] = useState(getStoredPalette);
  const setId = (next: string) => {
    applyPalette(next);
    setIdState(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignorar */
    }
  };
  return { id, setId };
}
