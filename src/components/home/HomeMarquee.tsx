"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Marquee, MarqueeItem } from "@/components/ui/Marquee";

/**
 * Dual-direction editorial ticker after hero.
 */
export function HomeMarquee() {
  const { t } = useLanguage();
  const { rowA, rowB } = t.home.marquee;

  return (
    <div className="relative bg-paper-warm py-4 md:py-5">
      <Marquee speed="normal" gap="2.5rem" className="py-1">
        {rowA.map((item) => (
          <MarqueeItem key={item} className="gap-8">
            <span className="tracking-display font-display text-display-sm text-ink">
              {item}
            </span>
            <span className="text-accent" aria-hidden>
              ✦
            </span>
          </MarqueeItem>
        ))}
      </Marquee>
      <Marquee speed="fast" reverse gap="2.5rem" className="mt-2 py-1 opacity-60">
        {rowB.map((item) => (
          <MarqueeItem key={item} className="gap-8">
            <span className="tracking-label font-mono text-xs uppercase text-ink-soft">
              {item}
            </span>
            <span className="text-ink-faint" aria-hidden>
              ●
            </span>
          </MarqueeItem>
        ))}
      </Marquee>
    </div>
  );
}
