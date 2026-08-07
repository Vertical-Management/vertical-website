import type { ServiceTheme } from "@/types";
import { cn } from "@/lib/utils";

/** Map service themes → Tailwind surface + text classes */
export function serviceBlockClasses(theme: ServiceTheme = "paper") {
  switch (theme) {
    case "lime":
      return {
        block: "bg-accent-lime text-ink border-ink",
        muted: "text-ink/60",
        badge: "border-ink/25 text-ink",
        accent: "text-ink",
        number: "text-ink/15",
      };
    case "cool":
      return {
        block: "bg-accent-cool text-ink border-ink",
        muted: "text-ink/65",
        badge: "border-ink/25 text-ink",
        accent: "text-ink",
        number: "text-ink/15",
      };
    case "hot":
      return {
        block: "bg-accent-hot text-paper border-ink",
        muted: "text-paper/75",
        badge: "border-paper/30 text-paper",
        accent: "text-accent-lime",
        number: "text-paper/20",
      };
    case "ink":
      return {
        block: "bg-ink text-paper border-ink",
        muted: "text-paper/60",
        badge: "border-paper/25 text-paper",
        accent: "text-accent-lime",
        number: "text-paper/12",
      };
    default:
      return {
        block: "bg-paper-warm text-ink border-ink",
        muted: "text-ink-muted",
        badge: "border-ink/20 text-ink",
        accent: "text-accent",
        number: "text-ink/10",
      };
  }
}

export function serviceThemeLabel(theme: ServiceTheme = "paper") {
  return cn("theme", theme);
}
