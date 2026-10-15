import { useSelector } from "react-redux";
import { Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { selectFavoritesByType } from "@/store/favoritesSlice";
import ClearAll from "./components/ClearAll";
import FavoritesSection from "./components/FavoritesSection";

export default function Favorites() {
  const { event, program, story, blog } = useSelector(selectFavoritesByType);
  const eventsAndPrograms = [...event, ...program];
  const blogsAndStories = [...story, ...blog];
  const total = eventsAndPrograms.length + blogsAndStories.length;

  return (
    <section className="container-page py-16 md:py-24">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow !text-coral">Your collection</p>
          <h1 className="h-display mt-4">Favorites</h1>
          <p role="status" aria-live="polite" className="mt-4 text-lg text-muted">
            {total === 0
              ? "Nothing saved yet."
              : `${total} saved ${total === 1 ? "item" : "items"}, stored on this device.`}
          </p>
        </div>
        {total > 0 && <ClearAll count={total} />}
      </div>

      {total === 0 ? (
        <EmptyState
          icon={Heart}
          title="No favorites yet"
          description="Tap the heart on any event, program, story or blog post to save it here for easy access."
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <Button to="/programs" variant="primary" size="sm">
                Programs
              </Button>
              <Button to="/stories" variant="outline" size="sm">
                Stories
              </Button>
              <Button to="/#events" variant="outline" size="sm">
                Events
              </Button>
            </div>
          }
        />
      ) : (
        <>
          <FavoritesSection id="fav-events" title="Events and Programs" items={eventsAndPrograms} />
          <FavoritesSection id="fav-stories" title="Blog Posts and Stories" items={blogsAndStories} />
        </>
      )}
    </section>
  );
}
