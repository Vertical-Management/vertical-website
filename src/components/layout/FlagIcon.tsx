import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { asset } from "@/lib/assets";
import { cn } from "@/lib/utils";

type FlagIconProps = {
  locale: Locale;
  className?: string;
  title?: string;
  /** Pixel size of the circular flag (default 28). */
  size?: number;
};

/** Round flag PNGs from recursos/BANDERAS → /assets/banderas. */
const FLAG_SRC: Record<Locale, string> = {
  es: "/assets/banderas/espana.png",
  ca: "/assets/banderas/andorra.png",
  en: "/assets/banderas/estados-unidos.png",
  fr: "/assets/banderas/francia.png",
};

/**
 * Circular country flags (assets are already round).
 * ES → España · CA → Andorra · EN → USA · FR → Francia
 */
export function FlagIcon({
  locale,
  className,
  title,
  size = 28,
}: FlagIconProps) {
  const src = FLAG_SRC[locale];
  if (!src) return null;

  return (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden rounded-full",
        className,
      )}
      style={{ width: size, height: size }}
      title={title}
    >
      <Image
        src={asset(src)}
        alt={title ?? ""}
        width={size}
        height={size}
        className="h-full w-full object-cover object-center"
        sizes={`${size}px`}
        unoptimized
        priority={false}
      />
    </span>
  );
}
