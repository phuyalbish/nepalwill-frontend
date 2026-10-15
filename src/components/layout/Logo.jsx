import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

/** NepalWill wordmark in Instrument Serif. `tone="light"` for dark backgrounds. */
export default function Logo({ tone = "dark", className, onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="NepalWill home"
      className={cn(
        "font-display text-[26px] leading-none tracking-tight",
        tone === "light" ? "text-white" : "text-ink",
        className,
      )}
    >
      NepalWill
    </Link>
  );
}
