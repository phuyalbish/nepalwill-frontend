import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import CountUp from "@/components/ui/CountUp";

const INTERVAL_MS = 5000;

/** Crossfading slide with a slow Ken Burns zoom while it is the active one. */
function Slide({ slide, active, priority, reduced }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: reduced ? 0.2 : 1.1, ease: "easeInOut" }}
      aria-hidden={!active}
    >
      <motion.div
        className="h-full w-full"
        initial={false}
        animate={{ scale: active && !reduced ? 1.12 : 1 }}
        transition={
          active && !reduced ? { duration: 8, ease: "linear" } : { duration: 0, delay: 1.2 }
        }
      >
        <ImageWithFallback
          src={slide.src}
          alt={slide.alt}
          priority={priority}
          className="h-full w-full"
        />
      </motion.div>
    </motion.div>
  );
}

/**
 * Auto-advancing hero carousel (5s). Pauses on hover and focus, never auto-advances under
 * reduced motion. Pill dots are buttons; the active one is a wide mint pill.
 * @param {{src:string, alt:string}[]} slides
 */
export default function HeroCarousel({ slides }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const current = count ? active % count : 0;

  useEffect(() => {
    if (reduced || paused || count < 2) return undefined;
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, reduced, count]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Photos from NepalWill classrooms"
        aria-live={paused ? "polite" : "off"}
        className="relative aspect-[4/3] overflow-hidden rounded-hero bg-sage-50 shadow-lift"
      >
        {slides.map((slide, i) => (
          <Slide
            key={slide.src}
            slide={slide}
            active={i === current}
            priority={i === 0}
            reduced={reduced}
          />
        ))}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent"
        />
      </div>

      <motion.div
        className="absolute -bottom-7 left-3 z-10 rounded-2xl border border-white/60 bg-white/70 px-5 py-4 shadow-lift backdrop-blur-xl md:-left-8"
        animate={reduced ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="font-display text-4xl leading-none text-success-strong">
          <CountUp to={500} suffix="+" />
        </p>
        <p className="mt-1 text-sm tracking-wide text-ink-700">Students Impacted</p>
      </motion.div>

      <div className="mt-6 flex items-center justify-center gap-2.5">
        {slides.map((slide, i) => (
          <motion.button
            key={slide.src}
            type="button"
            layout={!reduced}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            style={{ borderRadius: 9999 }}
            aria-label={`Show photo ${i + 1} of ${count}: ${slide.alt}`}
            aria-current={i === current ? "true" : undefined}
            onClick={() => setActive(i)}
            className={cn(
              "relative block h-2.5 before:absolute before:-inset-2.5 before:content-['']",
              i === current ? "w-8 bg-mint-strong" : "w-2.5 bg-ink/15 hover:bg-ink/30",
            )}
          />
        ))}
      </div>
    </div>
  );
}
