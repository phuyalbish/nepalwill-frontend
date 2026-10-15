import { AnimatePresence } from "framer-motion";
import FavoriteCard from "./FavoriteCard";

/** Titled grid of saved items. Renders nothing when empty. */
export default function FavoritesSection({ id, title, items }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby={id} className="mt-12 first:mt-0">
      <h2 id={id} className="mb-6 flex items-baseline gap-3 font-display text-3xl text-ink md:text-4xl">
        {title}
        <span className="font-sans text-base text-muted">{items.length}</span>
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item) => (
            <FavoriteCard key={`${item.type}:${item.slug}`} item={item} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
