"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();
  const e = t.errorPage;
  // Never surface internal stack / messages in production UI
  const isDev = process.env.NODE_ENV === "development";

  return (
    <main
      id="main-content"
      className="flex min-h-dvh flex-col items-center justify-center px-gutter text-center"
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent-hot">
        {e.eyebrow}
      </p>
      <h1 className="font-display text-display-md text-ink">{e.title}</h1>
      <p className="mt-4 max-w-md text-sm text-ink-soft">
        {isDev && error.message ? error.message : e.body}
      </p>
      {error.digest ? (
        <p className="mt-2 font-mono text-[10px] text-ink-faint">
          ref: {error.digest}
        </p>
      ) : null}
      <button
        type="button"
        onClick={reset}
        className="mt-10 rounded-pill border border-ink px-8 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
      >
        {e.retry}
      </button>
    </main>
  );
}
