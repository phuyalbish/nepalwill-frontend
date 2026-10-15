import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useGetSiteQuery } from "@/api/nepalwillApi";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { EASE_OUT } from "@/lib/motion";
import fallback from "@/assets/ctaSmallImg.png";

const HEADLINE = "Empower students to succeed in a global environment.";

/** Full-width image band with scroll-linked parallax and a word by word headline. */
export default function Impact() {
  const reduced = useReducedMotion();
  const { data } = useGetSiteQuery();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1.15, 1.05]);
  const gallery = data?.gallery ?? [];
  const src = gallery[4]?.image_url || gallery[0]?.image_url || fallback;

  return (
    <section
      id="impact"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden bg-ink py-24 text-white md:py-36"
    >
      <motion.div
        aria-hidden="true"
        className={reduced ? "absolute inset-0" : "absolute inset-x-0 -inset-y-[16%]"}
        style={reduced ? undefined : { y, scale, willChange: "transform" }}
      >
        <ImageWithFallback src={src} alt="" width={1600} className="h-full w-full" />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/35"
      />

      <div className="container-page relative z-10 flex flex-col items-start gap-6">
        <Eyebrow tone="mint">Global impact</Eyebrow>
        <h2 className="h-section max-w-3xl !text-white">
          <span className="sr-only">{HEADLINE}</span>
          {HEADLINE.split(" ").map((word, i) => (
            <Fragment key={`${word}-${i}`}>
              {/* Real text node between words: a trailing space inside an inline-block collapses. */}
              {i > 0 && " "}
              <span
                aria-hidden="true"
                className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom"
              >
                <motion.span
                  className="inline-block"
                  initial={reduced ? { opacity: 0 } : { y: "115%" }}
                  whileInView={reduced ? { opacity: 1 } : { y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.7, ease: EASE_OUT, delay: i * 0.08 }}
                >
                  {word}
                </motion.span>
              </span>
            </Fragment>
          ))}
        </h2>
        <p className="max-w-xl text-lg leading-8 text-white/75">
          NepalWill equips students with the skills, knowledge and confidence to compete and excel
          on a global stage through hands-on education and digital empowerment.
        </p>
        <Button to="/contact" size="lg" magnetic arrow className="mt-2">
          Get Involved
        </Button>
      </div>
    </section>
  );
}
