"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { getCarouselRows, type CarouselTile } from "@/data/carousel";
import { useMediaBudget } from "@/hooks/useMediaBudget";
import { asset } from "@/lib/assets";
import { cn } from "@/lib/utils";

type HeroWallCarouselProps = {
  className?: string;
};

type TileHandle = {
  id: string;
  el: HTMLElement;
  kind: CarouselTile["kind"];
  score: number;
};

/** Max simultaneous video decoders — hard cap for 60 FPS scroll */
const MAX_VIDEOS_DESKTOP = 4;
const MAX_VIDEOS_MOBILE = 2;

/**
 * Club-18 hero wall — continuous left scroll with budgeted media.
 *
 * Performance contract:
 * - CSS transform marquee only (no top/left)
 * - IntersectionObserver for video activation (no 100ms getBoundingClientRect poll)
 * - Concurrent video hard-cap + score by visible area
 * - Poster always underneath; video crossfades in (opacity 400ms)
 * - content-visibility + contain on tiles
 * - Pause animation when wall leaves viewport / reduced motion / staticOnly
 */
export function HeroWallCarousel({ className }: HeroWallCarouselProps) {
  const rows = useMemo(() => getCarouselRows(), []);
  const { staticOnly, maxVideos } = useMediaBudget({
    desktop: MAX_VIDEOS_DESKTOP,
    mobile: MAX_VIDEOS_MOBILE,
  });
  const wallRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef(new Map<string, TileHandle>());
  const candidatesRef = useRef(new Set<string>());
  const [activeIds, setActiveIds] = useState<Set<string>>(() => new Set());
  const [wallInView, setWallInView] = useState(true);

  const register = useCallback((handle: TileHandle | null, id: string) => {
    if (!handle) {
      tilesRef.current.delete(id);
      candidatesRef.current.delete(id);
    } else {
      tilesRef.current.set(id, handle);
    }
  }, []);

  // Pause marquee work when hero is off-screen
  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setWallInView(!!entry?.isIntersecting);
      },
      { root: null, threshold: 0.02, rootMargin: "80px 0px" },
    );
    io.observe(wall);
    return () => io.disconnect();
  }, []);

  // Score only near-viewport video tiles. CSS marquee needs a light poll;
  // IO keeps the candidate set small so we do not read 32 rects every tick.
  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;

    let raf = 0;
    let running = true;
    let ticks = 0;
    const mobile =
      typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
    const sampleMs = staticOnly || !wallInView ? 2000 : mobile ? 480 : 250;
    const fullScanEvery = mobile ? 6 : 8;

    const pickActive = (forceFull = false) => {
      if (!running) return;

      if (staticOnly || !wallInView) {
        candidatesRef.current.clear();
        setActiveIds((prev) => (prev.size ? new Set() : prev));
        return;
      }

      ticks += 1;
      const scanAll = forceFull || ticks % fullScanEvery === 1;

      const wr = wall.getBoundingClientRect();
      const clipL = Math.max(wr.left, 0);
      const clipR = Math.min(wr.right, window.innerWidth);
      const clipT = Math.max(wr.top, 0);
      const clipB = Math.min(wr.bottom, window.innerHeight);
      const viewW = Math.max(1, clipR - clipL);
      const viewH = Math.max(1, clipB - clipT);

      const ranked: { id: string; score: number }[] = [];
      const nextCandidates = scanAll ? new Set<string>() : candidatesRef.current;

      tilesRef.current.forEach((handle, id) => {
        if (handle.kind !== "video" || !handle.el.isConnected) return;
        if (!scanAll && !candidatesRef.current.has(id)) return;

        const r = handle.el.getBoundingClientRect();
        const left = Math.max(r.left, clipL);
        const right = Math.min(r.right, clipR);
        const top = Math.max(r.top, clipT);
        const bottom = Math.min(r.bottom, clipB);
        const w = right - left;
        const h = bottom - top;
        if (w <= 0 || h <= 0) {
          if (scanAll) return;
          candidatesRef.current.delete(id);
          return;
        }

        if (scanAll) nextCandidates.add(id);
        // Prefer larger on-screen coverage + prefer center of wall
        const area = (w * h) / (viewW * viewH);
        const cx = (left + right) / 2;
        const mid = (clipL + clipR) / 2;
        const centerBias = 1 - Math.min(1, Math.abs(cx - mid) / viewW);
        ranked.push({ id, score: area * 0.7 + centerBias * 0.3 });
      });

      if (scanAll) candidatesRef.current = nextCandidates;

      ranked.sort((a, b) => b.score - a.score);
      const next = new Set(ranked.slice(0, maxVideos).map((r) => r.id));

      setActiveIds((prev) => {
        if (prev.size === next.size) {
          let same = true;
          next.forEach((id) => {
            if (!prev.has(id)) same = false;
          });
          if (same) return prev;
        }
        return next;
      });
    };

    const schedule = (forceFull = false) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        pickActive(forceFull);
      });
    };

    const ioTiles = new IntersectionObserver(
      (entries) => {
        let changed = false;
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.wallId;
          if (!id) continue;
          if (entry.isIntersecting) {
            if (!candidatesRef.current.has(id)) {
              candidatesRef.current.add(id);
              changed = true;
            }
          } else if (candidatesRef.current.delete(id)) {
            changed = true;
          }
        }
        if (changed) schedule();
      },
      { root: null, rootMargin: "80px 120px", threshold: 0 },
    );

    tilesRef.current.forEach((handle) => {
      if (handle.kind === "video" && handle.el.isConnected) {
        ioTiles.observe(handle.el);
      }
    });

    pickActive(true);
    const timer = window.setInterval(() => schedule(), sampleMs);

    return () => {
      running = false;
      ioTiles.disconnect();
      window.clearInterval(timer);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [staticOnly, wallInView, maxVideos]);

  return (
    <div
      ref={wallRef}
      className={cn(
        "absolute inset-0 flex flex-col overflow-hidden bg-ink",
        // Isolate paints from page scroll
        "[contain:strict]",
        className,
      )}
      aria-hidden
    >
      {rows.map((tiles, rowIndex) => (
        <MarqueeRow
          key={rowIndex}
          rowIndex={rowIndex}
          tiles={tiles}
          durationSec={36 + rowIndex * 8}
          staticOnly={staticOnly}
          running={wallInView && !staticOnly}
          activeIds={activeIds}
          register={register}
        />
      ))}
    </div>
  );
}

