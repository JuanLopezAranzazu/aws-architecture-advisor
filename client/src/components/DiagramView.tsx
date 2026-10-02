import { useEffect, useRef, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import mermaid from "mermaid";
import type { Architecture } from "../types";

mermaid.initialize({ startOnLoad: false, theme: "neutral", securityLevel: "strict" });

const safeId = (s: string) => s.replace(/[^a-zA-Z0-9_]/g, "_");
const safeText = (s: string) => s.replace(/["|<>\[\]{}()]/g, " ").trim();

export function toMermaid(a: Architecture): string {
  const nodes = a.nodes.map((n) => `  ${safeId(n.id)}["${safeText(n.service)}"]`);
  const edges = a.edges.map((e) => {
    const l = safeText(e.label);
    return l
      ? `  ${safeId(e.source)} -->|"${l}"| ${safeId(e.target)}`
      : `  ${safeId(e.source)} --> ${safeId(e.target)}`;
  });
  return ["flowchart LR", ...nodes, ...edges].join("\n");
}

export default function DiagramView({ arch }: { arch: Architecture }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    mermaid
      .render(`diagram-${Date.now()}`, toMermaid(arch))
      .then(({ svg }) => {
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      })
      .catch(() => !cancelled && setError("No se pudo dibujar el diagrama."));
    return () => { cancelled = true; };
  }, [arch]);

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} overflowX="auto">
      {error ? <Text color="red.500">{error}</Text> : <div ref={ref} />}
    </Box>
  );
}
