export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
  /** Honeypot — must be empty */
  website?: string;
};

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "message" | "form", string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(
  raw: unknown,
): { ok: true; data: ContactPayload } | { ok: false; errors: ContactFieldErrors } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, errors: { form: "Payload inválido." } };
  }

  const body = raw as Record<string, unknown>;
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const company = String(body.company ?? "").trim();
  const budget = String(body.budget ?? "").trim();
  const message = String(body.message ?? "").trim();
  const website = String(body.website ?? "").trim();

  // Honeypot trip — pretend success upstream
  if (website) {
    return {
      ok: true,
      data: { name, email, company, budget, message, website },
    };
  }

  const errors: ContactFieldErrors = {};
  if (!name) errors.name = "Pon un nombre (o un alias épico).";
  if (!email) errors.email = "Necesitamos un email para responder.";
  else if (!EMAIL_RE.test(email)) errors.email = "Ese email no parece válido.";
  if (!message || message.length < 12) {
    errors.message = "Cuéntanos un poco más del lío creativo.";
  }
  if (message.length > 5000) {
    errors.message = "Mensaje demasiado largo (máx. 5000).";
  }

  if (Object.keys(errors).length) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      email,
      company: company || undefined,
      budget: budget || undefined,
      message,
    },
  };
}

export function formatContactEmail(data: ContactPayload): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = `Coin insert · ${data.name}${data.company ? ` (${data.company})` : ""}`;
  const text = [
    data.message,
    "",
    "—",
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Empresa: ${data.company}` : null,
    data.budget ? `Presupuesto: ${data.budget}` : null,
    `Fecha: ${new Date().toISOString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#0a0a0a">
      <p style="font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#6b6b6b">Vertical · Contacto</p>
      <h1 style="font-size:22px;margin:8px 0 16px">Nuevo coin insertado</h1>
      <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:24px 0" />
      <p><strong>Nombre:</strong> ${escapeHtml(data.name)}<br/>
      <strong>Email:</strong> ${escapeHtml(data.email)}<br/>
      ${data.company ? `<strong>Empresa:</strong> ${escapeHtml(data.company)}<br/>` : ""}
      ${data.budget ? `<strong>Presupuesto:</strong> ${escapeHtml(data.budget)}<br/>` : ""}
      </p>
    </div>
  `.trim();

  return { subject, text, html };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
