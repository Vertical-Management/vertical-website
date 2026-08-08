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
  Record<"name" | "email" | "message" | "company" | "form", string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: 80,
  email: 120,
  company: 120,
  budget: 40,
  message: 5000,
  messageMin: 12,
} as const;

function clip(s: string, max: number) {
  return s.length > max ? s.slice(0, max) : s;
}

/** Strip CR/LF and control chars from header-sensitive fields */
function sanitizeHeader(s: string) {
  return s.replace(/[\r\n\u0000-\u001f\u007f]/g, " ").trim();
}

export function validateContactPayload(
  raw: unknown,
): { ok: true; data: ContactPayload } | { ok: false; errors: ContactFieldErrors } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, errors: { form: "Payload inválido." } };
  }

  const body = raw as Record<string, unknown>;
  const name = sanitizeHeader(String(body.name ?? "").trim());
  const email = String(body.email ?? "").trim().toLowerCase();
  const company = sanitizeHeader(String(body.company ?? "").trim());
  const budget = sanitizeHeader(String(body.budget ?? "").trim());
  const message = String(body.message ?? "").trim();
  const website = String(body.website ?? "").trim();

  // Honeypot trip — pretend success upstream (no validation noise for bots)
  if (website) {
    return {
      ok: true,
      data: {
        name: clip(name, LIMITS.name),
        email: clip(email, LIMITS.email),
        company: clip(company, LIMITS.company),
        budget: clip(budget, LIMITS.budget),
        message: clip(message, LIMITS.message),
        website,
      },
    };
  }

  const errors: ContactFieldErrors = {};
  if (!name) errors.name = "Pon un nombre (o un alias épico).";
  else if (name.length > LIMITS.name) {
    errors.name = `Nombre demasiado largo (máx. ${LIMITS.name}).`;
  }

  if (!email) errors.email = "Necesitamos un email para responder.";
  else if (email.length > LIMITS.email) {
    errors.email = `Email demasiado largo (máx. ${LIMITS.email}).`;
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Ese email no parece válido.";
  }

  if (company.length > LIMITS.company) {
    errors.company = `Empresa demasiado larga (máx. ${LIMITS.company}).`;
  }

  if (!message || message.length < LIMITS.messageMin) {
    errors.message = "Cuéntanos un poco más del lío creativo.";
  } else if (message.length > LIMITS.message) {
    errors.message = `Mensaje demasiado largo (máx. ${LIMITS.message}).`;
  }

  if (Object.keys(errors).length) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name: clip(name, LIMITS.name),
      email: clip(email, LIMITS.email),
      company: company ? clip(company, LIMITS.company) : undefined,
      budget: budget ? clip(budget, LIMITS.budget) : undefined,
      message: clip(message, LIMITS.message),
    },
  };
}

export function formatContactEmail(data: ContactPayload): {
  subject: string;
  text: string;
  html: string;
} {
  const safeName = sanitizeHeader(data.name);
  const safeCompany = data.company ? sanitizeHeader(data.company) : "";
  const subject = `Coin insert · ${safeName}${safeCompany ? ` (${safeCompany})` : ""}`;

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
