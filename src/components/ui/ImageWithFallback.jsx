import { useState } from "react";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Lazy image that fades in on load and shows a neutral gradient if it fails or has no src.
 * className sizes the WRAPPER (e.g. "aspect-[4/3] rounded-card"); the image fills it with object-cover.
 * @param {string} src
 * @param {string} alt
 * @param {string} imgClassName  extra classes for the <img> (e.g. hover zoom "transition-transform group-hover:scale-105")
 * @param {boolean} priority     eager load for above-the-fold images
 * @param {string} layoutId      framer shared-layout id (used by Lightbox zoom)
 */
export default function ImageWithFallback({
  src,
  alt = "",
  className,
  imgClassName,
  priority = false,
  layoutId,
  ...rest
}) {
  const [failedSrc, setFailedSrc] = useState(null);
  const failed = !src || failedSrc === src;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-sage-50 via-mint-50 to-purple-50",
        className,
      )}
    >
      {failed ? (
        <div
          role="img"
          aria-label={alt || "Image unavailable"}
          className="flex h-full w-full items-center justify-center text-muted-300"
        >
          <ImageOff className="h-8 w-8" aria-hidden="true" />
        </div>
      ) : (
        <motion.img
          key={src}
          layoutId={layoutId}
          src={src}
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
