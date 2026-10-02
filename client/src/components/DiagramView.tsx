import { useEffect, useRef, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";
import type { Architecture } from "../types";

const safeId = (s: string) => s.replace(/[^a-zA-Z0-9_]/g, "_");
const safeText = (s: string) => s.replace(/["|<>\[\]{}()]/g, " ").trim();

export function toMermaid(a: Architecture): string {
  const nodes = a.nodes.map(
    (n) => `  ${safeId(n.id)}["${safeText(n.service)}"]`,
  );
  const edges = a.edges.map((e) => {
    const l = safeText(e.label);
    return l
      ? `  ${safeId(e.source)} -->|"${l}"| ${safeId(e.target)}`
      : `  ${safeId(e.source)} --> ${safeId(e.target)}`;
  });
  return ["flowchart LR", ...nodes, ...edges].join("\n");
}

function initMermaid(dark: boolean) {
  const css = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) =>
    css.getPropertyValue(name).trim() || fallback;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: "base",
    themeVariables: {
      darkMode: dark,
      background: "transparent",
      primaryColor: v(
        dark ? "--chakra-colors-brand-900" : "--chakra-colors-brand-100",
        "#ffedd5",
      ),
      primaryBorderColor: v("--chakra-colors-brand-500", "#f97316"),
      primaryTextColor: dark ? "#fafafa" : "#18181b",
      lineColor: dark ? "#a1a1aa" : "#52525b",
      edgeLabelBackground: dark ? "#18181b" : "#ffffff",
      fontFamily: "Inter, system-ui, sans-serif",
    },
  });
}

export default function DiagramView({
  arch,
  paletteId,
}: {
  arch: Architecture;
  paletteId: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    setError(null);
    initMermaid(resolvedTheme === "dark");
    mermaid
      .render(`diagram-${Date.now()}`, toMermaid(arch))
      .then(({ svg }) => {
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      })
      .catch(() => !cancelled && setError("No se pudo dibujar el diagrama."));
    return () => {
      cancelled = true;
    };
  }, [arch, resolvedTheme, paletteId]);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      overflowX="auto"
      bg="bg.panel"
    >
      {error ? <Text color="red.500">{error}</Text> : <div ref={ref} />}
    </Box>
  );
}
