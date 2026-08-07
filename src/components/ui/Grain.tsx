import { cn } from "@/lib/utils";

type GrainProps = {
  className?: string;
  /** Raise opacity slightly for darker sections */
  strong?: boolean;
};

/** Film grain overlay — place inside a `relative` parent. */
export function Grain({ className, strong }: GrainProps) {
  return (
    <div
      className={cn("grain", strong && "opacity-[0.08]", className)}
      aria-hidden
    />
  );
}
