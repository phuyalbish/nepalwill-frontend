import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/site";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useScrollLock } from "@/hooks/useScrollLock";
import { selectFavoriteCount } from "@/store/favoritesSlice";
import Button from "@/components/ui/Button";
import Logo from "./Logo";

function FavoritesLink({ onClick }) {
  const count = useSelector(selectFavoriteCount);
  return (
    <Link
      to="/favorites"
      onClick={onClick}
      aria-label={count ? `Favorites, ${count} saved` : "Favorites"}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
    >
      <Heart className="h-5 w-5" fill={count ? "currentColor" : "none"} aria-hidden="true" />
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 1.6 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 14 }}
          className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-coral px-1 text-[11px] font-bold leading-none text-white"
        >
          {count}
        </motion.span>
      )}
    </Link>
  );
}

function Drawer({ onClose }) {
  const reduced = useReducedMotion();
  const ref = useFocusTrap(true, { onEscape: onClose });
  useScrollLock(true);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.aside
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        tabIndex={-1}
        className="fixed bottom-0 right-0 top-0 z-[80] flex w-[min(86vw,360px)] flex-col bg-page p-6 shadow-lift outline-none lg:hidden"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={reduced ? { duration: 0.15 } : { type: "spring", stiffness: 320, damping: 34 }}
      >
        <div className="mb-8 flex items-center justify-between">
          <Logo onClick={onClose} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink/5"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-col">
          {[...NAV_LINKS, { to: "/contact", label: "Contact" }, { to: "/transparency", label: "Transparency" }].map(
            (link, i) => (
              <motion.div
                key={link.to}
                initial={reduced ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
              >
                <NavLink
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      "block border-b border-ink/5 py-3.5 font-display text-3xl transition-colors",
                      isActive ? "text-purple" : "text-ink hover:text-purple",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ),
          )}
        </nav>
        <div className="mt-auto flex flex-col gap-3 pt-8">
          <Button to="/favorites" variant="outline" onClick={onClose}>
            <Heart className="mr-2 inline h-4 w-4" aria-hidden="true" />
            Favorites
          </Button>
          <Button to="/contact" arrow size="lg" onClick={onClose}>
            Get Involved
          </Button>
        </div>
      </motion.aside>
    </>
  );
}

/**
 * Sticky 72px site header: transparent at the top, glass (white/70 + blur + hairline) once scrolled.
 * Desktop: wordmark, centre NavLinks with an animated active pill, favorites heart with count badge,
 * magnetic "Get Involved". Below lg: heart + hamburger opening a right-hand drawer.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[72px] border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-ink/5 bg-white/70 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-full items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "relative rounded-pill px-4 py-2 text-[15px] font-medium transition-colors",
                  isActive ? "text-purple" : "text-ink-700 hover:text-ink",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-pill bg-purple/10"
                      transition={
                        reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }
                      }
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <FavoritesLink />
          <Button to="/contact" magnetic arrow className="hidden lg:inline-flex">
            Get Involved
          </Button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-ink/5 lg:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence>{open && <Drawer onClose={() => setOpen(false)} />}</AnimatePresence>
    </header>
  );
}
