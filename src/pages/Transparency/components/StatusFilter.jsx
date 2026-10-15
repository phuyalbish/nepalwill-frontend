import { cn } from "@/lib/cn";
import { STATUS_FILTERS } from "./transparencyData";

/** Small segmented filter: All / Delivered / In transit, with counts. */
export default function StatusFilter({ value, onChange, counts }) {
  return (
    <div
      role="group"
      aria-label="Filter records by status"
      className="inline-flex rounded-pill border border-ink/10 bg-white p-1"
    >
      {STATUS_FILTERS.map((f) => {
        const active = f.id === value;
        return (
          <button
            key={f.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(f.id)}
            className={cn(
              "rounded-pill px-4 py-2 text-sm font-medium transition-colors",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple",
              active ? "bg-ink text-white" : "text-ink-700 hover:text-ink",
            )}
          >
            {f.label}
            <span className={cn("ml-1.5 text-xs", active ? "text-white/60" : "text-muted-300")}>
              {counts[f.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
