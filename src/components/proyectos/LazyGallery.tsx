"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/assets";
import { isGifSrc, isVideoSrc, posterForVideo } from "@/lib/media";
import { cn } from "@/lib/utils";

type LazyGalleryProps = {
  images: string[];
  title: string;
  /** How many items to mount initially */
  initialCount?: number;
  loadMoreLabel?: string;
};

function GalleryVideo({
  src,
  title,
  index,
  priority,
}: {
  src: string;
  title: string;
  index: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const poster = posterForVideo(src);

  // Play only when in viewport — saves decode/bandwidth
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.play().catch(() => {
              /* autoplay policies */
            });
          } else {
            el.pause();
          }
        }
      },
      { rootMargin: "120px 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      muted
      loop
      playsInline
      preload={priority ? "metadata" : "none"}
      poster={poster ? asset(poster) : undefined}
      aria-label={`${title} — loop ${index + 1}`}
    >
      <source src={asset(src)} type="video/mp4" />
    </video>
  );
}

/**
 * Progressive project gallery — images + video loops.
 * Avoids mounting every heavy media item at once.
 */
export function LazyGallery({
  images,
  title,
  initialCount = 3,
  loadMoreLabel = "Load more",
}: LazyGalleryProps) {
  const [visibleCount, setVisibleCount] = useState(Math.min(initialCount, images.length));
  const sentinelRef = useRef<HTMLDivElement>(null);

  const shown = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisibleCount((c) => Math.min(c + 2, images.length));
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, images.length, visibleCount]);

  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((src, i) => {
          const video = isVideoSrc(src);
          const gif = isGifSrc(src);
          const wide = i % 5 === 0;
          return (
            <li key={`${src}-${i}`} className={cn(wide && "sm:col-span-2 lg:col-span-2")}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border bg-paper-dim">
                {video ? (
                  <GalleryVideo src={src} title={title} index={i} priority={i < 2} />
                ) : (
                  <Image
                    src={asset(src)}
                    alt={`${title} — frame ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-cinematic ease-out-expo hover:scale-105"
                    sizes={
                      wide
                        ? "(max-width: 768px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, 33vw"
                    }
                    loading={i < 2 ? "eager" : "lazy"}
                    unoptimized={gif}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {hasMore ? (
        <div ref={sentinelRef} className="mt-8 flex flex-col items-center gap-3">
          <p className="tracking-label font-mono text-[0.65rem] uppercase text-ink-muted">
            {visibleCount} / {images.length} frames
          </p>
          <button
            type="button"
            data-cursor="hover"
            onClick={() => setVisibleCount((c) => Math.min(c + 3, images.length))}
            className="tracking-label inline-flex h-11 items-center rounded-pill border border-border-strong px-6 font-mono text-xs uppercase transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            {loadMoreLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
}
