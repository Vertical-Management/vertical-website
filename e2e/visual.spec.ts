import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

/**
 * TASK-0009 — regresión visual (OPT-IN).
 *
 * Se ejecuta solo con PLAYWRIGHT_VISUAL=1 porque los baselines son
 * dependientes de plataforma (los generados en Windows no valen para el
 * runner linux de CI). Uso:
 *
 *   PLAYWRIGHT_VISUAL=1 npx playwright test e2e/visual.spec.ts
 *
 * Para regenerar baselines tras un cambio visual intencionado:
 *
 *   PLAYWRIGHT_VISUAL=1 npx playwright test e2e/visual.spec.ts --update-snapshots
 *
 * Estabilidad: reduced-motion emulado + `animations: "disabled"` + vídeos
 * enmascarados (los loops hacen cada frame distinto).
 */

const VISUAL_ENABLED = process.env.PLAYWRIGHT_VISUAL === "1";

test.beforeEach(async ({ page }) => {
  test.skip(!VISUAL_ENABLED, "Regresión visual opt-in (PLAYWRIGHT_VISUAL=1)");
  await page.emulateMedia({ reducedMotion: "reduce" });
});

/** Congela los <video> (poster) para que el frame no cambie entre runs. */
async function freezeVideos(page: Page) {
  await page.evaluate(() => {
    document.querySelectorAll("video").forEach((video) => {
      video.pause();
      video.removeAttribute("src");
      video.load();
    });
  });
}

const SHOTS = [
  { path: "/", name: "home-hero" },
  { path: "/servicios", name: "servicios" },
  { path: "/contacto", name: "contacto" },
] as const;

for (const shot of SHOTS) {
  test(`baseline visual: ${shot.name}`, async ({ page }) => {
    await page.goto(shot.path);
    await expect(page.locator("#main-content")).toBeVisible();
    await freezeVideos(page);
    await expect(page).toHaveScreenshot(`${shot.name}.png`, {
      animations: "disabled",
      fullPage: false,
      maxDiffPixelRatio: 0.02,
    });
  });
}
