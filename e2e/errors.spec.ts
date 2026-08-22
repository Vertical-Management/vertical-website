import { test, expect } from "@playwright/test";

test.describe("Estados de error", () => {
  test("404 renderiza la pantalla de nivel no encontrado", async ({ page }) => {
    const res = await page.goto("/nivel-que-no-existe");
    expect(res?.status()).toBe(404);

    await expect(page.getByText("Error 404")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("no existe");

    const home = page.getByRole("link", { name: /Volver al home/ });
    await expect(home).toBeVisible();
  });

  test("el enlace del 404 regresa al home", async ({ page }) => {
    await page.goto("/nivel-que-no-existe");
    await page.getByRole("link", { name: /Volver al home/ }).click();
    await page.waitForURL("**/");
    await expect(page.locator("#main-content")).toBeVisible();
  });
});
