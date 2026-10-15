import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { clearFavorites } from "@/store/favoritesSlice";

/** "Clear all" with an inline two-step confirm (no window.confirm). */
export default function ClearAll({ count }) {
  const dispatch = useDispatch();
  const [confirming, setConfirming] = useState(false);
  const cancelRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (confirming) cancelRef.current?.focus();
  }, [confirming]);

  const finish = (clear) => {
    setConfirming(false);
    if (clear) dispatch(clearFavorites());
    else triggerRef.current?.focus();
  };

  return (
    <div className="flex flex-wrap items-center gap-3" onKeyDown={(e) => e.key === "Escape" && finish(false)}>
      {confirming ? (
        <div role="group" aria-label="Confirm clearing favorites" className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-medium text-ink">
            Remove all {count} {count === 1 ? "favorite" : "favorites"}?
          </p>
          <Button ref={cancelRef} variant="outline" size="sm" onClick={() => finish(false)}>
            Keep them
          </Button>
          <Button variant="dark" size="sm" onClick={() => finish(true)} className="!bg-coral hover:!bg-coral/90">
            Yes, clear all
          </Button>
        </div>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setConfirming(true)}
          className="inline-flex h-9 items-center gap-2 rounded-pill border border-ink/10 bg-white px-4 text-sm font-medium text-ink-700 transition-colors hover:border-coral/40 hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Clear all
        </button>
      )}
      <span role="status" aria-live="polite" className="sr-only">
        {confirming ? `Confirm removing all ${count} favorites` : ""}
      </span>
    </div>
  );
}
