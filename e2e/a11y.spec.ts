import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

/**
 * TASK-0008 — escaneo axe sobre rutas principales.
 * Falla con violaciones `critical`; las `serious` se listan en el output
 * para triaje sin bloquear (umbral a apretar según baje la deuda).
 */

const ROUTES = ["/", "/nosotros", "/servicios", "/proyectos", "/contacto"];

async function scan(page: Page, path: string) {
  await page.goto(path);
  await expect(page.locator("#main-content")).toBeVisible();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();

  return results.violations;
}

for (const route of ROUTES) {
  test(`sin violaciones critical en ${route}`, async ({ page }) => {
    const violations = await scan(page, route);

    const critical = violations.filter((v) => v.impact === "critical");
    const serious = violations.filter((v) => v.impact === "serious");

    // Visibilidad de deuda a11y: lista serious en el reporte del test
    if (serious.length) {
      console.log(
        `[a11y][${route}] serious:`,
        JSON.stringify(
          serious.map((v) => ({
            id: v.id,
            nodes: v.nodes.length,
            help: v.help,
          })),
        ),
      );
    }

    expect(
      critical.map((v) => `${v.id} (${v.nodes.length} nodos)`),
      `violaciones critical en ${route}`,
    ).toEqual([]);
  });
}
