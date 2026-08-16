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
      <h2 className="mb-4 text-sm font-semibold text-[#eafff1] md:text-base">
        {p.titleLine1} {p.titleLine2}
      </h2>
      <p className="mb-5 max-w-2xl text-sm text-[#5f8d68]">{p.blurb}</p>
      <ol className="crt-panel divide-y divide-[#143614]">
        {steps.map((step, i) => (
          <li
            key={step.index}
            className="grid gap-2 px-4 py-3 sm:grid-cols-[3.2rem_1fr_auto] sm:items-baseline"
          >
            <span className="crt-glow-text text-xs">[{step.index}]</span>
            <div>
              <p className="text-sm text-[#eafff1]">{step.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#5f8d68] sm:text-sm">
                {step.description}
              </p>
            </div>
            <pre
              className="hidden font-mono text-[0.65rem] leading-none text-[#2bbf5c] sm:block"
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
