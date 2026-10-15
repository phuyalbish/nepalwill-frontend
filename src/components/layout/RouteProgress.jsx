import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

/** Thin mint-to-purple bar that sweeps across the top on every route change. */
export default function RouteProgress() {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <motion.div
      key={pathname}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[61] h-[3px] origin-left bg-gradient-to-r from-mint-strong via-purple to-mint-strong"
      initial={{ scaleX: 0, opacity: 1 }}
      animate={{ scaleX: [0, 0.65, 1], opacity: [1, 1, 0] }}
      transition={{ duration: 0.8, times: [0, 0.5, 1], ease: "easeOut" }}
    />
  );
}
