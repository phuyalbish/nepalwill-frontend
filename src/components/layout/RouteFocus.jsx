import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const GIVE_UP_MS = 5000;

/**
 * Route announcement for assistive tech: after a pathname change (not a hash-only change and not
 * the first load) move focus to the new page's h1 without scrolling. Pages mount late (exit
 * animation, lazy chunk, data), so a MutationObserver waits for the h1 of the incoming route
 * (matched through PageTransition's data-route) and gives up after a few seconds, or as soon as
 * the user presses a key or touches the page themselves.
 */
export default function RouteFocus() {
  const { pathname } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return undefined;
    }
    const main = document.getElementById("main");
    if (!main) return undefined;

    let finished = false;
    const stop = () => {
      finished = true;
      observer.disconnect();
      window.clearTimeout(timer);
      document.removeEventListener("keydown", stop, true);
      document.removeEventListener("pointerdown", stop, true);
    };
    const attempt = () => {
      if (finished) return;
      const pages = main.querySelectorAll("[data-route]");
      const page = [...pages].find((el) => el.dataset.route === pathname);
      const heading = page?.querySelector("h1");
      if (!heading) return;
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      stop();
    };

    const observer = new MutationObserver(attempt);
    observer.observe(main, { childList: true, subtree: true });
    const timer = window.setTimeout(stop, GIVE_UP_MS);
    document.addEventListener("keydown", stop, true);
    document.addEventListener("pointerdown", stop, true);
    attempt();
    return stop;
  }, [pathname]);

  return null;
}
