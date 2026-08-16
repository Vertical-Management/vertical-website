"use client";

import { useMemo } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { localizeProcessSteps } from "@/lib/i18n";
import { CrtPrompt } from "./CrtPrimitives";

const BARS = ["████████████░░", "███████████░░░", "█████████████░", "██████████░░░░"];

/**
 * CRT process — `cat process.txt`.
 */
export function ServicesProcess() {
  const { t } = useLanguage();
  const steps = useMemo(() => localizeProcessSteps(t), [t]);
  const p = t.servicesPage.process;
  const command = t.servicesPage.crt.process.command;

  return (
    <section>
      <CrtPrompt command={command} />
      <h2 className="crt-head mb-4 text-sm font-semibold md:text-base">
        {p.titleLine1} {p.titleLine2}
      </h2>
      <p className="crt-copy mb-5 max-w-2xl text-sm">{p.blurb}</p>
      <ol className="crt-panel divide-y divide-white/10">
        {steps.map((step, i) => (
          <li
            key={step.index}
            className="grid gap-2 px-4 py-3 sm:grid-cols-[3.2rem_1fr_auto] sm:items-baseline"
          >
            <span className="crt-glow-text text-xs">[{step.index}]</span>
            <div>
              <p className="crt-head text-sm">{step.title}</p>
              <p className="crt-copy mt-1 text-xs leading-relaxed sm:text-sm">
                {step.description}
              </p>
            </div>
            <pre
              className="crt-glow-text hidden font-mono text-[0.65rem] leading-none sm:block"
              aria-hidden
            >
              {BARS[i] ?? BARS[0]}
            </pre>
          </li>
        ))}
      </ol>
    </section>
  );
}
