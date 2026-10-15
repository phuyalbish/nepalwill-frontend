import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

/**
 * Animated progress bar (fills from the left when scrolled into view).
 * @param {number} value
 * @param {number} max           default 100
 * @param {string} label         text on the left
 * @param {string|null} valueLabel text on the right: undefined = default "value / max", null = hidden
 * @param {'mint'|'purple'} tone
 */
export default function ProgressBar({
  value,
  max = 100,
  label,
  valueLabel,
  tone = "mint",
  className,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduced = useReducedMotion();
  const pct = Math.min(Math.max(max > 0 ? value / max : 0, 0), 1);
  const rightText = valueLabel === undefined ? `${value} / ${max}` : valueLabel;

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {(label || rightText !== null) && (
        <div className="mb-2 flex items-baseline justify-between gap-3 text-sm">
          <span className="font-medium text-ink">{label}</span>
          {rightText !== null && <span className="text-muted">{rightText}</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className="h-2.5 w-full overflow-hidden rounded-pill bg-ink/5"
      >
        <motion.div
          className={cn(
            "h-full origin-left rounded-pill",
            tone === "purple" ? "bg-purple" : "bg-gradient-to-r from-mint to-mint-strong",
          )}
          initial={{ scaleX: reduced ? pct : 0 }}
          animate={{ scaleX: inView || reduced ? pct : 0 }}
          transition={{ duration: 1.1, ease: EASE_OUT }}
        />
      </div>
    </div>
  );
}
