import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const DEFAULT_WORDS = ["Leap.", "Grow.", "Thrive."];
const START = { index: 0, count: 0, deleting: false };

/**
 * Types a word letter by letter, holds, deletes it, then moves to the next one.
 * A blinking purple caret follows the text. Under reduced motion the last word is shown static.
 * Screen readers get every word once through a visually hidden span.
 */
export default function TypedWord({ words = DEFAULT_WORDS, className }) {
  const reduced = useReducedMotion();
  const [state, setState] = useState(START);

  useEffect(() => {
    if (reduced) return undefined;
    const word = words[state.index];
    let delay;
    let next;
    if (!state.deleting && state.count < word.length) {
      delay = 120;
      next = { ...state, count: state.count + 1 };
    } else if (!state.deleting) {
      delay = 1800;
      next = { ...state, deleting: true };
    } else if (state.count > 0) {
      delay = 65;
      next = { ...state, count: state.count - 1 };
    } else {
      delay = 380;
      next = { index: (state.index + 1) % words.length, count: 0, deleting: false };
    }
    const timer = window.setTimeout(() => setState(next), delay);
    return () => window.clearTimeout(timer);
  }, [state, reduced, words]);

  const text = reduced ? words[words.length - 1] : words[state.index].slice(0, state.count);
  const typing = !state.deleting && state.count < words[state.index].length;

  return (
    <span className={cn("text-purple", className)}>
      <span className="sr-only">{words.join(" ")}</span>
      <span aria-hidden="true">
        {text}
        {!reduced && (
          <span
            className={cn(
              "ml-1 inline-block h-[0.82em] w-[3px] translate-y-[0.08em] rounded-full bg-purple",
              !typing && "animate-caret",
            )}
          />
        )}
      </span>
    </span>
  );
}
