import { useEffect, useRef } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Magnetic pull: the element drifts toward the cursor when the pointer is within
 * `radius` px of its box, and springs back outside. No-op on touch and reduced motion.
 * Returns { ref, x, y }: attach ref to the element and pass x/y as motion style.
 */
export function useMagnetic({ enabled = true, radius = 60, strength = 0.35 } = {}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 220, damping: 16, mass: 0.4 });

  useEffect(() => {
    if (!enabled || reduced) return undefined;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return undefined;

    const onMove = (event) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(rect.left - event.clientX, 0, event.clientX - rect.right);
      const dy = Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom);
      if (Math.hypot(dx, dy) <= radius) {
        rawX.set((event.clientX - cx) * strength);
        rawY.set((event.clientY - cy) * strength);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    };
    const reset = () => {
      rawX.set(0);
      rawY.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", reset);
      reset();
    };
  }, [enabled, reduced, radius, strength, rawX, rawY]);

  return { ref, x, y };
}
