import { defineConfig, devices } from "@playwright/test";

/**
 * E2E contra build de producción (TASK-0004).
 * El webServer compila y sirve `next start` en el puerto 3000; los specs
 * corren contra lo mismo que se despliega, no contra el dev server.
 */
const PORT = Number(process.env.E2E_PORT || 3000);
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  timeout: 60_000,
  use: {
    baseURL,
    trace: "on-first-retry",
    // Sitio muy animado: margen extra para assertions sobre transiciones
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
  ],
  webServer: {
    command: "npm run build && npm run start",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 10 * 60 * 1000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
