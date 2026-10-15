import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { favoriteKey, removeFavorite } from "@/store/favoritesSlice";
import { TYPE_META, favoritePath, formatFavoriteDate } from "./favoritesMeta";

/** Saved item. Stretched title link, remove control above it. Exit and reflow are animated by the parent's AnimatePresence. */
export default function FavoriteCard({ item }) {
  const dispatch = useDispatch();
  const reduced = useReducedMotion();
  const meta = TYPE_META[item.type];
  const date = formatFavoriteDate(item.date);

  return (
    <Card
      as="article"
      hover={!reduced}
      layout={!reduced}
      initial={{ opacity: 0, scale: reduced ? 1 : 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: reduced ? 1 : 0.88 }}
      className="flex h-full flex-col overflow-hidden"
    >
      <div className="relative">
        <ImageWithFallback src={item.image_url} alt="" className="aspect-[16/10] w-full" />
        <Badge variant={meta.variant} className="absolute left-4 top-4 shadow-soft">
          {meta.label}
        </Badge>
        <button
          type="button"
          onClick={() => dispatch(removeFavorite(favoriteKey(item.type, item.slug)))}
          aria-label={`Remove ${item.title} from favorites`}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink-700 shadow-soft backdrop-blur transition-colors hover:bg-white hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {date && <p className="text-xs font-semibold uppercase tracking-[0.14em] text-purple">{date}</p>}
        <h3 className="text-lg font-bold leading-snug text-ink">
          <Link
            to={favoritePath(item)}
            className="rounded-chip after:absolute after:inset-0 after:content-[''] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
          >
            {item.title}
          </Link>
        </h3>
        {item.subtitle && <p className="text-sm text-muted">{item.subtitle}</p>}
      </div>
    </Card>
  );
}
