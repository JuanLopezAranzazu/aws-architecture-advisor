export type Scale = Record<
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950",
  string
>;

export const palettes: Record<string, { label: string; scale: Scale }> = {
  orange: {
    label: "Naranja",
    scale: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12",
      950: "#431407",
    },
  },
  blue: {
    label: "Azul",
    scale: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      950: "#172554",
    },
  },
  emerald: {
    label: "Esmeralda",
    scale: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b",
      950: "#022c22",
    },
  },
  violet: {
    label: "Violeta",
    scale: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
      950: "#2e1065",
    },
  },
  rose: {
    label: "Rosa",
    scale: {
      50: "#fff1f2",
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
      800: "#9f1239",
      900: "#881337",
      950: "#4c0519",
    },
  },
};

export const DEFAULT_PALETTE = "orange";

export const surface = {
  light: {
    canvas: "#fafafa",
    panel: "#ffffff",
    subtle: "#f4f4f5",
    text: "#18181b",
    muted: "#52525b",
    border: "#e4e4e7",
  },
  dark: {
    canvas: "#09090b",
    panel: "#18181b",
    subtle: "#27272a",
    text: "#fafafa",
    muted: "#a1a1aa",
    border: "#3f3f46",
  },
};

export const fonts = {
  heading: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
  body: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
};
