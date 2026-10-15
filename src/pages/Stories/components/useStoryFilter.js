import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FILTERS } from "./storyUtils";

/** Category filter kept in ?filter= so it survives reload. Returns the visible items and tab data. */
export function useStoryFilter(items = []) {
  const [params, setParams] = useSearchParams();
  const raw = params.get("filter");
  const filter = FILTERS.some((f) => f.id === raw) ? raw : "all";

  const setFilter = useCallback(
    (id) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (id === "all") next.delete("filter");
          else next.set("filter", id);
          return next;
        },
        { replace: true },
      );
    },
    [setParams],
  );

  const tabs = useMemo(
    () =>
      FILTERS.map((f) => ({
        ...f,
        count: f.id === "all" ? items.length : items.filter((s) => s.category === f.id).length,
      })),
    [items],
  );

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((s) => s.category === filter)),
    [items, filter],
  );

  return { filter, setFilter, tabs, visible };
}
