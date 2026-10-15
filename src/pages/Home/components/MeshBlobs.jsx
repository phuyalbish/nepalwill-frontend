import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Slow drifting mint, purple and sage blobs. Clipped to its own box so it never causes
 * horizontal scroll. Parent must be position:relative.
 */
export default function MeshBlobs({ className }) {
  const reduced = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-0 overflow-hidden", className)}
    >
      <div
        className={cn(
          "absolute -left-24 top-16 h-[300px] w-[300px] rounded-full bg-mint/70 blur-3xl md:h-[440px] md:w-[440px]",
          !reduced && "animate-blob",
        )}
      />
      <div
        className={cn(
          "absolute -right-20 -top-16 h-[320px] w-[320px] rounded-full bg-purple/20 blur-3xl md:h-[480px] md:w-[480px]",
          !reduced && "animate-blob-alt",
        )}
      />
      <div
        className={cn(
          "absolute -bottom-24 left-1/3 h-[260px] w-[260px] rounded-full bg-[#BFE3D0]/80 blur-3xl md:h-[380px] md:w-[380px]",
          !reduced && "animate-blob",
        )}
      />
    </div>
  );
}
