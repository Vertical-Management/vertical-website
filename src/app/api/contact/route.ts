import { NextResponse } from "next/server";
import { SITE } from "@/lib/constants";
import {
  formatContactEmail,
  validateContactPayload,
  type ContactPayload,
} from "@/lib/contact";

export const runtime = "nodejs";

/**
 * In-memory rate limit (best-effort per instance).
 * On multi-instance serverless this is soft protection;
 * honeypot + payload limits + Resend still apply.
 */
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 5;

/** Periodic prune to avoid unbounded growth on long-lived instances */
function pruneHits(now: number) {
  if (hits.size < 200) return;
  for (const [ip, row] of hits) {
    if (now > row.reset) hits.delete(ip);
  }
}

function clientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function rateLimit(ip: string): boolean {
  const now = Date.now();
  pruneHits(now);
  const row = hits.get(ip);
  if (!row || now > row.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (row.count >= MAX_HITS) return false;
  row.count += 1;
  return true;
}

function isProduction() {
  return process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
}

async function deliverEmail(data: ContactPayload): Promise<{
  mode: "resend" | "logged" | "honeypot";
}> {
  if (data.website) return { mode: "honeypot" };

  const { subject, text, html } = formatContactEmail(data);
  const to = process.env.CONTACT_TO_EMAIL || SITE.email;
  const from = process.env.CONTACT_FROM_EMAIL || `Vertical <onboarding@resend.dev>`;
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("[contact] Resend error", res.status, errText);
      throw new Error("No se pudo enviar el email.");
    }

    return { mode: "resend" };
  }

  // Production without provider: hard fail — never fake success
  if (isProduction()) {
    console.error("[contact] RESEND_API_KEY missing in production");
    throw new Error(
      `Envío no configurado. Escríbenos a ${SITE.email} mientras lo reparamos.`,
    );
  }

  // Local / preview without key: log only
  console.info("[contact] message received (no RESEND_API_KEY)", {
    to,
    subject,
    from: data.email,
    name: data.name,
    company: data.company,
    budget: data.budget,
    preview: data.message.slice(0, 160),
  });

  return { mode: "logged" };
}

export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Demasiados intentos. Prueba en un minuto." },
        { status: 429 },
      );
    }

    // Reject oversized bodies early (~32KB JSON is plenty for contact)
    const contentLength = Number(req.headers.get("content-length") || 0);
    if (contentLength > 32_768) {
      return NextResponse.json(
        { ok: false, error: "Payload demasiado grande." },
        { status: 413 },
      );
    }

    const json = await req.json().catch(() => null);
    const parsed = validateContactPayload(json);

    if (!parsed.ok) {
      return NextResponse.json({ ok: false, errors: parsed.errors }, { status: 400 });
    }

    const result = await deliverEmail(parsed.data);

    return NextResponse.json({
      ok: true,
      mode: result.mode,
      message:
        result.mode === "resend"
          ? "Mensaje enviado. Te respondemos pronto."
          : result.mode === "honeypot"
            ? "Mensaje recibido. Te respondemos pronto."
            : "Mensaje recibido (modo local). En producción se envía por email.",
    });
  } catch (err) {
    console.error("[contact] failure", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          err instanceof Error
            ? err.message
            : "Algo se rompió. Escríbenos a " + SITE.email,
      },
      { status: 500 },
    );
  }
}
