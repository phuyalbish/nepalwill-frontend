import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { panelId, tabId } from "./tabIds";

/**
 * Controlled pill tabs with an animated highlight that slides between tabs.
 * @param {{id:string,label:string,count?:number}[]} tabs
 * @param {string} value                 id of the active tab
 * @param {(id:string)=>void} onChange
 * @param {boolean} sticky               render as a sticky filter bar under the 72px navbar (full width, blurred)
 * @param {string} label                 accessible name for the tablist
 * @param {string} idPrefix              when set, every tab gets id=tabId(idPrefix, tab.id) and aria-controls=panelId(idPrefix, tab.id);
 *                                       give the matching panel `id={panelId(idPrefix, value)}`, `role="tabpanel"` and
 *                                       `aria-labelledby={tabId(idPrefix, value)}` (helpers live in ./tabIds)
 * On narrow screens the row scrolls horizontally (snap, hidden scrollbar, edge fade cues) and keeps the active tab in view.
 * Active tab is solid ink with white text and a small count, matching the stories filter bar.
 */
export default function Tabs({
  tabs,
  value,
  onChange,
  sticky = false,
  label = "Filter",
  idPrefix,
  className,
}) {
  const reduced = useReducedMotion();
  const layoutId = useId();
  const listRef = useRef(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  const measure = useCallback(() => {
    const node = listRef.current;
    if (!node) return;
    const start = node.scrollLeft > 4;
    const end = node.scrollLeft + node.clientWidth < node.scrollWidth - 4;
    setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
  }, []);

  useEffect(() => {
    measure();
    const node = listRef.current;
    if (!node || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [measure, tabs]);

  // Keep the active tab inside the scroll area (scrolls only the tab row, never the page).
  useEffect(() => {
    const node = listRef.current;
    const tab = node?.querySelector('[role="tab"][aria-selected="true"]');
    if (!node || !tab) return;
    const left = tab.offsetLeft - (node.clientWidth - tab.offsetWidth) / 2;
    node.scrollTo({ left: Math.max(0, left), behavior: reduced ? "auto" : "smooth" });
  }, [value, reduced]);

  const onKeyDown = (event) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const index = Math.max(
      0,
      tabs.findIndex((t) => t.id === value),
    );
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    onChange(tabs[next].id);
    listRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
  };

  const fade = sticky ? "from-page" : "from-white";

  const list = (
    <div className={cn("relative", !sticky && className)}>
      <div
        ref={listRef}
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        onScroll={measure}
        className="no-scrollbar relative flex snap-x snap-proximity gap-1 overflow-x-auto overscroll-x-contain py-3"
      >
        {tabs.map((tab) => {
          const active = tab.id === value;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={idPrefix ? tabId(idPrefix, tab.id) : undefined}
              aria-selected={active}
              aria-controls={idPrefix ? panelId(idPrefix, tab.id) : undefined}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative shrink-0 snap-center rounded-pill px-5 py-2.5 text-sm font-medium transition-colors",
                active ? "text-white" : "text-ink-700 hover:text-ink",
              )}
            >
              {active && (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-pill bg-ink"
                  transition={
                    reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }
                  }
                />
              )}
              <span className="relative z-10 inline-flex items-center gap-2">
                {tab.label}
                {tab.count != null && (
                  <span className={cn("text-xs", active ? "text-white/60" : "text-muted-300")}>
                    {tab.count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r to-transparent transition-opacity duration-200",
          fade,
          edges.start ? "opacity-100" : "opacity-0",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l to-transparent transition-opacity duration-200",
          fade,
          edges.end ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );

  if (!sticky) return list;
  return (
    <div
      className={cn(
        "sticky top-[72px] z-30 border-b border-ink/5 bg-page/80 backdrop-blur-xl",
        className,
      )}
    >
      <div className="container-page">{list}</div>
    </div>
  );
}
