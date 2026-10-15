import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { useReducedMotion } from "framer-motion";

/**
 * On route change scroll to the top, or to the #hash target once it exists
 * (polls briefly because lazy pages and page transitions mount late).
 * Back/forward (POP) without a hash is left alone so the browser restores the old position.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!hash) {
      if (navigationType !== "POP") window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return undefined;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    const timer = window.setInterval(() => {
      const el = document.getElementById(id);
      tries += 1;
      if (el) {
        el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        window.clearInterval(timer);
      } else if (tries > 40) {
        window.clearInterval(timer);
      }
    }, 50);
    return () => window.clearInterval(timer);
  }, [pathname, hash, navigationType, reduced]);

  return null;
}
