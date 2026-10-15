import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Slim bar under the navbar that fills as the article is read.
 * @param target ref of the article element
 */
export default function ReadingProgress({ target }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start 70%", "end 45%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  const opacity = useTransform(scrollYProgress, [0, 0.02, 1], [0, 1, 1]);

  if (reduced) return null;
  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity }}
      className="pointer-events-none fixed inset-x-0 top-[72px] z-40 h-1 bg-ink/5"
    >
      <motion.div
        style={{ scaleX: smooth }}
        className="h-full origin-left bg-gradient-to-r from-mint-strong to-purple"
      />
    </motion.div>
  );
}
