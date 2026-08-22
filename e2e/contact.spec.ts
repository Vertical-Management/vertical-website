import { test, expect } from "@playwright/test";

const LABELS = {
  name: "Nombre",
  email: "Email",
  message: "Mensaje",
  submit: "Insert coin · Enviar",
};

const ERRORS = {
  name: "Pon un nombre (o un alias épico).",
  email: "Necesitamos un email para responder.",
  message: "Cuéntanos un poco más del lío creativo.",
};

test.describe("Contacto — UI", () => {
  test("submit vacío muestra errores por campo sin llamar a la API", async ({
    page,
  }) => {
    let apiCalled = false;
    await page.route("**/api/contact", async (route) => {
      apiCalled = true;
      await route.fulfill({ status: 500, body: "{}" });
    });

    await page.goto("/contacto");
    await page.getByRole("button", { name: LABELS.submit }).click();

    await expect(page.getByRole("alert").filter({ hasText: ERRORS.name })).toBeVisible();
    await expect(
      page.getByRole("alert").filter({ hasText: ERRORS.email }),
    ).toBeVisible();
    await expect(
      page.getByRole("alert").filter({ hasText: ERRORS.message }),
    ).toBeVisible();
    expect(apiCalled).toBe(false);
  });

  test("happy path con API mockeada muestra confirmación de envío", async ({
    page,
  }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          ok: true,
          mode: "resend",
          message: "Mensaje enviado. Te respondemos pronto.",
        }),
      });
    });

    await page.goto("/contacto");
    await page.getByLabel(LABELS.name).fill("Ada Lovelace");
    await page.getByLabel(LABELS.email).fill("ada@example.com");
    await page
      .getByLabel(LABELS.message)
      .fill("Queremos una marca que no parezca plantilla.");
    await page.getByRole("button", { name: LABELS.submit }).click();

    // Hay un role=status global sr-only; filtramos por el contenido del éxito
    const confirmation = page
      .getByRole("status")
      .filter({ hasText: "Mensaje enviado" });
    await expect(confirmation).toBeVisible();
  });

  test("el honeypot existe en el formulario pero es invisible", async ({
    page,
  }) => {
    await page.goto("/contacto");
    const honeypot = page.locator('input[name="website"]');
    await expect(honeypot).toHaveCount(1);
    await expect(honeypot).not.toBeInViewport();
  });
});

test.describe("Contacto — API real", () => {
  test("rechaza payload vacío con 400 y errores por campo", async ({
    request,
  }) => {
    const res = await request.post("/api/contact", { data: {} });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.errors.name).toBeTruthy();
    expect(body.errors.email).toBeTruthy();
    expect(body.errors.message).toBeTruthy();
  });

  test("honeypot responde éxito sin entregar nada", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { website: "https://spam.example" },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.mode).toBe("honeypot");
  });

  test("rate limit: la sexta petición del mismo IP recibe 429", async ({
    request,
  }) => {
    const ip = "203.0.113.77";
    const hit = () =>
      request.post("/api/contact", {
        headers: { "X-Forwarded-For": ip },
        data: { name: "x", email: "bad", message: "corto" }, // 400 rápido, cuenta como hit
      });

    for (let i = 0; i < 5; i++) {
      await hit();
    }
    const sixth = await hit();
    expect(sixth.status()).toBe(429);
    const body = await sixth.json();
    expect(body.ok).toBe(false);
    expect(String(body.error)).toMatch(/Demasiados intentos/i);
  });
});
