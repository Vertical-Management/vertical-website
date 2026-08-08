"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
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
};

const POLL_MS = 100;
/** Stay active briefly after last pixel leaves (anti thrash at edges) */
const HOLD_MS = 280;

/**
 * Club-18 hero wall — continuous left scroll, reliable video loops.
 *
 * - Posters always underneath (instant paint)
 * - Videos autoplay when ≥1px visible (option A)
 * - No opacity gate (frozen posters bug on prod)
 * - Marquee always runs after first paint
 */
export function HeroWallCarousel({ className }: HeroWallCarouselProps) {
  const rows = useMemo(() => getCarouselRows(), []);
  const { staticOnly } = useMediaBudget();
  const wallRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef(new Map<string, TileHandle>());
  const lastSeenRef = useRef(new Map<string, number>());
  const [activeIds, setActiveIds] = useState<Set<string>>(() => new Set());

  const register = useCallback((handle: TileHandle | null, id: string) => {
    if (!handle) tilesRef.current.delete(id);
    else tilesRef.current.set(id, handle);
  }, []);

  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;

    const sync = () => {
      if (staticOnly) {
        lastSeenRef.current.clear();
        setActiveIds((prev) => (prev.size ? new Set() : prev));
        return;
      }

      const now = performance.now();
      const wr = wall.getBoundingClientRect();
      const clipL = Math.max(wr.left, 0);
      const clipR = Math.min(wr.right, window.innerWidth);
      const clipT = Math.max(wr.top, 0);
      const clipB = Math.min(wr.bottom, window.innerHeight);

      const visible = new Set<string>();

      tilesRef.current.forEach((handle, id) => {
        if (handle.kind !== "video" || !handle.el.isConnected) return;
        const r = handle.el.getBoundingClientRect();
        const left = Math.max(r.left, clipL);
        const right = Math.min(r.right, clipR);
        const top = Math.max(r.top, clipT);
        const bottom = Math.min(r.bottom, clipB);
        if (right > left && bottom > top) {
          visible.add(id);
          lastSeenRef.current.set(id, now);
        }
      });

      const next = new Set<string>();
      lastSeenRef.current.forEach((seenAt, id) => {
        if (visible.has(id) || now - seenAt < HOLD_MS) next.add(id);
        else lastSeenRef.current.delete(id);
      });

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

    // Run soon + keep polling (marquee moves continuously)
    const boot1 = window.requestAnimationFrame(sync);
    const boot2 = window.setTimeout(sync, 50);
    const boot3 = window.setTimeout(sync, 200);
    const boot4 = window.setTimeout(sync, 500);
    const timer = window.setInterval(sync, POLL_MS);

    return () => {
      window.cancelAnimationFrame(boot1);
      window.clearTimeout(boot2);
      window.clearTimeout(boot3);
      window.clearTimeout(boot4);
      window.clearInterval(timer);
    };
  }, [staticOnly]);

  return (
    <div
      ref={wallRef}
      className={cn(
        "absolute inset-0 flex flex-col overflow-hidden bg-ink",
        className,
      )}
      aria-hidden
    >
      {rows.map((tiles, rowIndex) => (
        <MarqueeRow
          key={rowIndex}
          rowIndex={rowIndex}
          tiles={tiles}
          durationSec={32 + rowIndex * 7}
          staticOnly={staticOnly}
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
  activeIds,
  register,
}: {
  rowIndex: number;
  tiles: CarouselTile[];
  durationSec: number;
  staticOnly: boolean;
  activeIds: Set<string>;
  register: (handle: TileHandle | null, id: string) => void;
}) {
  const track = useMemo(() => [...tiles, ...tiles], [tiles]);

  return (
    <div className="relative h-1/3 min-h-0 w-full overflow-hidden">
      <div
        className="hero-wall-track hero-wall-track--running flex h-full w-max"
        style={
          {
            ["--wall-duration" as string]: `${durationSec}s`,
          } as React.CSSProperties
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
              eagerStill={rowIndex === 0 && i < 3}
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
  const src = asset(tile.src);
  const poster = tile.poster ? asset(tile.poster) : undefined;
  const stillSrc = tile.kind === "video" ? poster ?? null : src;

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    register({ id, el, kind: tile.kind }, id);
    return () => register(null, id);
  }, [id, register, tile.kind]);

  // Keep trying to play while this tile is allowed (autoplay is flaky on some browsers)
  useEffect(() => {
    if (!allowVideo || tile.kind !== "video") return;
    const v = videoRef.current;
    if (!v) return;

    let cancelled = false;
    let tries = 0;

    const kick = () => {
      if (cancelled || !v) return;
      // Ensure attributes browsers require for autoplay
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {
          if (cancelled || tries > 12) return;
          tries += 1;
          window.setTimeout(kick, 200 * tries);
        });
      }
    };

    const onEnded = () => {
      try {
        v.currentTime = 0;
        kick();
      } catch {
        /* ignore */
      }
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") kick();
    };

    v.addEventListener("loadeddata", kick);
    v.addEventListener("canplay", kick);
    v.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisible);

    // Next paint after mount — ref is live
    const t0 = window.requestAnimationFrame(kick);
    const t1 = window.setTimeout(kick, 100);
    const t2 = window.setTimeout(kick, 400);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      v.removeEventListener("loadeddata", kick);
      v.removeEventListener("canplay", kick);
      v.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisible);
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
      className="relative h-full shrink-0 overflow-hidden bg-ink"
      style={{ width: "max(16.666vw, 33.333vh)" }}
    >
      {stillSrc ? (
        <Image
          src={stillSrc}
          alt=""
          fill
          sizes="17vw"
          priority={!!lcp}
          loading={eagerStill || lcp ? "eager" : "lazy"}
          className="object-cover object-center"
          draggable={false}
        />
      ) : null}

      {tile.kind === "video" && allowVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          draggable={false}
          tabIndex={-1}
        />
      ) : null}
    </div>
  );
}
