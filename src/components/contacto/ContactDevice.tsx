"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";
import { asset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";

/**
 * Neo-iOS glass device — modernized contact “phone” over the landscape vibe.
 */
export function ContactDevice({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("es-AD", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.div
      className={cn(
        "relative mx-auto w-full max-w-[320px]",
        className,
      )}
      initial={reduced ? false : { opacity: 0, y: 40, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: duration.slow, ease: EASE_OUT_EXPO }}
      style={{ perspective: 1000 }}
    >
      {/* Device shell */}
      <div
        className={cn(
          "relative overflow-hidden rounded-[2.5rem] border border-white/20",
          "bg-gradient-to-b from-[#2a2a2e] to-[#0c0c0e]",
          "shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)]",
          "p-3",
        )}
      >
        {/* Inner screen */}
        <div className="relative overflow-hidden rounded-[2rem] bg-[#0a0a0c]">
          {/* Wallpaper blur strip */}
          <div className="absolute inset-0">
            <Image
              src={asset("/assets/xp/fondo-de-pantalla.jpg")}
              alt=""
              fill
              className="object-cover opacity-40 blur-sm scale-110"
              sizes="320px"
            />
            <div className="absolute inset-0 bg-ink/50 backdrop-blur-md" />
          </div>

          <div className="relative z-[1] flex min-h-[560px] flex-col px-4 pb-5 pt-3">
            {/* Dynamic island + status */}
            <div className="mb-4 flex items-center justify-between px-1">
              <span
                className="font-mono text-[11px] font-medium tabular-nums text-white/90"
                suppressHydrationWarning
              >
                {time || "9:41"}
              </span>
              <div
                className="absolute left-1/2 top-2 h-7 w-28 -translate-x-1/2 rounded-full bg-ink"
                aria-hidden
              />
              <span className="font-mono text-[10px] text-white/60" aria-hidden>
                5G · ▮▮▮
              </span>
            </div>

            {/* App header */}
            <div className="mt-4 text-center">
              <p className="font-mono text-[10px] uppercase tracking-label text-accent-lime">
                Messages
              </p>
              <p className="mt-1 font-display text-xl text-paper">
                {SITE.shortName}
              </p>
            </div>

            {/* Contact card */}
            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-md backdrop-blur-xl">
              <div className="flex items-center gap-3 border-b border-white/10 p-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/20 bg-paper-dim">
                  <Image
                    src={asset("/assets/FERRER.png")}
                    alt={SITE.founder}
                    fill
                    className="object-cover object-top"
                    sizes="56px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display text-lg text-paper">
                    {SITE.founder}
                  </p>
                  <p className="truncate font-mono text-[10px] uppercase tracking-label text-white/45">
                    {SITE.location} · Creative
                  </p>
                </div>
              </div>

              <div className="space-y-0.5 p-2">
                <a
                  href={`mailto:${SITE.email}`}
                  data-cursor="hover"
                  className="flex items-center justify-between rounded-2xl px-3 py-3 transition-colors hover:bg-white/10"
                >
                  <span>
                    <span className="block font-mono text-[9px] uppercase tracking-label text-white/40">
                      Mail
                    </span>
                    <span className="text-sm text-accent-cool">{SITE.email}</span>
                  </span>
                  <span className="text-white/30" aria-hidden>
                    ↗
                  </span>
                </a>
                {SOCIAL_LINKS.filter((s) => s.label !== "Email").map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="flex items-center justify-between rounded-2xl px-3 py-3 transition-colors hover:bg-white/10"
                  >
                    <span>
                      <span className="block font-mono text-[9px] uppercase tracking-label text-white/40">
                        Social
                      </span>
                      <span className="text-sm text-paper">{s.label}</span>
                    </span>
                    <span className="text-white/30" aria-hidden>
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Chat bubble teaser */}
            <div className="mt-4 space-y-2">
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2.5 text-sm text-paper shadow-sm">
                Hola — tengo un proyecto raro 👀
              </div>
              <div className="mr-auto max-w-[90%] rounded-2xl rounded-bl-md bg-white/12 px-3.5 py-2.5 text-sm text-paper backdrop-blur-sm">
                Perfecto. Los raros son los buenos. Insert coin abajo ↓
              </div>
            </div>

            {/* Home indicator */}
            <div className="mt-auto flex justify-center pt-6" aria-hidden>
              <span className="h-1 w-28 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Soft reflection */}
      <div
        className="pointer-events-none absolute -bottom-6 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-[100%] bg-ink/30 blur-xl"
        aria-hidden
      />
    </motion.div>
  );
}
