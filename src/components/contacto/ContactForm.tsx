"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Input, TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { fill } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";

type FormState = {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
  website: string;
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

/**
 * Contact form → POST /api/contact (Resend if configured, else logged).
 */
export function ContactForm() {
  const { t } = useLanguage();
  const f = t.contactPage.form;
  const [data, setData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const reduced = useReducedMotion();

  const validateClient = (form: FormState): FormErrors => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = f.errName;
    if (!form.email.trim()) {
      next.email = f.errEmailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = f.errEmailInvalid;
    }
    if (!form.message.trim() || form.message.trim().length < 12) {
      next.message = f.errMessage;
    }
    return next;
  };

  const set =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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
          json?.error || json?.errors?.form || fill(f.errGeneric, { email: SITE.email }),
        );
        setStatus("error");
        return;
      }

      setServerMessage(json.message || f.defaultSuccess);
      setStatus("sent");
      setData(INITIAL);
    } catch {
      setServerMessage(fill(f.errNetwork, { email: SITE.email }));
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
            <p className="tracking-label text-ink/60 font-mono text-caption uppercase">
              {f.successEyebrow}
            </p>
            <h3 className="mt-3 font-display text-display-md text-ink">
              {f.successTitle}
            </h3>
            <p className="text-ink/80 mt-4 max-w-md">{serverMessage || f.successBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="primary"
                onClick={() => {
                  setStatus("idle");
                  setServerMessage("");
                }}
              >
                {f.sendAnother}
              </Button>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex h-11 items-center rounded-pill border-2 border-ink px-6 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                {f.orWrite} {SITE.email}
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
            <div
              className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
              aria-hidden
            >
              <label>
                {f.honeypot}
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
                label={f.name}
                name="name"
                autoComplete="name"
                placeholder={f.namePlaceholder}
                value={data.name}
                onChange={set("name")}
                error={errors.name}
                required
                maxLength={80}
              />
              <Input
                label={f.email}
                name="email"
                type="email"
                autoComplete="email"
                placeholder={f.emailPlaceholder}
                value={data.email}
                onChange={set("email")}
                error={errors.email}
                required
                maxLength={120}
              />
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <Input
                label={f.company}
                name="company"
                autoComplete="organization"
                placeholder={f.companyPlaceholder}
                value={data.company}
                onChange={set("company")}
                error={errors.company}
                maxLength={120}
              />
              <label className="group flex w-full flex-col gap-2">
                <span className="tracking-label font-mono text-caption uppercase text-ink-muted transition-colors duration-base group-focus-within:text-ink">
                  {f.budget}
                </span>
                <select
                  name="budget"
                  value={data.budget}
                  onChange={set("budget")}
                  className={cn(
                    "w-full appearance-none border-0 border-b border-border-strong bg-transparent py-3 text-base text-ink",
                    "focus:border-ink focus:shadow-[0_1px_0_0_var(--color-ink)] focus:outline-none",
                    !data.budget && "text-ink-faint",
                  )}
                >
                  <option value="">{f.budgetDefault}</option>
                  {f.budgetOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <TextArea
              label={f.message}
              name="message"
              placeholder={f.messagePlaceholder}
              rows={5}
              value={data.message}
              onChange={set("message")}
              error={errors.message}
              required
              maxLength={5000}
            />

            {status === "error" && serverMessage ? (
              <p
                className="border-danger/30 bg-danger/5 rounded-md border px-4 py-3 text-sm text-danger"
                role="alert"
              >
                {serverMessage}
              </p>
            ) : null}

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <p className="max-w-xs text-xs leading-relaxed text-ink-muted">
                {fill(f.privacyNote, { email: SITE.email })}{" "}
                <a
                  href="/privacidad"
                  className="decoration-ink/30 underline underline-offset-2 hover:decoration-ink"
                >
                  {f.privacyLink}
                </a>
                .
              </p>
              <Button
                type="submit"
                variant="arcade"
                size="lg"
                fullWidth
                disabled={status === "sending"}
                data-cursor="hover"
                className="sm:w-auto"
              >
                {status === "sending" ? f.sending : f.submit}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
