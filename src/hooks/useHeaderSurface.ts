"use client";

import { useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";

const HEADER_Y = 34;
const SAMPLE_XS = [56, 0.5, -88] as const;

type Rgba = { r: number; g: number; b: number; a: number };

function parseCssColor(input: string): Rgba | null {
  if (!input || input === "transparent") return null;
  const m = input.match(/^rgba?\((.+)\)$/i);
  if (!m) return null;

  const raw = m[1].trim();
  const parts = raw.includes(",")
    ? raw.split(",").map((p) => p.trim())
    : raw.split(/\s*\/\s*|\s+/);

  if (parts.length < 3) return null;

  const num = (v: string) => {
    if (v.endsWith("%")) return (parseFloat(v) / 100) * 255;
    return parseFloat(v);
  };

  const r = num(parts[0]);
  const g = num(parts[1]);
  const b = num(parts[2]);
  if (![r, g, b].every((n) => Number.isFinite(n))) return null;

  let a = 1;
  if (parts[3] !== undefined) {
    const rawA = parts[3];
    a = rawA.endsWith("%") ? parseFloat(rawA) / 100 : parseFloat(rawA);
    if (!Number.isFinite(a)) a = 1;
  }

  return { r, g, b, a };
}

function srgbToLin(c: number) {
  const x = c / 255;
  return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

/** True only for white / paper / cream — not for tinted or saturated grounds. */
function isNearWhite({ r, g, b, a }: Rgba): boolean {
  if (a < 0.72) return false;
  const L =
    0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const sat = max === 0 ? 0 : (max - min) / max;
  return L >= 0.72 && sat <= 0.14;
}

function skipChrome(el: Element): boolean {
  if (el.closest("[data-header-chrome], [role='banner'], [data-header-ignore]")) {
    return true;
  }
  const style = getComputedStyle(el);
  if (style.position === "fixed" || style.position === "sticky") return true;
  return false;
}

function samplePoint(x: number, y: number): boolean | null {
  const stack = document.elementsFromPoint(x, y);
  for (const el of stack) {
    if (!(el instanceof HTMLElement)) continue;
    if (skipChrome(el)) continue;

    const marked = el.closest("[data-nav-ground]");
    if (marked instanceof HTMLElement) {
      const ground = marked.getAttribute("data-nav-ground");
      if (ground === "color") return false;
      if (ground === "paper") return true;
    }

    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "PICTURE") {
      return false;
    }

    const bg = parseCssColor(getComputedStyle(el).backgroundColor);
    if (!bg || bg.a < 0.6) continue;
    return isNearWhite(bg);
  }
  return null;
}

function readNearWhite(fallback: boolean): boolean {
  if (typeof window === "undefined") return fallback;
  const w = window.innerWidth;
  const votes: boolean[] = [];

  for (const spec of SAMPLE_XS) {
    const x = spec < 1 && spec > 0 ? w * spec : spec < 0 ? w + spec : spec;
    if (x < 0 || x > w) continue;
    const hit = samplePoint(x, HEADER_Y);
    if (hit !== null) votes.push(hit);
  }

  if (votes.length === 0) return fallback;
  const whiteVotes = votes.filter(Boolean).length;
  return whiteVotes > votes.length / 2;
}

/**
 * Whether the surface under the header is white / near-white paper.
 * Black chrome only in that case; any colored ground keeps light chrome.
 */
export function useHeaderSurface(assumeColored: boolean): boolean {
  const pathname = usePathname();
  const [nearWhite, setNearWhite] = useState(!assumeColored);

  useLayoutEffect(() => {
    let ticking = false;

    const update = () => {
      setNearWhite(readNearWhite(!assumeColored));
      ticking = false;
    };

    const schedule = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    if (assumeColored) setNearWhite(false);
    update();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [assumeColored, pathname]);

  return nearWhite;
}
