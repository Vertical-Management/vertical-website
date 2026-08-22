import { test, expect } from "@playwright/test";

const ROUTES = [
  { path: "/nosotros", name: "Nosotros" },
  { path: "/servicios", name: "Servicios" },
  { path: "/proyectos", name: "Proyectos" },
  { path: "/contacto", name: "Contacto" },
] as const;

test.describe("Navegación principal", () => {
  test("las rutas principales responden 200 y renderizan contenido", async ({
    page,
  }) => {
    for (const route of ROUTES) {
      const res = await page.goto(route.path);
      expect(res?.status(), route.path).toBe(200);
      await expect(page.locator("#main-content"), route.path).toBeVisible();
      await expect(page).toHaveTitle(/Vertical/i);
    }
  });

  test("el nav del header lleva a Proyectos y Contacto", async ({ page }) => {
    await page.goto("/");

    for (const route of ROUTES.slice(2)) {
      // El nombre accesible incluye el índice del nav ("04 Proyectos")
      const link = page
        .getByRole("banner")
        .getByRole("link", { name: route.name })
        .first();
      await link.click();
      await page.waitForURL(`**${route.path}`);
      await expect(page.locator("#main-content")).toBeVisible();
      await expect(page).toHaveURL(new RegExp(`${route.path}$`));
    }
  });

  test("el logo vuelve al home desde una ruta interna", async ({ page }) => {
    await page.goto("/servicios");
    await page.getByRole("banner").getByRole("link").first().click();
    await page.waitForURL("**/");
    expect(new URL(page.url()).pathname).toBe("/");
  });
});
