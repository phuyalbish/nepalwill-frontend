import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import CountUp from "@/components/ui/CountUp";
import { useGetSiteQuery } from "@/api/nepalwillApi";
import { findStat } from "@/lib/stats";

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
 * Auto-advancing hero carousel (5s). Pauses on mouse hover and on focus, has an explicit pause/play
 * toggle, and never auto-advances under reduced motion. Touch taps do not pause it (pointerType is
 * checked). Pill dots are buttons; the active one is a wide mint pill.
 * @param {{src:string, alt:string}[]} slides
 */
export default function HeroCarousel({ slides }) {
  const reduced = useReducedMotion();
  const { data: site } = useGetSiteQuery();
  const students = findStat(site?.stats, "students-impacted");
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const paused = hovered || focused || stopped;
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
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
      onFocus={(e) => setFocused(!e.target.closest("[data-carousel-toggle]"))}
      onBlur={() => setFocused(false)}
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
          <CountUp to={students ? students.value : 500} suffix={students ? students.suffix : "+"} />
        </p>
        <p className="mt-1 text-sm tracking-wide text-ink-700">Students Impacted</p>
      </motion.div>

      <div className="relative mt-6 flex items-center justify-center gap-2.5">
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
        {count > 1 && !reduced && (
          <button
            type="button"
            data-carousel-toggle=""
            aria-pressed={stopped}
            aria-label="Pause slideshow"
            onClick={() => setStopped((v) => !v)}
            className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:bg-sage-50"
          >
            {stopped ? (
              <Play className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Pause className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
