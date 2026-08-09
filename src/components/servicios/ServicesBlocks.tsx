"use client";

import { useMemo, useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { localizeServices } from "@/lib/i18n";
import { serviceBlockClasses } from "@/components/servicios/serviceTheme";
import { cn } from "@/lib/utils";

/**
 * Full-bleed color blocks — one per service.
 * Brutalist slabs + high-craft hover and scroll.
 */
export function ServicesBlocks() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { t } = useLanguage();
  const services = useMemo(() => localizeServices(t), [t]);
  const b = t.servicesPage.blocks;

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      registerGsap();

      root.current.querySelectorAll<HTMLElement>("[data-service-block]").forEach(
        (block) => {
          const punch = block.querySelector<HTMLElement>("[data-punch]");
          const content = block.querySelector<HTMLElement>("[data-content]");

          if (punch) {
            // Keep watermark subdued — never climb above body copy contrast
            gsap.fromTo(
              punch,
              { xPercent: -6, opacity: 0.22 },
              {
                xPercent: 3,
                opacity: 0.34,
                ease: "none",
                scrollTrigger: {
                  trigger: block,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }

          if (content) {
            gsap.fromTo(
              content,
              { y: 36, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: block,
                  start: "top 78%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }
        },
      );
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} aria-label={b.ariaLabel} className="relative">
      {services.map((service, i) => {
        const theme = serviceBlockClasses(service.theme);
        const flip = i % 2 === 1;

        return (
          <article
            key={service.id}
            id={service.id}
            data-service-block
            className={cn(
              "relative scroll-mt-header overflow-hidden border-b-2 border-ink",
              theme.block,
            )}
          >
            {/* Giant watermark — always behind copy, softer so it never eats body type */}
            <p
              data-punch
              aria-hidden
              className={cn(
                "pointer-events-none absolute -right-4 top-1/2 z-0 select-none font-display text-[clamp(4rem,22vw,16rem)] font-extrabold leading-none tracking-display",
                theme.number,
                " -translate-y-1/2 opacity-40",
              )}
            >
              {service.punch ?? service.title}
            </p>

            <div
              data-content
              className={cn(
                "relative z-10 mx-auto grid max-w-site gap-10 px-gutter py-16 md:py-24 lg:grid-cols-12 lg:gap-8 lg:py-28",
                flip && "lg:[&>*:first-child]:order-2",
              )}
            >
              {/* Index + title */}
              <div className="lg:col-span-5">
                <p
                  className={cn(
                    "font-mono text-caption uppercase tracking-label",
                    theme.muted,
                  )}
                >
                  {b.serviceLabel} {service.index}
                </p>
                <h2 className="mt-4 font-display text-display-lg tracking-display">
                  {service.title}
                </h2>
                <p className={cn("mt-2 font-display text-display-sm opacity-80", theme.muted)}>
                  {service.punch}
                </p>
              </div>

              {/* Body */}
              <div className="lg:col-span-7">
                <p className="max-w-xl text-lead">{service.longDescription}</p>

                {service.tags ? (
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className={cn(
                          "rounded-pill border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-label",
                          theme.badge,
                        )}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {service.deliverables ? (
                  <div className="mt-10 border-t-2 border-current/15 pt-8">
                    <p
                      className={cn(
                        "mb-4 font-mono text-caption uppercase tracking-label",
                        theme.muted,
                      )}
                    >
                      {b.deliverablesLabel}
                    </p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm font-medium md:text-base"
                        >
                          <span
                            className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current")}
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
