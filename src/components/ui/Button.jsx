import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { useMagnetic } from "@/hooks/useMagnetic";

const VARIANTS = {
  primary: "bg-mint text-ink hover:bg-mint-strong hover:shadow-glow",
  outline: "border border-ink/15 bg-white/60 text-ink hover:border-ink/40 hover:bg-white",
  dark: "bg-ink text-white hover:bg-ink-700",
  ghost: "px-0 text-purple hover:text-purple-600",
};

const SIZES = {
  sm: "h-9 gap-1.5 px-4 text-sm",
  md: "h-11 gap-2 px-6 text-[15px]",
  lg: "h-14 gap-2.5 px-8 text-base",
};

/**
 * Pill button.
 * @param {'primary'|'outline'|'dark'|'ghost'} variant  primary = mint pill with ink text, ghost = text link with arrow
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} magnetic  pull toward the cursor within ~60px (disabled on touch and reduced motion)
 * @param {boolean} arrow     trailing arrow that slides right on hover (default true for ghost)
 * @param {string} to         renders react-router <Link>
 * @param {string} href       renders <a> (external http links open in a new tab)
 * @param {boolean} loading   shows a spinner and disables the button
 * Anything else is passed to the underlying element.
 */
export default function Button({
  variant = "primary",
  size = "md",
  magnetic = false,
  arrow,
  to,
  href,
  loading = false,
  disabled = false,
  className,
  children,
  type = "button",
  ...rest
}) {
  const { ref, x, y } = useMagnetic({ enabled: magnetic });
  const showArrow = arrow ?? variant === "ghost";

  const classes = cn(
    "group inline-flex items-center justify-center whitespace-nowrap rounded-pill font-bold transition-all duration-200",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
    VARIANTS[variant],
    variant === "ghost" ? "h-auto gap-1.5 text-[15px]" : SIZES[size],
    className,
  );

  const content = (
    <>
      {loading && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
      <span>{children}</span>
      {showArrow && !loading && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  let element;
  if (to) {
    element = (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  } else if (href) {
    const external = /^https?:\/\//.test(href);
    element = (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  } else {
    element = (
      <button type={type} className={classes} disabled={disabled || loading} {...rest}>
        {content}
      </button>
    );
  }

  if (!magnetic) return element;
  return (
    <motion.span ref={ref} style={{ x, y }} className="inline-flex">
      {element}
    </motion.span>
  );
}
