import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // plugin-react transforma el JSX antes que esbuild (el tsconfig de Next
  // usa jsx:"preserve", que vite no puede ejecutar)
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "./src"),
    },
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          // Lógica pura — sin DOM
          name: "unit",
          environment: "node",
          include: ["src/**/__tests__/**/*.test.{ts,tsx}"],
          exclude: ["node_modules/**", ".next/**", "e2e/**", "viewer/**"],
        },
      },
      {
        extends: true,
        test: {
          // Componentes cliente — jsdom + Testing Library
          name: "components",
          environment: "jsdom",
          include: ["src/**/*.dom.test.{ts,tsx}"],
          setupFiles: ["vitest.setup.ts"],
        },
      },
    ],
  },
});
