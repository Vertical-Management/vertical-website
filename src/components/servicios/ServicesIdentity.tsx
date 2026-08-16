"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { CrtPrompt } from "./CrtPrimitives";

const ASCII = `██╗   ██╗
██║   ██║
██║   ██║
╚██╗ ██╔╝
 ╚████╔╝
  ╚═══╝`;

/**
 * CRT identity — `neofetch --studio`.
 */
export function ServicesIdentity() {
  const { t } = useLanguage();
  const n = t.servicesPage.crt.neofetch;

  return (
    <section>
      <CrtPrompt command={n.command} />
      <div className="crt-panel grid gap-6 p-4 md:grid-cols-[minmax(0,11rem)_1fr] md:gap-8 md:p-5">
        <div>
          <pre className="crt-glow-text overflow-x-auto text-[0.62rem] leading-[1.15] sm:text-[0.7rem]">
            {ASCII}
          </pre>
          <p className="mt-3 text-xs text-[#2bbf5c]">{n.user}</p>
        </div>
        <dl className="space-y-1.5 text-xs sm:text-sm">
          {n.rows.map((row) => (
            <div key={row.key} className="grid grid-cols-[6.5rem_1fr] gap-2 sm:grid-cols-[7.5rem_1fr]">
              <dt className="text-[#2bbf5c]">{row.key}</dt>
              <dd className="text-[#eafff1]">{row.value}</dd>
            </div>
          ))}
          <div className="grid grid-cols-[6.5rem_1fr] gap-2 sm:grid-cols-[7.5rem_1fr]">
            <dt className="text-[#2bbf5c]">Status</dt>
            <dd className="text-[#ffd24a]">
              <span className="crt-blink">●</span> {n.status}
            </dd>
          </div>
        </dl>
        <div
          className="flex flex-wrap gap-1.5 md:col-span-2"
          aria-hidden
        >
          {["#39ff7a", "#2bbf5c", "#1c7a3c", "#143614", "#ffd24a", "#eafff1"].map(
            (hex) => (
              <span
                key={hex}
                className="h-3 w-7 rounded-[3px] border border-[#143614]"
                style={{ background: hex }}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
