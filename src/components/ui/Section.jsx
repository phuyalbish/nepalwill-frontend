import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

const TONES = {
  default: "",
  white: "bg-white",
  sage: "bg-sage-50/70",
  dark: "bg-ink-gradient text-white",
};

/**
 * Page section with a whileInView fade-up and a anchor id.
 * @param {string} id          anchor target (scroll-margin accounts for the sticky navbar)
 * @param {'default'|'white'|'sage'|'dark'} tone  background
 * @param {boolean} contained  wrap children in .container-page (default true); false for full-bleed
 * @param {boolean} padded     vertical padding 72px mobile / 120px desktop (default true)
 * @param {boolean} reveal     fade-up on enter (default true)
 * @param {string} containerClassName  extra classes for the inner container
 */
export default function Section({
  id,
  tone = "default",
  contained = true,
  padded = true,
  reveal = true,
  className,
  containerClassName,
  children,
  ...rest
}) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      id={id}
      className={cn(
        "relative scroll-mt-24",
        padded && "py-[72px] md:py-[120px]",
        TONES[tone],
        className,
      )}
      initial={reveal ? { opacity: 0, y: reduced ? 0 : 24 } : false}
      whileInView={reveal ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      {...rest}
    >
      {contained ? (
        <div className={cn("container-page", containerClassName)}>{children}</div>
      ) : (
        children
      )}
    </motion.section>
  );
}
