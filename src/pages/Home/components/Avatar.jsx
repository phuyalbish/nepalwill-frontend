import { cn } from "@/lib/cn";
import { initials } from "../utils";

/** Round avatar: the photo when there is one, otherwise gradient initials. */
export default function Avatar({ name, src, className }) {
  const base = "flex h-11 w-11 shrink-0 items-center justify-center rounded-full";
  if (src) {
    return <img src={src} alt="" loading="lazy" className={cn(base, "object-cover", className)} />;
  }
  return (
    <span
      aria-hidden="true"
      className={cn(base, "bg-signature text-sm font-bold text-white", className)}
    >
      {initials(name)}
    </span>
  );
}
