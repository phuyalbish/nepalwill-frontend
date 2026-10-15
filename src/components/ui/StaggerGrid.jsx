import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/**
 * Grid container that staggers its StaggerItem children in when scrolled into view.
 * Put grid classes on className (e.g. "grid gap-6 md:grid-cols-2 lg:grid-cols-3").
 * @param {number} stagger  seconds between children (default 0.08)
 * @param {number} delay    seconds before the first child
 */
export default function StaggerGrid({ stagger = 0.08, delay = 0, className, children, ...rest }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Child of StaggerGrid. Fades and rises 24px (opacity only when reduced motion is on). */
export function StaggerItem({ className, children, ...rest }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
