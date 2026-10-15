import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Trap Tab focus inside a container while `active`, call `onEscape` on Esc,
 * and restore focus to the previously focused element on cleanup.
 * Usage: const ref = useFocusTrap(true, { onEscape: close }); <div ref={ref} tabIndex={-1}>
 */
export function useFocusTrap(active = true, { onEscape } = {}) {
  const ref = useRef(null);
  const escapeRef = useRef(onEscape);

  useEffect(() => {
    escapeRef.current = onEscape;
  });

  useEffect(() => {
    const node = ref.current;
    if (!active || !node) return undefined;
    const previous = document.activeElement;

    const getFocusables = () =>
      [...node.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.getClientRects().length > 0,
      );

    const first = getFocusables()[0];
    (first || node).focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        escapeRef.current?.(event);
        return;
      }
      if (event.key !== "Tab") return;
      const items = getFocusables();
      if (items.length === 0) {
        event.preventDefault();
        node.focus();
        return;
      }
      const head = items[0];
      const tail = items[items.length - 1];
      const current = document.activeElement;
      if (event.shiftKey && (current === head || !node.contains(current))) {
        event.preventDefault();
        tail.focus();
      } else if (!event.shiftKey && (current === tail || !node.contains(current))) {
        event.preventDefault();
        head.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (previous instanceof HTMLElement && document.contains(previous)) {
        previous.focus({ preventScroll: true });
      }
    };
  }, [active]);

  return ref;
}
