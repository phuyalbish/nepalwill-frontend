import { motion, useReducedMotion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { EASE_OUT } from "@/lib/motion";
import { CATEGORY_LABEL } from "./storyUtils";

/** Full-width hero: image, scrim, category badge and the title in Instrument Serif. */
export default function ArticleHero({ story }) {
  const reduced = useReducedMotion();
  return (
    <div className="relative isolate flex min-h-[340px] items-end overflow-hidden rounded-hero bg-ink md:min-h-[480px]">
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback
          src={story.image_url}
          alt={`Cover image for ${story.title}`}
          priority
          className="h-full w-full"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-scrim" />
      <motion.div
        className="flex max-w-3xl flex-col items-start gap-4 p-6 md:p-12"
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
      >
        <Badge variant="mint">{CATEGORY_LABEL[story.category] ?? "Story"}</Badge>
        <h1 className="font-display text-[2.25rem] leading-[1.05] tracking-[-0.01em] text-white md:text-6xl">
          {story.title}
        </h1>
      </motion.div>
    </div>
  );
}
