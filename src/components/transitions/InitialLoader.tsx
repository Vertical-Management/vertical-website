"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { asset } from "@/lib/assets";
import { EASE_IN_OUT_EXPO, EASE_OUT_EXPO, duration } from "@/lib/motion";

const SESSION_KEY = "vertical-intro-seen";
const INTRO_MS = 420;

function hasSaveData(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  return !!conn?.saveData;
}

/**
 * First-visit brand flash — visual only, once per session.
 * Never blocks input, never competes with LCP, skipped on reduced-motion / Save-Data.
 */
export function InitialLoader() {
  const { t } = useLanguage();
  const reduced = !!useReducedMotion();
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduced || hasSaveData()) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      /* private mode */
    }
    setShow(true);
  }, [reduced]);

  useEffect(() => {
    if (!show) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const tNow = Math.min(1, (now - start) / INTRO_MS);
      const eased = 1 - Math.pow(1 - tNow, 3);
      setProgress(Math.round(eased * 100));
      if (tNow < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* ignore */
        }
        window.setTimeout(() => setShow(false), 160);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="intro"
          className="pointer-events-none fixed inset-0 z-loader flex flex-col items-center justify-center bg-ink text-paper"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: duration.fast, ease: EASE_IN_OUT_EXPO },
          }}
          role="status"
          aria-live="polite"
          aria-label={t.common.loading}
        >
          <motion.p
            className="font-mono text-caption uppercase tracking-[0.3em] text-accent-lime"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.fast, ease: EASE_OUT_EXPO }}
          >
            {t.common.insertCoin}
          </motion.p>

          <motion.div
            className="mt-6 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.04,
              duration: duration.base,
              ease: EASE_OUT_EXPO,
            }}
          >
            <Image
              src={asset("/assets/logo/VERTICAL-WHITE.png")}
              alt=""
              width={72}
              height={102}
              priority={false}
              className="h-20 w-auto object-contain md:h-24"
            />
            <p className="font-display text-display-lg tracking-display md:text-display-xl">
              VERTICAL
            </p>
          </motion.div>

          <div className="mt-10 w-48 md:w-64">
            <div className="h-px w-full overflow-hidden bg-white/15">
              <motion.div
                className="h-full bg-accent-lime"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-center font-mono text-[10px] tabular-nums tracking-label text-white/40">
              {String(progress).padStart(3, "0")}%
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
