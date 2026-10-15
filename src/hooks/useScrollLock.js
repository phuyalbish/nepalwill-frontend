import { useEffect } from "react";

let locks = 0;
let saved = null;

/** Lock page scroll while `active` (modals, drawers). Safe to nest. */
export function useScrollLock(active = true) {
  useEffect(() => {
    if (!active) return undefined;
    const root = document.documentElement;
    if (locks === 0) {
      const gap = window.innerWidth - root.clientWidth;
      saved = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
      root.style.overflow = "hidden";
      if (gap > 0) root.style.paddingRight = `${gap}px`;
    }
    locks += 1;
    return () => {
      locks -= 1;
      if (locks === 0 && saved) {
        root.style.overflow = saved.overflow;
        root.style.paddingRight = saved.paddingRight;
        saved = null;
      }
    };
  }, [active]);
}
