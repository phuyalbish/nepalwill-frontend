import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { EASE_OUT } from "@/lib/motion";

/**
 * Dark hero band with a full-bleed image, scrim, breadcrumb and slot for the title block.
 * @param {{label:string,to?:string}[]} crumbs  last item is the current page (no `to`)
 */
export default function DetailHero({ image, crumbs, children }) {
  const reduced = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ scale: reduced ? 1 : 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: EASE_OUT }}
      >
        <ImageWithFallback
          src={image}
          alt=""
          priority
          width={1600}
          className="h-full w-full !bg-ink-700"
          imgClassName="opacity-60"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-scrim" aria-hidden="true" />
      <div className="container-page flex min-h-[340px] flex-col justify-between gap-12 pb-10 pt-8 md:min-h-[440px] md:pb-14">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
            {crumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex min-w-0 items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                {crumb.to ? (
                  <Link
                    to={crumb.to}
                    className="rounded-md outline-none transition-colors hover:text-white focus-visible:ring-4 focus-visible:ring-mint/60"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="truncate text-white">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl">{children}</div>
      </div>
    </section>
  );
}
