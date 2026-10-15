import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useScrollLock } from "@/hooks/useScrollLock";
import { lightboxLayoutId } from "@/lib/motion";

function Dialog({ items, index, onClose, onIndexChange, layoutIdPrefix }) {
  const reduced = useReducedMotion();
  const [startIndex] = useState(index);
  const [touchX, setTouchX] = useState(null);
  const ref = useFocusTrap(true, { onEscape: onClose });
  useScrollLock(true);

  const count = items.length;
  const item = items[index];
  const go = (delta) => onIndexChange((index + delta + count) % count);

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
  };

  // Shared-element zoom only for the opened item; other items crossfade.
  const layoutId =
    index === startIndex ? lightboxLayoutId(layoutIdPrefix, item.id ?? index) : undefined;

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={item.title || "Image viewer"}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX == null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50 && count > 1) go(dx < 0 ? 1 : -1);
        setTouchX(null);
      }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm outline-none md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.25 }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </>
      )}

      <figure
        className="flex max-h-full max-w-5xl flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.img
          key={item.id ?? index}
          layoutId={layoutId}
          src={item.src}
          alt={item.alt || item.title || ""}
          className="max-h-[78vh] max-w-full rounded-card object-contain shadow-glow"
          initial={layoutId || reduced ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <figcaption className="text-center text-sm text-white/80">
          {item.title && <span className="font-medium text-white">{item.title}</span>}
          {count > 1 && (
            <span className="ml-3 text-white/50" aria-live="polite">
              {index + 1} / {count}
            </span>
          )}
        </figcaption>
      </figure>
    </motion.div>
  );
}

/**
 * Fullscreen image viewer. Esc closes, Left/Right navigate (swipe on touch), focus is trapped,
 * page scroll is locked, focus returns to the trigger on close.
 * @param {{id?:string|number, src:string, alt?:string, title?:string}[]} items
 * @param {number|null} index            open item index, or null/undefined when closed
 * @param {()=>void} onClose
 * @param {(i:number)=>void} onIndexChange
 * @param {string} layoutIdPrefix        for the zoom: give the grid thumbnail
 *   layoutId={lightboxLayoutId(prefix, item.id ?? i)} (exported from "@/lib/motion")
 */
export default function Lightbox({
  items = [],
  index,
  onClose,
  onIndexChange,
  layoutIdPrefix = "lightbox",
}) {
  const open = index != null && items[index] != null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <Dialog
          key="lightbox"
          items={items}
          index={index}
          onClose={onClose}
          onIndexChange={onIndexChange}
          layoutIdPrefix={layoutIdPrefix}
        />
      )}
    </AnimatePresence>,
    document.body,
  );
}
