"use client";

import Image from "next/image";
import { asset } from "@/lib/assets";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

type PageLoaderProps = {
  /** Fullscreen fixed (route loading.tsx) vs inline */
  variant?: "fullscreen" | "inline";
  label?: string;
  className?: string;
};

/**
 * Shared branded loading UI — used by app/loading.tsx and fallbacks.
 * Lockup: mark PNG + typographic VERTICAL (same as header / transitions).
 */
export function PageLoader({
  variant = "fullscreen",
  label,
  className,
}: PageLoaderProps) {
  const { t } = useLanguage();
  const resolvedLabel = label ?? t.common.loading;
  const inverse = variant === "fullscreen"; // paper ground → black mark

  const inner = (
    <div className="flex flex-col items-center gap-5">
      <p
        className={cn(
          "font-mono text-caption uppercase tracking-[0.28em]",
          inverse ? "text-ink-muted" : "text-ink-muted",
        )}
      >
        {resolvedLabel}
      </p>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-3.5">
        <Image
          src={asset("/assets/logo/VERTICAL-BLACK.png")}
          alt=""
          width={40}
          height={56}
          className="h-10 w-auto object-contain sm:h-11"
          priority={false}
        />
        <p className="relative font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
          VERTICAL
          <span
            className="absolute -right-1.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent"
            aria-hidden
          />
        </p>
      </div>

      <div className="bg-ink/10 relative h-px w-20 overflow-hidden">
        <span className="absolute inset-y-0 left-0 w-1/2 animate-shimmer bg-accent" />
      </div>
      <p className="tracking-label font-mono text-[10px] uppercase text-ink-faint">
        {t.common.insertCoin}
      </p>
    </div>
  );

  if (variant === "inline") {
    return (
      <div
        className={cn("flex min-h-[40vh] items-center justify-center py-20", className)}
        role="status"
        aria-live="polite"
        aria-label={resolvedLabel}
      >
        {inner}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-loader flex items-center justify-center bg-paper",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label={resolvedLabel}
    >
      {inner}
    </div>
  );
}
