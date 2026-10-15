import { cn } from "@/lib/cn";

/** Wrapping filter chips. `options` are category names, "All" is added in front. */
export default function CategoryChips({ options, value, onChange, counts }) {
  const all = ["All", ...options];
  return (
    <div role="group" aria-label="Filter photos by category" className="flex flex-wrap justify-center gap-2">
      {all.map((name) => {
        const active = (name === "All" && !value) || name === value;
        const count = name === "All" ? counts.total : counts[name];
        return (
          <button
            key={name}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(name === "All" ? "" : name)}
            className={cn(
              "inline-flex items-center gap-2 rounded-pill border px-5 py-2.5 text-sm font-medium transition-colors",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple",
              active
                ? "border-ink bg-ink text-white"
                : "border-ink/10 bg-white text-ink-700 hover:border-ink/30 hover:text-ink",
            )}
          >
            {name}
            <span className={cn("text-xs", active ? "text-white/60" : "text-muted")}>{count}</span>
          </button>
        );
      })}
    </div>
  );
}
