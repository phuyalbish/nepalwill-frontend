import { cn } from "@/lib/cn";

/**
 * Metric chip: bold purple value with a muted label, e.g. value="52" label="Books Read".
 */
export default function Chip({ value, label, className, ...rest }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1.5 rounded-pill bg-white px-3.5 py-1.5 text-sm shadow-soft ring-1 ring-line",
        className,
      )}
      {...rest}
    >
      <strong className="font-bold text-purple">{value}</strong>
      <span className="text-muted">{label}</span>
    </span>
  );
}
