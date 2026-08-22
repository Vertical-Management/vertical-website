import { test, expect } from "@playwright/test";

test.use({ reducedMotion: "reduce" });

test.describe("prefers-reduced-motion", () => {
  test("la home carga contenido útil sin animaciones", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  });

  test("contacto sigue siendo usable con motion reducido", async ({
    page,
  }) => {
    await page.goto("/contacto");
    await expect(page.getByLabel("Nombre")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Insert coin · Enviar" }),
    ).toBeEnabled();
  });

  test("las rutas principales no quedan en blanco", async ({ page }) => {
    for (const path of ["/nosotros", "/servicios", "/proyectos"]) {
      await page.goto(path);
      await expect(page.locator("#main-content"), path).toBeVisible();
    }
  });
});
