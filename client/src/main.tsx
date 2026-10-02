import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import App from "./App";
import { system } from "./theme/system";
import { applyPalette, getStoredPalette } from "./theme/usePalette";

applyPalette(getStoredPalette());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </ThemeProvider>
  </React.StrictMode>
);
