"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function NotFound() {
  const { t } = useLanguage();
  const n = t.notFound;

  return (
    <main
      id="main-content"
      className="flex min-h-dvh flex-col items-center justify-center px-gutter pt-header text-center"
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">
        {n.code}
      </p>
      <h1 className="font-display text-display-lg text-ink">
        {n.titleLine1}
        <br />
        {n.titleLine2}
      </h1>
      <p className="mt-6 max-w-sm text-ink-soft">{n.body}</p>
      <Link
        href="/"
        className="mt-10 rounded-pill bg-ink px-8 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-transform duration-400 ease-out-expo hover:scale-105"
      >
        {n.home}
      </Link>
    </main>
  );
}
