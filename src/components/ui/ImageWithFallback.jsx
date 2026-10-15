import { useState } from "react";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/cn";
import { unsplashSrcSet, unsplashWidth } from "@/lib/images";

/**
 * Lazy image that fades in on load and shows a neutral gradient if it fails or has no src.
 * className sizes the WRAPPER (e.g. "aspect-[4/3] rounded-card"); the image fills it with object-cover.
 * @param {boolean} fill         position the wrapper absolute inset-0 so it covers its nearest positioned ancestor (card backgrounds)
 * @param {string} src
 * @param {string} alt
 * @param {string} imgClassName  extra classes for the <img> (e.g. hover zoom "transition-transform group-hover:scale-105")
 * @param {boolean} priority     eager load for above-the-fold images
 * @param {string} layoutId      framer shared-layout id (used by Lightbox zoom)
 * @param {number} width         Unsplash only: widest rendition in px (cards 800 by default, gallery tiles 900, heroes 1600);
 *                               src is rewritten to this w= and a 400..width srcSet is emitted
 * @param {string} sizes         Unsplash only: the sizes attribute that goes with the srcSet (default "100vw")
 * When alt is "" the image is decorative and so is its error placeholder (aria-hidden).
 */
export default function ImageWithFallback({
  src,
  alt = "",
  className,
  imgClassName,
  priority = false,
  layoutId,
  fill = false,
  width = 800,
  sizes = "100vw",
  ...rest
}) {
  const [failedSrc, setFailedSrc] = useState(null);
  const failed = !src || failedSrc === src;

  return (
    <div
      className={cn(
        "overflow-hidden bg-gradient-to-br from-sage-50 via-mint-50 to-purple-50",
        fill ? "absolute inset-0 h-full w-full" : "relative",
        className,
      )}
    >
      {failed ? (
        <div
          {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": "true" })}
          className="flex h-full w-full items-center justify-center text-muted-300"
        >
          <ImageOff className="h-8 w-8" aria-hidden="true" />
        </div>
      ) : (
        <motion.img
          key={src}
          layoutId={layoutId}
          src={unsplashWidth(src, width)}
          srcSet={unsplashSrcSet(src, width)}
          sizes={unsplashSrcSet(src, width) ? sizes : undefined}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailedSrc(src)}
          onLoad={(e) => {
            e.currentTarget.dataset.loaded = "1";
          }}
          ref={(el) => {
            if (el && el.complete && el.naturalWidth > 0) el.dataset.loaded = "1";
          }}
          className={cn(
            "h-full w-full object-cover opacity-0 transition-opacity duration-500 data-[loaded]:opacity-100",
            imgClassName,
          )}
          {...rest}
        />
      )}
    </div>
  );
}
