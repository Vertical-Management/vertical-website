"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";
import { testimonialsInter } from "./testimonialsFont";
import "./home-testimonials.css";

type Item = { quote: string; name: string; role: string };

const DISCS = [
  "#4F46E5",
  "#0F766E",
  "#9F1239",
  "#1E3A8A",
  "#6D28D9",
  "#9A3412",
  "#115E59",
  "#334155",
] as const;

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]!}${parts[parts.length - 1]![0]!}`.toUpperCase();
}

function discFor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return DISCS[Math.abs(hash) % DISCS.length]!;
}

function TestimonialCard({
  item,
  as: Tag = "article",
}: {
  item: Item;
  as?: "article" | "li";
}) {
  return (
    <Tag className="ht-card">
      <p className="ht-quote">{item.quote}</p>
      <div className="ht-person">
        <span
          className="ht-avatar"
          style={{ backgroundColor: discFor(item.name) }}
          aria-hidden
        >
          {initials(item.name)}
        </span>
        <div className="ht-meta">
          <p className="ht-name">{item.name}</p>
          <p className="ht-role">{item.role}</p>
        </div>
      </div>
    </Tag>
  );
}

function Rail({ items, reverse }: { items: Item[]; reverse?: boolean }) {
  return (
    <div className="ht-rail">
      <div className={cn("ht-track", reverse && "ht-track--reverse")}>
        <div className="ht-set">
          {items.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>
        <div className="ht-set" aria-hidden>
          {items.map((item) => (
            <TestimonialCard key={`${item.name}-dup`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Self-contained testimonials — two opposite rails, mask fade, hover pause.
 * Reduced motion swaps the mechanic for a readable list.
 */
export function HomeTestimonials() {
  const { t } = useLanguage();
  const copy = t.home.testimonials;
  const root = useRef<HTMLElement>(null);

  const rowA = copy.items.filter((_, i) => i % 2 === 0);
  const rowB = copy.items.filter((_, i) => i % 2 === 1);

  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        el.style.setProperty(
          "--ht-play",
          entry?.isIntersecting ? "running" : "paused",
        );
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={root}
      className={cn(testimonialsInter.className, "ht-root py-section")}
      aria-labelledby="home-testimonials-title"
      data-nav-ground="paper"
    >
      <header className="ht-header">
        <p className="ht-eyebrow">{copy.eyebrow}</p>
        <h2 id="home-testimonials-title" className="ht-title">
          {copy.title}
        </h2>
      </header>

      <div className="ht-stage">
        <div className="ht-rails" aria-hidden>
          <Rail items={rowA} />
          <Rail items={rowB} reverse />
        </div>

        <ul className="ht-list" aria-label={copy.sectionLabel}>
          {copy.items.map((item) => (
            <TestimonialCard key={item.name} item={item} as="li" />
          ))}
        </ul>
      </div>
    </section>
  );
}
