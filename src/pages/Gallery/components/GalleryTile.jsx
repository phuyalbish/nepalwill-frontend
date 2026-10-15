import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Expand } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { EASE_OUT, lightboxLayoutId } from "@/lib/motion";

/**
 * Masonry tile. The wrapper reveals with a clip-path wipe, the button opens the lightbox.
 * The thumbnail shares a layoutId with the Lightbox image for the zoom transition.
 */
const GalleryTile = forwardRef(function GalleryTile(
  { item, ratio, index, prefix, onOpen },
  ref,
) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="mb-4 break-inside-avoid"
      initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0 round 16px)", opacity: 0.4 }}
      whileInView={reduced ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0 round 16px)", opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: (index % 3) * 0.1 }}
    >
      <button
        ref={ref}
        type="button"
        onClick={onOpen}
        aria-label={`Open photo: ${item.title}`}
        className="group relative block w-full overflow-hidden rounded-card bg-sage-50 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple"
        style={{ aspectRatio: ratio }}
      >
        <ImageWithFallback
          src={item.image_url}
          alt={item.title}
          width={900}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          layoutId={lightboxLayoutId(prefix, item.id ?? index)}
          className="h-full w-full"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-scrim p-4 pt-14 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-mint">
              {item.category}
            </span>
            <span className="mt-1 block text-sm font-bold leading-snug">{item.title}</span>
          </span>
          <Expand className="h-4 w-4 shrink-0" />
        </span>
      </button>
    </motion.div>
  );
});

export default GalleryTile;
