"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

export function CrtPrompt({ command }: { command: string }) {
  return (
    <p className="crt-prompt">
      <span className="crt-prompt-user">vertical@studio</span>
      <span className="text-[#1c7a3c]">$</span>
      <span className="crt-prompt-cmd">{command}</span>
    </p>
  );
}

export function CrtCaret({ className }: { className?: string }) {
  return <span className={cn("crt-caret crt-blink", className)} aria-hidden />;
}

type CrtFrameProps = {
  children: ReactNode;
};

export function CrtFrame({ children }: CrtFrameProps) {
  const { t } = useLanguage();
  const crt = t.servicesPage.crt;

  return (
    <div className="crt-frame">
      <div className="crt-glow" aria-hidden />
      <div className="crt-scanlines" aria-hidden />
      <div className="crt-window">
        <div className="crt-titlebar">
          <div className="crt-dots" aria-hidden>
            <span className="crt-dot" style={{ background: "#ff5f56" }} />
            <span className="crt-dot" style={{ background: "#ffbd2e" }} />
            <span className="crt-dot" style={{ background: "#27c93f" }} />
          </div>
          <p className="crt-path">{crt.windowPath}</p>
          <p className="crt-avail">
            <span className="crt-blink">●</span> {crt.available}
          </p>
        </div>
        <div className="crt-body">
          <div className="crt-session">{children}</div>
        </div>
      </div>
    </div>
  );
}
