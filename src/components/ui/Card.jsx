import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/**
 * White 16px-radius card with a hairline border and a hover lift.
 * @param {boolean} glow      cursor-follow mint radial highlight
 * @param {boolean} tilt      3D tilt toward the cursor (max 6deg)
 * @param {boolean} hover     lift -4px with the tinted shadow on hover (default true)
 * @param {boolean} selected  2px purple border (selected or active event)
 * @param {string} as         tag, default 'div' (use 'article' for list items)
 * Do not nest a <button> inside a <Link> wrapper; use a stretched link
 * (`<Link className="after:absolute after:inset-0">`) and keep HeartButton above it with relative z-10.
 */
export default function Card({
  as = "div",
  glow = false,
  tilt = false,
  hover = true,
  selected = false,
  className,
  children,
  onMouseMove,
  onMouseLeave,
  ...rest
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rawY, { stiffness: 200, damping: 20 });
  const Tag = motion[as] || motion.div;

  const handleMove = (event) => {
    onMouseMove?.(event);
    const node = ref.current;
    if (!node || reduced || !window.matchMedia(FINE_POINTER).matches) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    if (glow) {
      node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      node.style.setProperty("--my", `${event.clientY - rect.top}px`);
    }
    if (tilt) {
      rawY.set((px - 0.5) * 12);
      rawX.set(-(py - 0.5) * 12);
    }
  };

  const handleLeave = (event) => {
    onMouseLeave?.(event);
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={glow || tilt ? handleMove : onMouseMove}
      onMouseLeave={tilt ? handleLeave : onMouseLeave}
      whileHover={hover && !reduced ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={tilt && !reduced ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className={cn(
        "group/card relative rounded-card border bg-white shadow-soft transition-[box-shadow,border-color] duration-300",
        selected ? "border-2 border-purple" : "border-line",
        hover && "hover:shadow-lift",
        selected && hover && "hover:border-purple",
        className,
      )}
      {...rest}
    >
      {children}
      {glow && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgb(153 242 200 / 0.15), transparent 60%)",
          }}
        />
      )}
    </Tag>
  );
}
