import { useState } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  List,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Cloud, Layers, ListChecks, Network, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import IdeaForm from "./components/IdeaForm";
import DiagramView from "./components/DiagramView";
import ServiceCard from "./components/ServiceCard";
import ServiceIcon from "./components/ServiceIcon";
import ThemeToggle from "./components/ThemeToggle";
import PaletteSwitcher from "./components/PaletteSwitcher";
import { usePalette } from "./theme/usePalette";
import { generateArchitecture } from "./api";
import type { Architecture, ArchitectRequest } from "./types";

function SectionTitle({
  icon: Ico,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <HStack gap={2}>
      <Icon color="brand.fg">
        <Ico size={22} />
      </Icon>
      <Heading size={{ base: "md", md: "lg" }}>{children}</Heading>
    </HStack>
  );
}

export default function App() {
  const { id: paletteId, setId } = usePalette();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [arch, setArch] = useState<Architecture | null>(null);

  async function handleSubmit(req: ArchitectRequest) {
    setLoading(true);
    setError(null);
    try {
      setArch(await generateArchitecture(req));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxW="4xl" px={{ base: 4, md: 6 }} py={{ base: 5, md: 8 }}>
      <Stack gap={6}>
        <Flex
          justify="space-between"
          align={{ base: "flex-start", sm: "center" }}
          direction={{ base: "column", sm: "row" }}
          gap={3}
        >
          <HStack gap={3}>
            <Flex
              boxSize="44px"
              flexShrink={0}
              align="center"
              justify="center"
              borderRadius="lg"
              bg="brand.solid"
              color="brand.contrast"
            >
              <Cloud size={24} />
            </Flex>
            <Box>
              <Heading size={{ base: "lg", md: "xl" }}>
                AWS Architect Assistant
              </Heading>
              <Text color="fg.muted" fontSize="sm">
                Convierte la idea de tu proyecto en una arquitectura en AWS.
              </Text>
            </Box>
          </HStack>
          <HStack gap={3}>
            <PaletteSwitcher value={paletteId} onChange={setId} />
            <ThemeToggle />
          </HStack>
        </Flex>

        <IdeaForm loading={loading} onSubmit={handleSubmit} />

        {loading && (
          <Stack align="center">
            <Spinner size="lg" color="brand.solid" />
          </Stack>
        )}
        {error && (
          <Box
            borderWidth="1px"
            borderColor="red.500"
            bg="red.subtle"
            color="red.fg"
            borderRadius="md"
            p={4}
          >
            {error}
          </Box>
        )}

        {arch && !loading && (
          <Stack gap={6}>
            <Stack gap={2}>
              <SectionTitle icon={Sparkles}>Resumen</SectionTitle>
              <Text>{arch.summary}</Text>
            </Stack>

            <Stack gap={3}>
              <SectionTitle icon={Network}>Arquitectura</SectionTitle>
              <DiagramView arch={arch} paletteId={paletteId} />
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
                {arch.nodes.map((n) => (
                  <HStack
                    key={n.id}
                    align="flex-start"
                    gap={2}
                    borderWidth="1px"
                    borderRadius="md"
                    p={2}
                    bg="bg.panel"
                  >
                    <ServiceIcon name={n.service} size={18} />
                    <Text fontSize="sm" overflowWrap="anywhere">
                      <b>{n.service}:</b> {n.role}
                    </Text>
                  </HStack>
                ))}
              </SimpleGrid>
            </Stack>

            <Stack gap={2}>
              <SectionTitle icon={ListChecks}>Supuestos</SectionTitle>
              <List.Root ps={5}>
                {arch.assumptions.map((a, i) => (
                  <List.Item key={i}>{a}</List.Item>
                ))}
              </List.Root>
            </Stack>

            <SectionTitle icon={Layers}>Servicios y componentes</SectionTitle>
            {arch.services.map((s) => (
              <ServiceCard key={s.name} s={s} />
            ))}

            <Text fontSize="sm" color="fg.muted">
              Fuentes consultadas: {arch.sources.join(", ")}. Verifica los
              detalles en la documentación oficial de AWS antes de implementar.
            </Text>
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
