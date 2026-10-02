import { useState } from "react";
import { Box, Container, Heading, List, Spinner, Stack, Text } from "@chakra-ui/react";
import IdeaForm from "./components/IdeaForm";
import DiagramView from "./components/DiagramView";
import ServiceCard from "./components/ServiceCard";
import { generateArchitecture } from "./api";
import type { Architecture, ArchitectRequest } from "./types";

export default function App() {
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
    <Container maxW="4xl" py={8}>
      <Stack gap={6}>
        <Box>
          <Heading size="2xl">AWS Architect Assistant</Heading>
          <Text color="gray.500">Convierte la idea de tu proyecto en una arquitectura en AWS.</Text>
        </Box>

        <IdeaForm loading={loading} onSubmit={handleSubmit} />

        {loading && <Stack align="center"><Spinner size="lg" /></Stack>}
        {error && (
          <Box borderWidth="1px" borderColor="red.300" bg="red.50" color="red.700" borderRadius="md" p={4}>
            {error}
          </Box>
        )}

        {arch && !loading && (
          <Stack gap={6}>
            <Box>
              <Heading size="lg" mb={2}>Resumen</Heading>
              <Text>{arch.summary}</Text>
            </Box>
            <DiagramView arch={arch} />
            <Box>
              <Heading size="md" mb={2}>Supuestos</Heading>
              <List.Root ps={5}>
                {arch.assumptions.map((a, i) => <List.Item key={i}>{a}</List.Item>)}
              </List.Root>
            </Box>
            <Heading size="lg">Servicios y componentes</Heading>
            {arch.services.map((s) => <ServiceCard key={s.name} s={s} />)}
            <Text fontSize="sm" color="gray.500">
              Fuentes consultadas: {arch.sources.join(", ")}. Verifica los detalles en la documentación
              oficial de AWS antes de implementar.
            </Text>
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
