import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";
import { STEPS } from "./transparencyData";

/** Line segment from this node down to the next one; it draws itself as the row scrolls past. */
function Segment({ target, reduced }) {
  const { scrollYProgress } = useScroll({ target, offset: ["start 62%", "end 62%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-6 top-12 w-0.5 -translate-x-1/2 rounded-full bg-ink/10"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduced ? 1 : draw }}
        className="absolute bottom-0 left-6 top-12 w-0.5 origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-mint-strong to-purple"
      />
    </>
  );
}

function Step({ step, index, last, reduced }) {
  const rowRef = useRef(null);
  const nodeRef = useRef(null);
  // "Reached" once the node scrolls above the lower 40% of the viewport.
  const reached = useInView(nodeRef, { once: true, margin: "0px 0px -40% 0px" });
  const lit = reached || reduced;
  const Icon = step.icon;

  return (
    <li ref={rowRef} className={cn("relative flex gap-5 md:gap-7", !last && "pb-12")}>
      {!last && <Segment target={rowRef} reduced={reduced} />}
      <div ref={nodeRef} className="relative z-10 h-12 w-12 shrink-0">
        {lit && !reduced && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-mint"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 2.1, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", repeat: 2 }}
          />
        )}
        <span
          className={cn(
            "relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors duration-500",
            lit ? "border-mint-strong bg-mint text-ink" : "border-ink/10 bg-white text-muted",
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <motion.div
        className="pt-1.5"
        initial={{ opacity: 0, y: reduced ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple">Step {index + 1}</p>
        <h3 className="mt-1 text-lg font-bold text-ink md:text-xl">{step.title}</h3>
        <p className="mt-1 max-w-xl leading-7 text-muted">{step.text}</p>
      </motion.div>
    </li>
  );
}

/** Vertical stepper with a scroll-drawn connector and nodes that pulse mint when reached. */
export default function FlowStepper() {
  const reduced = useReducedMotion();
  return (
    <ol className="relative mx-auto max-w-2xl">
      {STEPS.map((step, i) => (
        <Step key={step.title} step={step} index={i} last={i === STEPS.length - 1} reduced={reduced} />
      ))}
    </ol>
  );
}
