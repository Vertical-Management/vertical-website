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
          <p className="crt-glow-text mt-3 text-xs">{n.user}</p>
        </div>
        <dl className="space-y-1.5 text-xs sm:text-sm">
          {n.rows.map((row) => (
            <div key={row.key} className="grid grid-cols-[6.5rem_1fr] gap-2 sm:grid-cols-[7.5rem_1fr]">
              <dt className="crt-glow-text">{row.key}</dt>
              <dd className="crt-head">{row.value}</dd>
            </div>
          ))}
          <div className="grid grid-cols-[6.5rem_1fr] gap-2 sm:grid-cols-[7.5rem_1fr]">
            <dt className="crt-glow-text">Status</dt>
            <dd className="crt-accent">
              <span className="crt-blink">●</span> {n.status}
            </dd>
          </div>
        </dl>
        <div
          className="flex flex-wrap gap-1.5 md:col-span-2"
          aria-hidden
        >
          {["#C8FF00", "#0A0A0A", "#F4F1EA", "#FF3D00", "#FF1A5C", "#00C2FF"].map(
            (hex) => (
              <span
                key={hex}
                className="h-3 w-7 rounded-[3px] border border-white/10"
                style={{ background: hex }}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
