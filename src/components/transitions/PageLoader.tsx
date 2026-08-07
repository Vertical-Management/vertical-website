import { cn } from "@/lib/utils";

type PageLoaderProps = {
  /** Fullscreen fixed (route loading.tsx) vs inline */
  variant?: "fullscreen" | "inline";
  label?: string;
  className?: string;
};

/**
 * Shared branded loading UI — used by app/loading.tsx and fallbacks.
 */
export function PageLoader({
  variant = "fullscreen",
  label = "Cargando",
  className,
}: PageLoaderProps) {
  const inner = (
    <div className="flex flex-col items-center gap-5">
      <p className="font-mono text-caption uppercase tracking-[0.28em] text-ink-muted">
        {label}
      </p>
      <p className="font-display text-2xl tracking-tight text-ink md:text-3xl">
        VERTICAL
      </p>
      <div className="relative h-px w-20 overflow-hidden bg-ink/10">
        <span className="absolute inset-y-0 left-0 w-1/2 animate-shimmer bg-accent" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
        Inserting coin…
      </p>
    </div>
  );

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex min-h-[40vh] items-center justify-center py-20",
          className,
        )}
        role="status"
        aria-live="polite"
        aria-label={label}
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
      aria-label={label}
    >
      {inner}
    </div>
  );
}
