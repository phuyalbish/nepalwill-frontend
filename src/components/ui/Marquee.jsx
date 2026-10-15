import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Infinite horizontal marquee. Children are rendered twice for a seamless loop.
 * @param {'left'|'right'} direction  scroll direction
 * @param {number} speed              seconds per full loop (default 40, larger = slower)
 * @param {boolean} pauseOnHover      default true
 * @param {string} gap                tailwind gap class applied between items (default 'gap-6')
 * Under reduced motion the items render once as a static centred wrap.
 */
export default function Marquee({
  direction = "left",
  speed = 40,
  pauseOnHover = true,
  gap = "gap-6",
  className,
  children,
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn("flex flex-wrap justify-center", gap, className)}>{children}</div>;
  }

  const track = cn("flex shrink-0 items-stretch pr-6", gap);
  return (
    <div
      className={cn(
        "group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className={track}>{children}</div>
        <div className={track} aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}
