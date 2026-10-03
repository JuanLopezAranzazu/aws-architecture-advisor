import { Box, HStack, Icon } from "@chakra-ui/react";
import { Palette } from "lucide-react";
import { palettes } from "../theme/palette";

interface Props {
  value: string;
  onChange: (id: string) => void;
}

export default function PaletteSwitcher({ value, onChange }: Props) {
  return (
    <HStack gap={2}>
      <Icon color="fg.muted">
        <Palette size={16} />
      </Icon>
      {Object.entries(palettes).map(([id, p]) => (
        <Box
          key={id}
          as="button"
          title={p.label}
          aria-label={`Paleta ${p.label}`}
          aria-pressed={value === id}
          onClick={() => onChange(id)}
          w={{ base: "26px", md: "18px" }}
          h={{ base: "26px", md: "18px" }}
          borderRadius="full"
          cursor="pointer"
          style={{ background: p.scale["500"] }}
          borderWidth="2px"
          borderColor={value === id ? "fg" : "transparent"}
        />
      ))}
    </HStack>
  );
}
