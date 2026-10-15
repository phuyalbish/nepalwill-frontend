import clsx from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** tailwind-merge that knows this project's custom radius and shadow names. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      rounded: [{ rounded: ["pill", "card", "hero", "field", "chip"] }],
      shadow: [{ shadow: ["soft", "lift", "glow"] }],
    },
  },
});

/** Join class names (clsx) and resolve conflicting Tailwind utilities so the last one wins (tailwind-merge). */
export const cn = (...inputs) => twMerge(clsx(inputs));
