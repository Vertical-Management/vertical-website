import { describe, expect, it } from "vitest";
import { formatContactEmail, validateContactPayload } from "@/lib/contact";

const validPayload = {
  name: "Esteban",
  email: "esteban@somvertical.ad",
  message: "Quiero una marca que rompa moldes.",
};

describe("validateContactPayload", () => {
  it("acepta un payload mínimo válido", () => {
    const result = validateContactPayload(validPayload);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.name).toBe("Esteban");
    expect(result.data.email).toBe("esteban@somvertical.ad");
    expect(result.data.company).toBeUndefined();
    expect(result.data.website).toBeUndefined();
  });

  it("normaliza el email a minúsculas y recorta espacios", () => {
    const result = validateContactPayload({
      ...validPayload,
      email: "  USER@Example.COM ",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.email).toBe("user@example.com");
  });

  it("rechaza payloads que no son objetos", () => {
    for (const raw of [null, undefined, "hola", 42]) {
      const result = validateContactPayload(raw);
      expect(result.ok).toBe(false);
      if (result.ok) continue;
      expect(result.errors.form).toBeTruthy();
    }
  });

  it("honeypot relleno ⇒ ok con website, sin validar el resto", () => {
    const result = validateContactPayload({
      name: "",
      email: "no-email",
      message: "",
      website: "https://spam.example",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.website).toBe("https://spam.example");
  });

  it("exige nombre, email y mensaje", () => {
    const result = validateContactPayload({});
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.name).toBeTruthy();
    expect(result.errors.email).toBeTruthy();
    expect(result.errors.message).toBeTruthy();
  });

  it("rechaza emails inválidos", () => {
    for (const email of ["foo", "foo@", "foo@bar", "foo bar@example.com"]) {
      const result = validateContactPayload({ ...validPayload, email });
      expect(result.ok).toBe(false);
      if (result.ok) continue;
      expect(result.errors.email).toBeTruthy();
    }
  });

  it("mensaje demasiado corto o largo genera error de campo", () => {
    const short = validateContactPayload({ ...validPayload, message: "corto" });
    expect(short.ok).toBe(false);

    const long = validateContactPayload({
      ...validPayload,
      message: "x".repeat(5001),
    });
    expect(long.ok).toBe(false);
  });

  it("campos excesivos generan error específico por campo", () => {
    const result = validateContactPayload({
      ...validPayload,
      name: "n".repeat(81),
      company: "c".repeat(121),
    });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.name).toMatch(/máx\. 80/);
    expect(result.errors.company).toMatch(/máx\. 120/);
  });

  it("sanitiza saltos de línea en campos sensibles a cabeceras", () => {
    const result = validateContactPayload({
      ...validPayload,
      name: "Evil\r\nBcc: victim@example.com",
      company: "A\tB C",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    // CR/LF y tabs se sustituyen por espacio
    expect(result.data.name).not.toMatch(/[\r\n]/);
    expect(result.data.name).toContain("Evil");
    expect(result.data.company).toBe("A B C");
  });

  it("recorta el mensaje al límite máximo en éxito", () => {
    const result = validateContactPayload({
      ...validPayload,
      message: "m".repeat(6000),
    });
    // >5000 genera error; exactamente 5000 pasa y queda igual
    expect(result.ok).toBe(false);

    const edge = validateContactPayload({
      ...validPayload,
      message: "m".repeat(5000),
    });
    expect(edge.ok).toBe(true);
  });
});

describe("formatContactEmail", () => {
  it("compone asunto con nombre y empresa", () => {
    const { subject } = formatContactEmail({
      ...validPayload,
      company: "Acme",
    });
    expect(subject).toBe("Coin insert · Esteban (Acme)");
  });

  it("escapa HTML en mensaje y nombre", () => {
    const { html } = formatContactEmail({
      name: "<script>alert(1)</script>",
      email: "x@y.z",
      message: '<img src=x onerror="alert(1)">',
    });
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img src=x");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&lt;img src=x");
  });

  it("incluye los metadatos en texto plano", () => {
    const { text } = formatContactEmail({
      ...validPayload,
      company: "Acme",
      budget: "10k-20k",
    });
    expect(text).toContain("Nombre: Esteban");
    expect(text).toContain("Email: esteban@somvertical.ad");
    expect(text).toContain("Empresa: Acme");
    expect(text).toContain("Presupuesto: 10k-20k");
    expect(text).toContain(validPayload.message);
  });

  it("omite líneas vacías de empresa/presupuesto", () => {
    const { text } = formatContactEmail(validPayload);
    expect(text).not.toContain("Empresa:");
    expect(text).not.toContain("Presupuesto:");
  });
});
