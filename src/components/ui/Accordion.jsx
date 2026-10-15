import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

/**
 * Animated accordion. Each item: { id?, title, content } (the API FAQ shape
 * { question, answer } is accepted too). Triggers are buttons with aria-expanded and
 * support Up/Down/Home/End to move between rows.
 * @param {object[]} items
 * @param {boolean} multiple   allow several rows open at once (default false)
 * @param {number|string} defaultOpen  index or id open initially
 */
export default function Accordion({ items, multiple = false, defaultOpen, className }) {
  const reduced = useReducedMotion();
  const baseId = useId();
  const rootRef = useRef(null);
  const idOf = (item, i) => String(item.id ?? i);
  const [open, setOpen] = useState(() => {
    if (defaultOpen == null) return [];
    const found = items.findIndex((it, i) => idOf(it, i) === String(defaultOpen));
    return found >= 0 ? [idOf(items[found], found)] : [String(defaultOpen)];
  });

  const toggle = (id) =>
    setOpen((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : multiple ? [...cur, id] : [id],
    );

  const onKeyDown = (event) => {
    const triggers = [...rootRef.current.querySelectorAll("[data-accordion-trigger]")];
    const index = triggers.indexOf(document.activeElement);
    if (index < 0) return;
    const move = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: triggers.length - 1 }[event.key];
    if (move == null) return;
    event.preventDefault();
    triggers[(move + triggers.length) % triggers.length].focus();
  };

  return (
    <div ref={rootRef} onKeyDown={onKeyDown} className={cn("flex flex-col gap-3", className)}>
      {items.map((item, i) => {
        const id = idOf(item, i);
        const isOpen = open.includes(id);
        const triggerId = `${baseId}-t-${id}`;
        const panelId = `${baseId}-p-${id}`;
        return (
          <div
            key={id}
            className={cn(
              "rounded-card border bg-white shadow-soft transition-colors",
              isOpen ? "border-purple/30" : "border-line",
            )}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                data-accordion-trigger
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(id)}
                className="flex w-full items-center justify-between gap-4 rounded-card px-6 py-5 text-left font-bold text-ink"
              >
                <span>{item.title ?? item.question}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: reduced ? 0 : 0.25 }}
                  className="shrink-0 text-muted"
                >
                  <ChevronDown className="h-5 w-5" aria-hidden="true" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.3, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 leading-7 text-ink-700">
                    {item.content ?? item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