function MarqueeRow({
  rowIndex,
  tiles,
  durationSec,
  staticOnly,
  running,
  activeIds,
  register,
}: {
  rowIndex: number;
  tiles: CarouselTile[];
  durationSec: number;
  staticOnly: boolean;
  running: boolean;
  activeIds: Set<string>;
  register: (handle: TileHandle | null, id: string) => void;
}) {
  const track = useMemo(() => [...tiles, ...tiles], [tiles]);

  return (
    <div
      className="relative h-1/3 min-h-0 w-full overflow-hidden"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 33vh" }}
    >
      <div
        className={cn(
          "hero-wall-track flex h-full w-max",
          running && "hero-wall-track--running",
        )}
        style={
          {
            ["--wall-duration" as string]: `${durationSec}s`,
          } as CSSProperties
        }
      >
        {track.map((tile, i) => {
          const id = `r${rowIndex}-i${i}-${tile.src}`;
          return (
            <Tile
              key={id}
              id={id}
              tile={tile}
              lcp={rowIndex === 0 && i === 0}
              eagerStill={rowIndex === 0 && i === 0}
              allowVideo={!staticOnly && activeIds.has(id)}
              register={register}
            />
          );
        })}
      </div>
    </div>
  );
}

function Tile({
  id,
  tile,
  lcp,
  eagerStill,
  allowVideo,
  register,
}: {
  id: string;
  tile: CarouselTile;
  lcp?: boolean;
  eagerStill?: boolean;
  allowVideo: boolean;
  register: (handle: TileHandle | null, id: string) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [nearView, setNearView] = useState(!!lcp || !!eagerStill);
  const src = asset(tile.src);
  const poster = tile.poster ? asset(tile.poster) : undefined;
  const stillSrc = tile.kind === "video" ? (poster ?? null) : src;
  const alt = tile.alt?.trim() ? tile.alt : "";

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    register({ id, el, kind: tile.kind, score: 0 }, id);
    return () => register(null, id);
  }, [id, register, tile.kind]);

  // Lazy stills: only mark near-view when approaching viewport
  useEffect(() => {
    const el = rootRef.current;
    if (!el || lcp || eagerStill) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNearView(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin: "200px 120px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [lcp, eagerStill]);

  // Play/pause with crossfade gate
  useEffect(() => {
    if (!allowVideo || tile.kind !== "video") {
      setVideoReady(false);
      const v = videoRef.current;
      if (v) {
        try {
          v.pause();
        } catch {
          /* ignore */
        }
      }
      return;
    }

    const v = videoRef.current;
    if (!v) return;

    let cancelled = false;
    let tries = 0;

    const kick = () => {
      if (cancelled || !v) return;
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          if (!cancelled) setVideoReady(true);
        }).catch(() => {
          if (cancelled || tries > 8) return;
          tries += 1;
          window.setTimeout(kick, 180 * tries);
        });
      }
    };

    const onReady = () => {
      if (!cancelled) setVideoReady(true);
    };

    v.addEventListener("loadeddata", kick);
    v.addEventListener("canplay", kick);
    v.addEventListener("playing", onReady);

    const t0 = window.requestAnimationFrame(kick);
    const t1 = window.setTimeout(kick, 120);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(t0);
      window.clearTimeout(t1);
      v.removeEventListener("loadeddata", kick);
      v.removeEventListener("canplay", kick);
      v.removeEventListener("playing", onReady);
      try {
        v.pause();
      } catch {
        /* ignore */
      }
    };
  }, [allowVideo, tile.kind]);

  return (
    <div
      ref={rootRef}
      data-wall-id={id}
      className="hero-wall-tile relative aspect-square h-full shrink-0 overflow-hidden bg-ink"
      style={{
        aspectRatio: "1 / 1",
        height: "100%",
        width: "auto",
        contentVisibility: nearView ? "visible" : "auto",
      }}
    >
      {stillSrc && nearView ? (
        <Image
          src={stillSrc}
          alt={alt}
          fill
          sizes="33vh"
          quality={68}
          priority={!!lcp}
          loading={eagerStill || lcp ? "eager" : "lazy"}
          className="object-cover object-center"
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 bg-ink" />
      )}

      {tile.kind === "video" && allowVideo ? (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center",
            // Soft crossfade over poster — no hard pop
            "hero-wall-video",
            videoReady ? "hero-wall-video--ready" : "hero-wall-video--boot",
          )}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          draggable={false}
          tabIndex={-1}
          aria-hidden
        />
      ) : null}
    </div>
  );
}
