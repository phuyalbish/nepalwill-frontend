import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Card with a mint to purple gradient border and a cursor-follow glow inside.
 * Fine pointers only; touch devices never fire the mouse events.
 */
export default function GlowCard({ className, innerClassName, children }) {
  const reduced = useReducedMotion();

  const onMouseMove = (event) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={onMouseMove}
      className={cn(
        "group/glow relative rounded-card bg-signature p-[1.5px] shadow-soft transition-shadow duration-300 hover:shadow-glow",
        className,
      )}
    >
      <div className={cn("relative h-full overflow-hidden rounded-[14.5px] bg-white", innerClassName)}>
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/glow:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgb(153 242 200 / 0.3), transparent 60%)",
          }}
        />
      </div>
    </div>
  );
}
