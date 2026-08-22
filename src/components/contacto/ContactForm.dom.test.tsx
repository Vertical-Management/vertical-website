import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/contacto/ContactForm";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

function renderForm() {
  return render(
    <LanguageProvider>
      <ContactForm />
    </LanguageProvider>,
  );
}

const LABELS = {
  name: "Nombre",
  email: "Email",
  message: "Mensaje",
  submit: "Insert coin · Enviar",
};

describe("ContactForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("pinta los campos accesibles y el honeypot oculto", () => {
    renderForm();

    expect(screen.getByLabelText(LABELS.name)).toBeTruthy();
    expect(screen.getByLabelText(LABELS.email)).toBeTruthy();
    expect(screen.getByLabelText(LABELS.message)).toBeTruthy();
    // Honeypot presente pero etiquetado para no rellenar
    const honeypot = screen.getByRole("textbox", { hidden: true, name: "No rellenar" });
    expect(honeypot).toBeTruthy();
  });

  it("submit vacío muestra errores por campo y no llama a la API", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole("button", { name: LABELS.submit }));

    expect(await screen.findByText("Pon un nombre (o un alias épico).")).toBeTruthy();
    expect(screen.getByText("Necesitamos un email para responder.")).toBeTruthy();
    expect(screen.getByText("Cuéntanos un poco más del lío creativo.")).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it("email inválido muestra error de formato sin enviar", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(LABELS.name), "Ada");
    await user.type(screen.getByLabelText(LABELS.email), "no-es-un-email");
    await user.type(
      screen.getByLabelText(LABELS.message),
      "Proyecto con craft, por favor.",
    );
    await user.click(screen.getByRole("button", { name: LABELS.submit }));

    // errEmailInvalid del locale es
    expect(
      await screen.findByText(/email/i, { selector: '[role="alert"]' }),
    ).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it("happy path: envía el payload y muestra confirmación", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        mode: "resend",
        message: "Mensaje enviado. Te respondemos pronto.",
      }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(LABELS.name), "Ada Lovelace");
    await user.type(screen.getByLabelText(LABELS.email), "ada@example.com");
    await user.type(
      screen.getByLabelText(LABELS.message),
      "Queremos una marca que no parezca plantilla.",
    );
    await user.click(screen.getByRole("button", { name: LABELS.submit }));

    const confirmation = await screen.findByRole("status");
    expect(confirmation.textContent).toContain("Mensaje enviado");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(String(init.body)) as Record<string, string>;
    expect(body.name).toBe("Ada Lovelace");
    expect(body.email).toBe("ada@example.com");
    expect(body.website).toBe("");
    vi.unstubAllGlobals();
  });
});

afterEach(() => {
  document.body.innerHTML = "";
});
