"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/assets";

type DesktopIconProps = {
  label: string;
  iconSrc?: string;
  emoji?: string;
  selected?: boolean;
  onOpen: () => void;
  onSelect?: () => void;
  className?: string;
};

/**
 * Desktop shortcut — click to open (select on secondary click / focus).
 */
export function DesktopIcon({
  label,
  iconSrc,
  emoji,
  selected,
  onOpen,
  onSelect,
  className,
}: DesktopIconProps) {
  return (
    <button
      type="button"
      data-cursor="hover"
      title={`${label} — clic para abrir`}
      className={cn(
        "group flex w-[88px] flex-col items-center gap-1.5 rounded-md p-2 text-center",
        "outline-none transition-colors duration-fast",
        "focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        selected && "bg-white/20 ring-1 ring-white/40",
        className,
      )}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
        onOpen();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <span
        className={cn(
          "relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg",
          "bg-white/10 shadow-md backdrop-blur-sm transition-transform duration-base ease-out-expo",
          "group-hover:scale-105 group-active:scale-95",
        )}
      >
        {iconSrc ? (
          <Image
            src={asset(iconSrc)}
            alt=""
            width={48}
            height={48}
            className="h-10 w-10 object-contain"
            unoptimized={iconSrc.endsWith(".gif") || iconSrc.endsWith(".svg")}
          />
        ) : (
          <span className="text-2xl" aria-hidden>
            {emoji ?? "📁"}
          </span>
        )}
      </span>
      <span
        className={cn(
          "max-w-full truncate rounded px-1 text-[11px] font-medium leading-tight text-white",
          "drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]",
          selected && "bg-accent/90",
        )}
      >
        {label}
      </span>
    </button>
  );
}
