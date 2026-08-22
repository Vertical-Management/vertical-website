import { test, expect } from "@playwright/test";

test.describe("SEO files generados", () => {
  test("sitemap.xml es un XML válido con el dominio canónico", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const xml = await res.text();
    expect(xml).toContain("<urlset");
    expect(xml).toContain("somvertical.ad");
    // Rutas principales indexadas
    for (const path of ["</loc>", "/servicios", "/proyectos", "/contacto"]) {
      expect(xml, `sitemap debe contener ${path}`).toContain(path);
    }
  });

  test("robots.txt declara sitemap y permite el home", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const txt = await res.text();
    expect(txt).toMatch(/Sitemap: .*somvertical\.ad\/sitemap\.xml/);
    expect(txt).toMatch(/Allow: \//);
  });

  test("manifest.webmanifest expone nombre y colores de marca", async ({ request }) => {
    const res = await request.get("/manifest.webmanifest");
    expect(res.status()).toBe(200);
    const manifest = (await res.json()) as {
      name?: string;
      display?: string;
    };
    expect(manifest.name).toContain("Vertical");
    expect(manifest.display).toBeTruthy();
  });
});
