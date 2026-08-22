import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("renderiza hero, landmarks y skip link", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Vertical/i);
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1.first()).toBeVisible();
  });

  test("el skip link apunta al contenido principal", async ({ page }) => {
    await page.goto("/");
    const skip = page.locator('a[href="#main-content"]').first();
    await expect(skip).toBeAttached();
    // Focus revela el skip link (visible) — patrón estándar de a11y
    await skip.focus();
    await expect(skip).toBeVisible();
  });

  test("declara lang=es y canonical al apex", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /somvertical\.ad/);
  });

  test("expone JSON-LD de Organization en el HTML inicial", async ({
    page,
  }) => {
    await page.goto("/");
    const ld = page.locator('script[type="application/ld+json"]');
    const count = await ld.count();
    expect(count).toBeGreaterThan(0);
    const first = await ld.first().textContent();
    expect(first).toContain("Vertical Management");
  });
});
