import { cn } from "@/lib/cn";

/** Shared control styles: 12px radius, mint focus ring, coral on error. */
export const controlClass = (error) =>
  cn(
    "w-full rounded-field border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted",
    "outline-none transition-[border-color,box-shadow] duration-200",
    "focus:ring-4",
    error
      ? "border-coral focus:border-coral focus:ring-coral/20"
      : "border-line hover:border-muted-300 focus:border-mint-strong focus:ring-mint/50",
    "disabled:cursor-not-allowed disabled:bg-sage-50 disabled:opacity-70",
  );
