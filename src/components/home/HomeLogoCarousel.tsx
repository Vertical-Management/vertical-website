"use client";

import Image from "next/image";
import { LOGOPEDIA } from "@/data/logopedia";
import { asset } from "@/lib/assets";
import { Marquee, MarqueeItem } from "@/components/ui/Marquee";
import { cn } from "@/lib/utils";

type HomeLogoCarouselProps = {
  className?: string;
};

/**
 * Single-row logo marquee — tools & partner badges (LOGOPEDIA).
 */
export function HomeLogoCarousel({ className }: HomeLogoCarouselProps) {
  // Duplicate set so short lists still fill the track
  const logos = [...LOGOPEDIA, ...LOGOPEDIA];

  return (
    <div
      className={cn(
        "relative border-y border-border bg-paper-warm/60 py-6 md:py-8",
        className,
      )}
      role="region"
      aria-label="Partners & tools"
    >
      {/* Soft edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-10 bg-gradient-to-r from-paper to-transparent sm:w-16 md:w-24"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10 bg-gradient-to-l from-paper to-transparent sm:w-16 md:w-24"
        aria-hidden
      />

      <Marquee speed="slow" gap="3rem" pauseOnHover repeat={2}>
        {logos.map((logo, i) => (
          <MarqueeItem key={`${logo.src}-${i}`}>
            <div
              className={cn(
                "relative flex h-9 items-center justify-center sm:h-10 md:h-11",
                "opacity-55 grayscale transition-[opacity,filter] duration-base ease-out-expo",
                "hover:opacity-100 hover:grayscale-0",
              )}
              style={{ width: logo.width, maxWidth: "28vw" }}
            >
              <Image
                src={asset(logo.src)}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-full w-auto max-w-full object-contain"
                sizes="140px"
                unoptimized={logo.src.endsWith(".svg")}
              />
            </div>
          </MarqueeItem>
        ))}
      </Marquee>
    </div>
  );
}
