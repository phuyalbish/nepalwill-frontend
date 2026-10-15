import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";
import Eyebrow from "./Eyebrow";

function Words({ text, className, startIndex, reduced }) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((word, i) => (
      <span
        key={`${word}-${i}`}
        className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
        aria-hidden="true"
      >
        <motion.span
          className={cn("inline-block", className)}
          initial={reduced ? { opacity: 0 } : { y: "115%" }}
          whileInView={reduced ? { opacity: 1 } : { y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: (startIndex + i) * 0.06 }}
        >
          {word}
          {" "}
        </motion.span>
      </span>
    ));
}

/**
 * Eyebrow + heading with a word-by-word mask reveal + optional subtitle.
 * @param {string} eyebrow    small uppercase label
 * @param {string} title      heading text (plain string)
 * @param {string} accent     optional trailing words rendered in purple italic serif (e.g. "story.")
 * @param {string} subtitle   muted paragraph under the heading
 * @param {'center'|'left'} align
 * @param {'h1'|'h2'|'h3'} as heading tag; h1 uses the larger .h-display scale
 * @param {'light'|'dark'} tone  'dark' for dark gradient sections (white heading, mint eyebrow)
 */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  align = "center",
  as: Tag = "h2",
  tone = "light",
  className,
}) {
  const reduced = useReducedMotion();
  const dark = tone === "dark";
  const titleWords = title ? title.split(/\s+/).filter(Boolean).length : 0;
  const plain = [title, accent].filter(Boolean).join(" ");

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={dark ? "mint" : "purple"}>{eyebrow}</Eyebrow>}
      <Tag className={cn(Tag === "h1" ? "h-display" : "h-section", dark && "!text-white")}>
        <span className="sr-only">{plain}</span>
        {title && <Words text={title} startIndex={0} reduced={reduced} />}
        {accent && (
          <Words
            text={accent}
            startIndex={titleWords}
            reduced={reduced}
            className="italic text-purple"
          />
        )}
      </Tag>
      {subtitle && (
        <motion.p
          className={cn(
            "max-w-2xl text-base leading-7 md:text-lg md:leading-8",
            dark ? "text-white/70" : "text-muted",
          )}
          initial={{ opacity: 0, y: reduced ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
