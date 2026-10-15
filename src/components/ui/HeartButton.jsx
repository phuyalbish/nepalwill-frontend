import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/cn";
import { favoriteKey, selectIsFavorite, toggleFavorite } from "@/store/favoritesSlice";

const PARTICLES = Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2 - Math.PI / 2);

/**
 * Favorite toggle wired to the redux favorites slice.
 * @param {{type:'event'|'program'|'story'|'blog', slug:string, title:string, image_url?:string, date?:string, subtitle?:string}} item
 * @param {'glass'|'plain'} variant  glass = white circle with blur, for use over images
 * @param {'sm'|'md'} size
 * Click does not bubble or follow parent links, so it is safe on top of a stretched-link card.
 */
export default function HeartButton({ item, variant = "glass", size = "md", className }) {
  const dispatch = useDispatch();
  const reduced = useReducedMotion();
  const key = favoriteKey(item.type, item.slug);
  const active = useSelector(selectIsFavorite(key));
  const [burst, setBurst] = useState(0);

  const onClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!active) setBurst((b) => b + 1);
    dispatch(toggleFavorite(item));
  };

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `Remove ${item.title} from favorites` : `Save ${item.title} to favorites`}
      onClick={onClick}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full transition-colors",
        size === "sm" ? "h-8 w-8" : "h-10 w-10",
        variant === "glass"
          ? "bg-white/80 text-ink-700 shadow-soft backdrop-blur hover:bg-white"
          : "text-muted hover:text-coral",
        active && "!text-coral",
        className,
      )}
    >
      <motion.span
        className="inline-flex"
        animate={active && !reduced ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Heart
          className={size === "sm" ? "h-4 w-4" : "h-5 w-5"}
          fill={active ? "currentColor" : "none"}
          aria-hidden="true"
        />
      </motion.span>
      {burst > 0 && !reduced && (
        <span key={burst} className="pointer-events-none absolute inset-0" aria-hidden="true">
          {PARTICLES.map((angle) => (
            <motion.span
              key={angle}
              className="absolute left-1/2 top-1/2 -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-coral"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos(angle) * 22,
                y: Math.sin(angle) * 22,
                opacity: 0,
                scale: 0.3,
              }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
          ))}
        </span>
      )}
    </button>
  );
}
