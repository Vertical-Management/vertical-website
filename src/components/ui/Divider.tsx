import { cn } from "@/lib/utils";

type DividerProps = {
  className?: string;
  label?: string;
  vertical?: boolean;
};

export function Divider({ className, label, vertical }: DividerProps) {
  if (label) {
    return (
      <div
        className={cn(
          "flex items-center gap-4 text-ink-muted",
          className,
        )}
        role="separator"
      >
        <span className="h-px flex-1 bg-border" />
        <span className="font-mono text-caption uppercase tracking-label">
          {label}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
    );
  }

  if (vertical) {
    return (
      <div
        className={cn("w-px self-stretch bg-border", className)}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  return (
    <hr
      className={cn("h-px w-full border-0 bg-border", className)}
      role="separator"
    />
  );
}
