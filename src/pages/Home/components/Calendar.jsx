import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { MONTH_NAMES, parseISODate } from "../utils";

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const pad = (n) => String(n).padStart(2, "0");
const toKey = (year, month, day) => `${year}-${pad(month + 1)}-${pad(day)}`;

/**
 * Month calendar card. Dates that have an event are mint buttons.
 * @param {{slug:string,title:string,date:string}[]} events
 * @param {string} selectedSlug  event whose date gets the purple ring
 * @param {(event:object)=>void} onSelect  called with the first event on the clicked date; clicking a date whose event is
 *   already selected cycles to the next event on that date (several events can share a day)
 */
export default function Calendar({ events, selectedSlug, onSelect }) {
  const today = useMemo(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
  }, []);

  const byDate = useMemo(() => {
    const map = new Map();
    for (const event of events) {
      if (!event.date) continue;
      map.set(event.date, [...(map.get(event.date) ?? []), event]);
    }
    return map;
  }, [events]);

  const [view, setView] = useState(() => {
    const first = events.find((e) => e.date);
    const start = first ? parseISODate(first.date) : today;
    return { year: start.year, month: start.month };
  });

  const shift = (delta) =>
    setView(({ year, month }) => {
      const next = new Date(year, month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });

  const offset = new Date(view.year, view.month, 1).getDay();
  const length = new Date(view.year, view.month + 1, 0).getDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length }, (_, i) => i + 1)];
  const selectedDate = events.find((e) => e.slug === selectedSlug)?.date;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-card border border-line bg-white p-5 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label="Previous month"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-sage-50 hover:text-ink"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <p aria-live="polite" className="text-[15px] font-bold text-ink">
            {MONTH_NAMES[view.month]} {view.year}
          </p>
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label="Next month"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-sage-50 hover:text-ink"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-y-1 text-center">
          {WEEKDAYS.map((name) => (
            <abbr
              key={name}
              title={name}
              className="pb-2 text-[11px] font-semibold uppercase text-muted no-underline"
            >
              {name[0]}
            </abbr>
          ))}
          {cells.map((day, i) => {
            if (!day) return <span key={`blank-${i}`} />;
            const key = toKey(view.year, view.month, day);
            const dayEvents = byDate.get(key);
            const isToday =
              today.year === view.year && today.month === view.month && today.day === day;
            const pickedIndex = dayEvents ? dayEvents.findIndex((e) => e.slug === selectedSlug) : -1;
            const nextEvent = dayEvents ? dayEvents[(pickedIndex + 1) % dayEvents.length] : null;
            const base = cn(
              "mx-auto flex h-9 w-9 items-center justify-center rounded-full text-[13px] transition-colors",
              isToday && "ring-2 ring-ink/40 ring-offset-1",
            );
            if (!dayEvents) {
              return (
                <span key={key} className={cn(base, "text-ink-700/70")}>
                  {day}
                </span>
              );
            }
            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelect(nextEvent)}
                aria-label={`${MONTH_NAMES[view.month]} ${day}: ${dayEvents.map((e) => e.title).join(", ")}${
                  dayEvents.length > 1 ? `. ${dayEvents.length} events, press again for the next one` : ""
                }`}
                aria-pressed={key === selectedDate}
                className={cn(
                  base,
                  "bg-mint font-bold text-ink hover:bg-mint-strong",
                  key === selectedDate && "ring-2 ring-purple ring-offset-2",
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <p className="flex items-start gap-2.5 rounded-card border border-mint-strong/30 bg-mint-50 px-4 py-3 text-sm leading-5 text-success-strong">
        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        Click a highlighted date to jump to that event. Dates with several events cycle through them.
      </p>
    </div>
  );
}
