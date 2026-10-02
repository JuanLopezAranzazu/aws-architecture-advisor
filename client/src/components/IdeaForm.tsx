import { useState } from "react";
import {
  Box,
  Button,
  Field,
  NativeSelect,
  SimpleGrid,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import type { ArchitectRequest, Budget, Level, Users } from "../types";

interface Props {
  loading: boolean;
  onSubmit: (r: ArchitectRequest) => void;
}

function Select<T extends string>(props: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <Field.Root>
      <Field.Label>{props.label}</Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field
          value={props.value}
          onChange={(e) => props.onChange(e.target.value as T)}
        >
          {props.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  );
}

export default function IdeaForm({ loading, onSubmit }: Props) {
  const [idea, setIdea] = useState("");
  const [budget, setBudget] = useState<Budget>("minimo");
  const [users, setUsers] = useState<Users>("<100");
  const [level, setLevel] = useState<Level>("principiante");

  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} bg="bg.panel">
      <Stack gap={4}>
        <Field.Root>
          <Field.Label>Describe tu proyecto</Field.Label>
          <Textarea
            rows={5}
            maxLength={2000}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Ej: Proyecto universitario de una API REST con React y PostgreSQL, quiero gastar lo mínimo posible."
          />
        </Field.Root>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
          <Select
            label="Presupuesto"
            value={budget}
            onChange={setBudget}
            options={[
              { value: "minimo", label: "Mínimo" },
              { value: "moderado", label: "Moderado" },
              { value: "sin_limite", label: "Sin límite" },
            ]}
          />
          <Select
            label="Usuarios esperados"
            value={users}
            onChange={setUsers}
            options={[
              { value: "<100", label: "Menos de 100" },
              { value: "100-10k", label: "100 a 10 mil" },
              { value: ">10k", label: "Más de 10 mil" },
            ]}
          />
          <Select
            label="Nivel del equipo"
            value={level}
            onChange={setLevel}
            options={[
              { value: "principiante", label: "Principiante" },
              { value: "intermedio", label: "Intermedio" },
              { value: "avanzado", label: "Avanzado" },
            ]}
          />
        </SimpleGrid>
        <Button
          colorPalette="brand"
          loading={loading}
          disabled={idea.trim().length < 10}
          onClick={() =>
            onSubmit({
              idea: idea.trim(),
              budget,
              expected_users: users,
              team_level: level,
            })
          }
        >
          Generar arquitectura
        </Button>
      </Stack>
    </Box>
  );
}
