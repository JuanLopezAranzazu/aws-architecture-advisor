import { IconButton } from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  return (
    <IconButton
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      variant="ghost"
      size="sm"
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </IconButton>
  );
}
