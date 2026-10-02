import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  List,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Lightbulb, Puzzle, Repeat, Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ServiceDetail } from "../types";
import ServiceIcon from "./ServiceIcon";

function Block({
  title,
  icon: Ico,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <Box>
      <HStack gap={2} mb={1}>
        <Icon color="brand.fg">
          <Ico size={14} />
        </Icon>
        <Text fontWeight="semibold" fontSize="sm" color="brand.fg">
          {title}
        </Text>
      </HStack>
      {children}
    </Box>
  );
}

export default function ServiceCard({ s }: { s: ServiceDetail }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} bg="bg.panel">
      <Stack gap={4}>
        <Flex align="center" gap={3}>
          <Flex
            boxSize="40px"
            align="center"
            justify="center"
            borderRadius="md"
            bg="brand.subtle"
          >
            <ServiceIcon name={s.name} size={22} />
          </Flex>
          <Heading size="md">{s.name}</Heading>
        </Flex>
        <Block title="Qué es" icon={Info}>
          <Text>{s.what_it_is}</Text>
        </Block>
        <Block title="Su rol aquí" icon={Puzzle}>
          <Text>{s.role_in_architecture}</Text>
        </Block>
        <Block title="Por qué se eligió" icon={Lightbulb}>
          <Text>{s.why_chosen}</Text>
        </Block>
        <Block title="Alternativas" icon={Repeat}>
          <List.Root ps={5}>
            {s.alternatives.map((a, i) => (
              <List.Item key={i}>{a}</List.Item>
            ))}
          </List.Root>
        </Block>
      </Stack>
    </Box>
  );
}
