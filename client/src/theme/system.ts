import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { DEFAULT_PALETTE, fonts, palettes, surface } from "./palette";

const tokenScale = Object.fromEntries(
  Object.entries(palettes[DEFAULT_PALETTE].scale).map(([k, v]) => [
    k,
    { value: v },
  ]),
);
const pair = (light: string, dark: string) => ({
  value: { _light: light, _dark: dark },
});

const config = defineConfig({
  theme: {
    tokens: {
      colors: { brand: tokenScale },
      fonts: { heading: { value: fonts.heading }, body: { value: fonts.body } },
    },
    semanticTokens: {
      colors: {
        brand: {
          contrast: pair("#ffffff", "#ffffff"),
          fg: pair("{colors.brand.700}", "{colors.brand.300}"),
          subtle: pair("{colors.brand.100}", "{colors.brand.900}"),
          muted: pair("{colors.brand.200}", "{colors.brand.800}"),
          emphasized: pair("{colors.brand.300}", "{colors.brand.700}"),
          solid: pair("{colors.brand.600}", "{colors.brand.600}"),
          focusRing: pair("{colors.brand.500}", "{colors.brand.500}"),
          border: pair("{colors.brand.500}", "{colors.brand.400}"),
        },
        bg: {
          DEFAULT: pair(surface.light.canvas, surface.dark.canvas),
          panel: pair(surface.light.panel, surface.dark.panel),
          subtle: pair(surface.light.subtle, surface.dark.subtle),
        },
        fg: {
          DEFAULT: pair(surface.light.text, surface.dark.text),
          muted: pair(surface.light.muted, surface.dark.muted),
        },
        border: { DEFAULT: pair(surface.light.border, surface.dark.border) },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
