"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";

const FAQS = [
  {
    q: "¿Trabajáis solo en Andorra?",
    a: "Base en Andorra, clientes donde haga falta. Remoto o presencial según el proyecto.",
  },
  {
    q: "¿Hacéis solo diseño o también desarrollo?",
    a: "Diseño y dirección creativa de principio a fin. En digital colaboramos con devs de confianza o nos integramos en tu equipo.",
  },
  {
    q: "¿Cuál es el ticket mínimo?",
    a: "Depende del alcance. Si hay buena idea (o ganas de encontrarla), hablemos — sin cotización de relleno.",
  },
  {
    q: "¿Y el humor? ¿Es obligatorio?",
    a: "No. Pero si suma, no lo escondemos. Premium en la ejecución; personalidad en la marca.",
  },
];

/**
 * Lightweight accordion FAQ — irreverent but useful.
 */
export function ServicesFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section className="relative border-b border-border py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="06" className="mb-4">
              FAQ
            </Eyebrow>
            <Heading as="h2" size="display-md">
              Preguntas
              <br />
              sin PowerPoint
            </Heading>
          </div>

          <ul className="lg:col-span-8">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-b border-border">
                  <button
                    type="button"
                    data-cursor="hover"
                    className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-base hover:text-accent md:py-6"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="font-display text-lg tracking-tight md:text-xl">
                      <span className="mr-3 font-mono text-caption text-ink-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border font-mono text-sm transition-transform duration-base ease-out-expo",
                        isOpen && "rotate-45 bg-ink text-paper",
                      )}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{
                          duration: duration.base,
                          ease: EASE_OUT_EXPO,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-6 text-base leading-relaxed text-ink-soft">
                          {item.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
