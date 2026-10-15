import { cn } from "@/lib/cn";

/**
 * Metric chip: bold purple value with a muted label, e.g. value="52" label="Books Read".
 * `value` is optional: without it only the label renders, with no empty element or stray gap.
 */
export default function Chip({ value, label, className, ...rest }) {
  const hasValue = value !== undefined && value !== null && value !== "";
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1.5 rounded-pill bg-white px-3.5 py-1.5 text-sm shadow-soft ring-1 ring-line",
        className,
      )}
      {...rest}
    >
      {hasValue && <strong className="font-bold text-purple">{value}</strong>}
      {label ? <span className={hasValue ? "text-muted" : "text-ink-700"}>{label}</span> : null}
    </span>
  );
}
