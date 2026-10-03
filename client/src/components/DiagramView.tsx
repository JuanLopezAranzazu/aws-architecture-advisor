import { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { FileCode, Image as ImageIcon } from "lucide-react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";
import type { Architecture } from "../types";
import { surface } from "../theme/palette";
import { downloadPng, downloadSvg } from "../utils/download";

const safeId = (s: string) => s.replace(/[^a-zA-Z0-9_]/g, "_");
const safeText = (s: string) => s.replace(/["|<>\[\]{}()]/g, " ").trim();

export function toMermaid(a: Architecture, direction: "LR" | "TD"): string {
  const nodes = a.nodes.map(
    (n) => `  ${safeId(n.id)}["${safeText(n.service)}"]`,
  );
  const edges = a.edges.map((e) => {
    const l = safeText(e.label);
    return l
      ? `  ${safeId(e.source)} -->|"${l}"| ${safeId(e.target)}`
      : `  ${safeId(e.source)} --> ${safeId(e.target)}`;
  });
  return [`flowchart ${direction}`, ...nodes, ...edges].join("\n");
}

function initMermaid(dark: boolean) {
  const css = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) =>
    css.getPropertyValue(name).trim() || fallback;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: "base",
    flowchart: { htmlLabels: false },
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
      edgeLabelBackground: dark ? surface.dark.panel : surface.light.panel,
      fontFamily: "Inter, system-ui, sans-serif",
    },
  });
}

function useIsNarrow(query = "(max-width: 639px)") {
  const [narrow, setNarrow] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const h = () => setNarrow(m.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, [query]);
  return narrow;
}

export default function DiagramView({
  arch,
  paletteId,
}: {
  arch: Architecture;
  paletteId: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const narrow = useIsNarrow();

  useEffect(() => {
    let cancelled = false;
    setError(null);
    initMermaid(dark);
    mermaid
      .render(`diagram-${Date.now()}`, toMermaid(arch, narrow ? "TD" : "LR"))
      .then(({ svg }) => {
        if (cancelled) return;
        setSvg(svg);
        if (ref.current) ref.current.innerHTML = svg;
      })
      .catch(() => !cancelled && setError("No se pudo dibujar el diagrama."));
    return () => {
      cancelled = true;
    };
  }, [arch, dark, paletteId, narrow]);

  const bg = dark ? surface.dark.panel : surface.light.panel;

  async function onPng() {
    setBusy(true);
    try {
      await downloadPng(svg, bg, "arquitectura-aws.png");
    } catch {
      setError("No se pudo exportar a PNG. Prueba con SVG.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={{ base: 2, md: 4 }}
      bg="bg.panel"
    >
      <Flex justify="flex-end" mb={2}>
        <HStack gap={2}>
          <Button
            size="xs"
            variant="outline"
            disabled={!svg}
            onClick={() => downloadSvg(svg, bg, "arquitectura-aws.svg")}
          >
            <FileCode size={14} /> SVG
          </Button>
          <Button
            size="xs"
            variant="outline"
            disabled={!svg}
            loading={busy}
            onClick={onPng}
          >
            <ImageIcon size={14} /> PNG
          </Button>
        </HStack>
      </Flex>
      <Box overflowX="auto">
        {error ? <Text color="red.500">{error}</Text> : <div ref={ref} />}
      </Box>
    </Box>
  );
}
