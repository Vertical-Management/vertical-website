"use client";

import { Marquee, MarqueeItem } from "@/components/ui/Marquee";

const ROW_A = [
  "Branding",
  "Identidad",
  "Digital",
  "Motion",
  "3D",
  "Campaign",
  "UX/UI",
  "Estrategia",
];

const ROW_B = [
  "Playful High-Craft",
  "Andorra",
  "Insert Coin",
  "No Templates",
  "Vertical Thinking",
  "Esteban Ferrer",
];

/**
 * Dual-direction editorial ticker after hero.
 */
export function HomeMarquee() {
  return (
    <div className="relative border-y border-border bg-paper-warm py-4 md:py-5">
      <Marquee speed="normal" gap="2.5rem" className="py-1">
        {ROW_A.map((item) => (
          <MarqueeItem key={item} className="gap-8">
            <span className="font-display text-display-sm tracking-display text-ink">
              {item}
            </span>
            <span className="text-accent" aria-hidden>
              ✦
            </span>
          </MarqueeItem>
        ))}
      </Marquee>
      <Marquee speed="fast" reverse gap="2.5rem" className="mt-2 py-1 opacity-60">
        {ROW_B.map((item) => (
          <MarqueeItem key={item} className="gap-8">
            <span className="font-mono text-xs uppercase tracking-label text-ink-soft">
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
