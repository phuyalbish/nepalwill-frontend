import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Fixed 3px mint-to-purple hairline at the top of the viewport showing page scroll progress. */
export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-mint to-purple"
      style={{ scaleX: reduced ? scrollYProgress : smooth }}
    />
  );
}
