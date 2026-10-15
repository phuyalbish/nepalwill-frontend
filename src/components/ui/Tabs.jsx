import { useId, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Controlled pill tabs with an animated highlight that slides between tabs.
 * @param {{id:string,label:string,count?:number}[]} tabs
 * @param {string} value                 id of the active tab
 * @param {(id:string)=>void} onChange
 * @param {boolean} sticky               render as a sticky filter bar under the 72px navbar (full width, blurred)
 * @param {string} label                 accessible name for the tablist
 * Active tab is solid ink with white text and a small count, matching the stories filter bar.
 */
export default function Tabs({ tabs, value, onChange, sticky = false, label = "Filter", className }) {
  const reduced = useReducedMotion();
  const layoutId = useId();
  const listRef = useRef(null);

  const onKeyDown = (event) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const index = tabs.findIndex((t) => t.id === value);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    onChange(tabs[next].id);
    listRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
  };

  const list = (
    <div
      ref={listRef}
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn("no-scrollbar flex gap-1 overflow-x-auto py-3", !sticky && className)}
    >
      {tabs.map((tab) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative shrink-0 rounded-pill px-5 py-2.5 text-sm font-medium transition-colors",
              active ? "text-white" : "text-ink-700 hover:text-ink",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-pill bg-ink"
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
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
