import { cn } from "@/lib/cn";
import { initials } from "./storyUtils";

/** Initials avatar (the API has no author photos). */
export default function Avatar({ name, size = "md", className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-mint to-purple/60 font-bold text-ink",
        size === "lg" ? "h-12 w-12 text-base" : size === "sm" ? "h-7 w-7 text-[10px]" : "h-10 w-10 text-sm",
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
