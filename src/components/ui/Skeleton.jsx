import { cn } from "@/lib/cn";

/**
 * Shimmering placeholder block. Size it with className (e.g. "h-48 w-full rounded-card").
 */
export default function Skeleton({ className, ...rest }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-shimmer rounded-chip bg-[linear-gradient(90deg,#e7f2ed_25%,#f6fdfa_50%,#e7f2ed_75%)] bg-[length:200%_100%]",
        className,
      )}
      {...rest}
    />
  );
}

/** A stack of text-line skeletons; the last line is shorter. */
export function SkeletonText({ lines = 3, className }) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)} role="status" aria-label="Loading">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} className={cn("h-3.5", i === lines - 1 ? "w-2/3" : "w-full")} />
      ))}
    </div>
  );
}
