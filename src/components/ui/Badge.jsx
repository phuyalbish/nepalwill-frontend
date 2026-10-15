import { cn } from "@/lib/cn";

const VARIANTS = {
  purple: "bg-purple/10 text-purple",
  mint: "bg-mint text-ink",
  ink: "bg-ink text-white",
  success: "bg-success/10 text-success-strong",
  warning: "bg-amber-100 text-amber-800",
  coral: "bg-coral/10 text-coral",
};

/**
 * Small uppercase pill label, e.g. "LIFE CHANGED", "DELIVERED", "IN TRANSIT".
 * @param {'purple'|'mint'|'ink'|'success'|'warning'|'coral'} variant
 * @param {import('react').ElementType} icon  optional lucide icon component shown before the text
 */
export default function Badge({ variant = "purple", icon: Icon, className, children, ...rest }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill px-3 py-1 text-[11px] font-bold uppercase leading-none tracking-[0.12em]",
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      {Icon && <Icon className="h-3 w-3" aria-hidden="true" />}
      {children}
    </span>
  );
}
