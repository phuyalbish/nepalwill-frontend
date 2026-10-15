import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Number that counts up the first time it scrolls into view.
 * @param {number} to          target value
 * @param {number} from        start value (default 0)
 * @param {number} duration    seconds (default 1.6)
 * @param {string} prefix/suffix  e.g. suffix="+"
 * @param {number} decimals    fraction digits
 * Final value is rendered immediately under reduced motion. Style it via className.
 */
export default function CountUp({
  to,
  from = 0,
  duration = 1.6,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const target = Number(to) || 0;

  const format = (v) =>
    `${prefix}${v.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (reduced || !inView) {
      node.textContent = format(reduced ? target : from);
      return undefined;
    }
    const controls = animate(from, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = format(v);
      },
    });
    return () => controls.stop();
    // format is derived from the primitive props listed here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, target, from, duration, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {format(from)}
    </span>
  );
}
