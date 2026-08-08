"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Input, TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";

type FormState = {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
  website: string; // honeypot
};

type FormErrors = Partial<Record<keyof FormState | "form", string>>;

const INITIAL: FormState = {
  name: "",
  email: "",
  company: "",
  budget: "",
  message: "",
  website: "",
};

function validateClient(data: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Pon un nombre (o un alias épico).";
  if (!data.email.trim()) {
    errors.email = "Necesitamos un email para responder.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Ese email no parece válido.";
  }
  if (!data.message.trim() || data.message.trim().length < 12) {
    errors.message = "Cuéntanos un poco más del lío creativo.";
  }
  return errors;
}

/**
 * Contact form → POST /api/contact (Resend if configured, else logged).
 */
export function ContactForm() {
  const [data, setData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [serverMessage, setServerMessage] = useState("");
  const reduced = useReducedMotion();

  const set =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setData((d) => ({ ...d, [key]: e.target.value }));
      if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
    };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validateClient(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("sending");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          budget: data.budget,
          message: data.message,
          website: data.website,
        }),
      });

      const json = (await res.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
        error?: string;
        errors?: FormErrors;
      } | null;

      if (!res.ok || !json?.ok) {
        if (json?.errors) setErrors(json.errors);
        setServerMessage(
          json?.error ||
            json?.errors?.form ||
            "No se pudo enviar. Prueba de nuevo o escribe a " + SITE.email,
        );
        setStatus("error");
        return;
      }

      setServerMessage(
        json.message || "Mensaje recibido. Te respondemos pronto.",
      );
      setStatus("sent");
      setData(INITIAL);
    } catch {
      setServerMessage(
        `Red caída. Escríbenos a ${SITE.email} y lo resolvemos offline.`,
      );
      setStatus("error");
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="success"
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base, ease: EASE_OUT_EXPO }}
            className="flex min-h-[420px] flex-col items-start justify-center rounded-card border-2 border-ink bg-accent-lime p-8 shadow-[6px_6px_0_0_var(--color-ink)] md:p-10"
            role="status"
            aria-live="polite"
          >
            <p className="font-mono text-caption uppercase tracking-label text-ink/60">
              Coin accepted
            </p>
            <h3 className="mt-3 font-display text-display-md text-ink">
              Mensaje en camino.
            </h3>
            <p className="mt-4 max-w-md text-ink/80">
              {serverMessage ||
                `Lo tenemos. Respuesta humana desde ${SITE.location} — no bot de 2012.`}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="primary"
                onClick={() => {
                  setStatus("idle");
                  setServerMessage("");
                }}
              >
                Enviar otro
              </Button>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex h-11 items-center rounded-pill border-2 border-ink px-6 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                O escribe a {SITE.email}
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            className="space-y-8"
            initial={false}
          >
            {/* Honeypot */}
            <div
              className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
              aria-hidden
            >
              <label>
                No rellenar
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={data.website}
                  onChange={set("website")}
                />
              </label>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <Input
                label="Nombre"
                name="name"
                autoComplete="name"
                placeholder="Tu nombre o alias"
                value={data.name}
                onChange={set("name")}
                error={errors.name}
                required
                maxLength={80}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="hola@marca.com"
                value={data.email}
                onChange={set("email")}
                error={errors.email}
                required
                maxLength={120}
              />
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <Input
                label="Empresa (opcional)"
                name="company"
                autoComplete="organization"
                placeholder="Marca / Studio"
                value={data.company}
                onChange={set("company")}
                error={errors.company}
                maxLength={120}
              />
              <label className="group flex w-full flex-col gap-2">
                <span className="font-mono text-caption uppercase tracking-label text-ink-muted transition-colors duration-base group-focus-within:text-ink">
                  Presupuesto (opcional)
                </span>
                <select
                  name="budget"
                  value={data.budget}
                  onChange={set("budget")}
                  className={cn(
                    "w-full appearance-none border-0 border-b border-border-strong bg-transparent py-3 text-base text-ink",
                    "focus:border-ink focus:outline-none focus:shadow-[0_1px_0_0_var(--color-ink)]",
                    !data.budget && "text-ink-faint",
                  )}
                >
                  <option value="">Por definir</option>
                  <option value="<5k">Menos de 5k</option>
                  <option value="5-15k">5k – 15k</option>
                  <option value="15-40k">15k – 40k</option>
                  <option value="40k+">40k+</option>
                  <option value="ongoing">Retainer / ongoing</option>
                </select>
              </label>
            </div>

            <TextArea
              label="Mensaje"
              name="message"
              placeholder="El proyecto, el deadline imposible, el dream — lo que sea."
              rows={5}
              value={data.message}
              onChange={set("message")}
              error={errors.message}
              required
              maxLength={5000}
            />

            {status === "error" && serverMessage ? (
              <p
                className="rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger"
                role="alert"
              >
                {serverMessage}
              </p>
            ) : null}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xs text-xs leading-relaxed text-ink-muted">
                Envío a {SITE.email}. Respuesta humana, sin autoresponder de
                2012. Al enviar aceptas la{" "}
                <a
                  href="/privacidad"
                  className="underline decoration-ink/30 underline-offset-2 hover:decoration-ink"
                >
                  política de privacidad
                </a>
                .
              </p>
              <Button
                type="submit"
                variant="arcade"
                size="lg"
                disabled={status === "sending"}
                data-cursor="hover"
              >
                {status === "sending" ? "Insertando…" : "Insert coin · Enviar"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
