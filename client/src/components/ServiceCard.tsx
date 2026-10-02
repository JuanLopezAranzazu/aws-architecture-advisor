import { Box, Heading, List, Stack, Text } from "@chakra-ui/react";
import type { ServiceDetail } from "../types";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box>
      <Text fontWeight="semibold" fontSize="sm" color="orange.600">{title}</Text>
      {children}
    </Box>
  );
}

export default function ServiceCard({ s }: { s: ServiceDetail }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={5}>
      <Stack gap={3}>
        <Heading size="md">{s.name}</Heading>
        <Block title="Qué es"><Text>{s.what_it_is}</Text></Block>
        <Block title="Su rol aquí"><Text>{s.role_in_architecture}</Text></Block>
        <Block title="Por qué se eligió"><Text>{s.why_chosen}</Text></Block>
        <Block title="Alternativas">
          <List.Root ps={5}>
            {s.alternatives.map((a, i) => <List.Item key={i}>{a}</List.Item>)}
          </List.Root>
        </Block>
      </Stack>
    </Box>
  );
}
