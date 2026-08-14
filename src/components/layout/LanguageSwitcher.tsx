"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FlagIcon } from "@/components/layout/FlagIcon";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  /** Sit above dark hero / open menu */
  inverse?: boolean;
  className?: string;
};

/**
 * One round flag by default. Tap → all flags slide out left; pick one → collapse.
 */
export function LanguageSwitcher({
  inverse = false,
  className,
}: LanguageSwitcherProps) {
  const { locale, setLocale, t, meta } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const reduced = useReducedMotion();

  // Outside click closes
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [open]);

  // Escape closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const pick = (code: Locale) => {
    setLocale(code);
    setOpen(false);
  };

  const others = LOCALES.filter((code) => code !== locale);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative flex items-center",
        inverse && "z-[61]",
        className,
      )}
    >
      {/* Expanded strip — slides out to the left of the active flag */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id={listId}
            role="listbox"
            aria-label={t.header.language}
            initial={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, x: 16, width: 0 }
            }
            animate={{
              opacity: 1,
              x: 0,
              width: "auto",
              transition: { duration: duration.base, ease: EASE_OUT_EXPO },
            }}
            exit={
              reduced
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    x: 12,
                    transition: { duration: duration.fast, ease: EASE_OUT_EXPO },
                  }
            }
            className="absolute right-full top-1/2 z-[62] mr-1.5 flex -translate-y-1/2 items-center gap-1.5 sm:mr-2 sm:gap-2"
          >
            {others.map((code, i) => {
              const item = LOCALE_META[code];
              return (
                <motion.button
                  key={code}
                  type="button"
                  role="option"
                  data-cursor="hover"
                  title={item.label}
                  aria-label={item.label}
                  aria-selected={false}
                  onClick={() => pick(code)}
                  initial={
                    reduced
                      ? false
                      : { opacity: 0, x: 10, scale: 0.85 }
                  }
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: {
                      delay: reduced ? 0 : 0.04 + i * 0.05,
                      duration: duration.fast,
                      ease: EASE_OUT_EXPO,
                    },
                  }}
                  exit={
                    reduced
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          x: 8,
                          scale: 0.9,
                          transition: { duration: duration.fast * 0.7 },
                        }
                  }
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full p-0 leading-none",
                    "border-0 bg-transparent shadow-none outline-none",
                    "opacity-80 transition-transform duration-base ease-out-expo",
                    "hover:scale-110 hover:opacity-100",
                    "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                    inverse && "focus-visible:ring-offset-ink",
                  )}
                >
                  <FlagIcon locale={code} size={26} title={item.label} />
                </motion.button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Active flag — always visible; toggles the strip */}
      <button
        type="button"
        data-cursor="hover"
        title={meta.label}
        aria-label={
          open
            ? t.header.language
            : `${t.header.selectLanguage}: ${meta.label}`
        }
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative flex h-11 w-11 items-center justify-center rounded-full p-0 leading-none",
          "border-0 bg-transparent shadow-none outline-none",
          "transition-transform duration-base ease-out-expo",
          "hover:scale-110",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          open && "scale-110",
          inverse && "relative z-[61] focus-visible:ring-offset-ink",
        )}
      >
        <FlagIcon locale={locale} size={26} title={meta.label} />
      </button>
    </div>
  );
}
