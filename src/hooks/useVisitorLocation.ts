"use client";

import { useEffect, useState } from "react";

export type VisitorLocation = {
  city: string | null;
  country: string | null;
  label: string;
};

/** Studio base — shown only after failed lookup (not while loading). */
export const LOCATION_FALLBACK: VisitorLocation = {
  city: "Andorra la Vella",
  country: "Andorra",
  label: "Andorra la Vella · Andorra",
};

type CachePayload = {
  city: string | null;
  country: string | null;
  label: string;
  at: number;
};

const CACHE_KEY = "vertical:visitor-location";
const CACHE_MS = 1000 * 60 * 60 * 12; // 12h
const FETCH_MS = 1800;

function buildLabel(city: string | null, country: string | null): string {
  if (city && country) return `${city} · ${country}`;
  if (country) return country;
  if (city) return city;
  return LOCATION_FALLBACK.label;
}

function readCache(): VisitorLocation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as CachePayload;
    if (!data?.label || Date.now() - data.at > CACHE_MS) return null;
    return { city: data.city, country: data.country, label: data.label };
  } catch {
    return null;
  }
}

function writeCache(loc: VisitorLocation) {
  try {
    const payload: CachePayload = { ...loc, at: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota */
  }
}

async function fetchJson(
  url: string,
  parentSignal: AbortSignal,
): Promise<Record<string, unknown>> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  const timer = window.setTimeout(abort, FETCH_MS);
  parentSignal.addEventListener("abort", abort, { once: true });

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`geo ${res.status}`);
    return (await res.json()) as Record<string, unknown>;
  } finally {
    window.clearTimeout(timer);
    parentSignal.removeEventListener("abort", abort);
  }
}

/**
 * Approximate visitor city/country via IP (no GPS prompt).
 * Non-blocking: timeout + abort; fallback studio base; session cache of successes only.
 */
export function useVisitorLocation(): {
  location: VisitorLocation | null;
  loading: boolean;
} {
  // Always start empty so SSR HTML matches the first client paint.
  // sessionStorage is read after mount — otherwise a cached city hydrates
  // over "Detectando ubicación…" and Next shows a runtime overlay.
  const [location, setLocation] = useState<VisitorLocation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setLocation(cached);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    let cancelled = false;

    const run = async () => {
      try {
        const data = await fetchJson("https://ipapi.co/json/", controller.signal);
        if (data.error) throw new Error("geo api error");
        const city = typeof data.city === "string" ? data.city.trim() || null : null;
        const country =
          typeof data.country_name === "string"
            ? data.country_name.trim() || null
            : typeof data.country === "string"
              ? data.country.trim() || null
              : null;
        const next: VisitorLocation = {
          city,
          country,
          label: buildLabel(city, country),
        };
        if (!cancelled) {
          setLocation(next);
          writeCache(next);
        }
      } catch {
        if (controller.signal.aborted && cancelled) return;
        try {
          const data2 = await fetchJson("https://ipwho.is/", controller.signal);
          if (data2.success === false) throw new Error("geo2 error");
          const city = typeof data2.city === "string" ? data2.city.trim() || null : null;
          const country =
            typeof data2.country === "string" ? data2.country.trim() || null : null;
          const next: VisitorLocation = {
            city,
            country,
            label: buildLabel(city, country),
          };
          if (!cancelled) {
            setLocation(next);
            writeCache(next);
          }
        } catch {
          // Do not cache fallback — allow a later session to retry
          if (!cancelled) setLocation(LOCATION_FALLBACK);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void run();
    return () => {
      cancelled = true;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-once lookup
  }, []);

  return { location, loading };
}
