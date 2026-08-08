"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
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
  src: string;
  poster?: string;
  kind: CarouselTile["kind"];
};

const VISIBILITY_MS = 220;

/**
 * Club-18 hero wall — 3 seamless rows scrolling left.
 *
 * Performance contract:
 * - Posters always (instant paint, quality preserved)
 * - ≤ maxPlaying live <video> nodes (mounted only while eligible)
 * - CSS marquee pauses when hero offscreen or tab hidden
 * - Save-Data / 2G / reduced-motion → posters only
 */
export function HeroWallCarousel({ className }: HeroWallCarouselProps) {
  const rows = useMemo(() => getCarouselRows(), []);
  const budget = useMediaBudget();
  const wallRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef(new Map<string, TileHandle>());
  const [activeIds, setActiveIds] = useState<Set<string>>(() => new Set());
  const [wallInView, setWallInView] = useState(true);

  const register = useCallback((handle: TileHandle | null, id: string) => {
    if (!handle) {
      tilesRef.current.delete(id);
      return;
    }
    tilesRef.current.set(id, handle);
  }, []);

  // Observe whether the wall is in the viewport at all
  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setWallInView(entry.isIntersecting && entry.intersectionRatio > 0.02);
      },
      { root: null, threshold: [0, 0.02, 0.1, 0.25] },
    );
    io.observe(wall);
    return () => io.disconnect();
  }, []);

  // Pick which tiles may mount a <video>
  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;

    const sync = () => {
      if (
        budget.staticOnly ||
        !budget.visible ||
        !wallInView ||
        budget.maxPlaying <= 0
      ) {
        setActiveIds((prev) => (prev.size === 0 ? prev : new Set()));
        return;
      }

      const wallRect = wall.getBoundingClientRect();
      const ranked: { id: string; area: number }[] = [];

      tilesRef.current.forEach((handle, id) => {
        if (handle.kind !== "video" || !handle.el.isConnected) return;
        const r = handle.el.getBoundingClientRect();
        const left = Math.max(r.left, wallRect.left);
        const right = Math.min(r.right, wallRect.right);
        const top = Math.max(r.top, wallRect.top);
        const bottom = Math.min(r.bottom, wallRect.bottom);
        const area = Math.max(0, right - left) * Math.max(0, bottom - top);
        if (area > 120) ranked.push({ id, area });
      });

      ranked.sort((a, b) => b.area - a.area);
      const next = new Set(
        ranked.slice(0, budget.maxPlaying).map((item) => item.id),
      );

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

    const timer = window.setInterval(sync, VISIBILITY_MS);
    const boot = window.setTimeout(sync, 80);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(boot);
    };
  }, [budget.staticOnly, budget.visible, budget.maxPlaying, wallInView]);

  const paused =
    budget.staticOnly || !budget.visible || !wallInView;

  return (
    <div
      ref={wallRef}
      className={cn(
        "absolute inset-0 flex flex-col overflow-hidden bg-ink",
        className,
      )}
      aria-hidden
      data-wall-paused={paused ? "true" : "false"}
    >
      {rows.map((tiles, rowIndex) => (
        <MarqueeRow
          key={rowIndex}
          rowIndex={rowIndex}
          tiles={tiles}
          durationSec={32 + rowIndex * 7}
          paused={paused}
          staticOnly={budget.staticOnly}
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
  paused,
  staticOnly,
  activeIds,
  register,
}: {
  rowIndex: number;
  tiles: CarouselTile[];
  durationSec: number;
  paused: boolean;
  staticOnly: boolean;
  activeIds: Set<string>;
  register: (handle: TileHandle | null, id: string) => void;
}) {
  // Seamless loop: duplicate track once
  const track = useMemo(() => [...tiles, ...tiles], [tiles]);

  return (
    <div className="relative h-1/3 min-h-0 w-full overflow-hidden">
      <div
        className={cn(
          "hero-wall-track flex h-full w-max",
          paused && "hero-wall-track--paused",
        )}
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
              // Single LCP candidate: first still of first row only
              lcp={rowIndex === 0 && i === 0}
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
  allowVideo,
  register,
}: {
  id: string;
  tile: CarouselTile;
  lcp?: boolean;
  allowVideo: boolean;
  register: (handle: TileHandle | null, id: string) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = asset(tile.src);
  const poster = tile.poster ? asset(tile.poster) : undefined;
  const stillSrc = tile.kind === "video" ? poster ?? null : src;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    register(
      {
        id,
        el,
        src: tile.src,
        poster: tile.poster,
        kind: tile.kind,
      },
      id,
    );
    return () => register(null, id);
  }, [id, register, tile.src, tile.poster, tile.kind]);

  // Play/pause only the mounted video node
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !allowVideo) return;

    const play = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    play();

    const onEnded = () => {
      try {
        v.currentTime = 0;
        play();
      } catch {
        /* ignore */
      }
    };
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("ended", onEnded);
      try {
        v.pause();
      } catch {
        /* ignore */
      }
    };
  }, [allowVideo]);

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
          className="object-cover object-center"
          draggable={false}
        />
      ) : null}

      {/* Mount video ONLY when this tile is in the active decode budget */}
      {tile.kind === "video" && allowVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          draggable={false}
          tabIndex={-1}
        />
      ) : null}
    </div>
  );
}
