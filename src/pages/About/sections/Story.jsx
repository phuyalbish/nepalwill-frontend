import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const STEPS = [
  {
    label: "2015",
    title: "A first computer class",
    text: "NepalWill began in Kirtipur with two secondhand laptops and a borrowed table.",
  },
  {
    label: "Growing",
    title: "More programs, more schools",
    text: "Digital literacy was joined by English, science, arts, leadership and health, across 14 government and community schools.",
  },
  {
    label: "Today",
    title: "Powered by gifts in kind",
    text: "Volunteers at home and abroad teach on donated equipment, and every item is logged from donor to classroom.",
  },
];

/** Vertical timeline whose line draws itself as the section scrolls. */
export default function Story() {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="story" tone="white">
      <SectionHeading
        eyebrow="Our story"
        title="Our story, since"
        accent="2015."
        subtitle="From one classroom table to a network of schools, one donated item at a time."
      />
      <ol ref={ref} className="relative mx-auto mt-14 flex max-w-2xl flex-col gap-12 md:mt-20">
        <span aria-hidden="true" className="absolute bottom-2 left-[19px] top-2 w-0.5 bg-ink/10" />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-2 left-[19px] top-2 w-0.5 origin-top bg-gradient-to-b from-mint-strong to-purple"
          style={{ scaleY: reduced ? 1 : scaleY }}
        />
        {STEPS.map((step) => (
          <li key={step.label} className="relative flex gap-6">
            <span
              aria-hidden="true"
              className="relative z-10 mt-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint ring-8 ring-white"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-ink" />
            </span>
            <div>
              <p className="eyebrow">{step.label}</p>
              <h3 className="mt-1 font-display text-3xl text-ink">{step.title}</h3>
              <p className="mt-2 leading-7 text-ink-700">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
