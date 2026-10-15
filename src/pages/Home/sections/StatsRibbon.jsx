import { motion, useReducedMotion } from "framer-motion";
import { useGetSiteQuery } from "@/api/nepalwillApi";
import CountUp from "@/components/ui/CountUp";
import Skeleton from "@/components/ui/Skeleton";
import { cn } from "@/lib/cn";
import DataState from "../components/DataState";

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/** Film grain that drifts in steps, plus a slow diagonal light streak. Transform only. */
function Atmosphere({ reduced }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -inset-1/2 opacity-[0.08] mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
        animate={reduced ? undefined : { x: [0, -48, 24, -16, 0], y: [0, 32, -40, 16, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />
      <span
        className={cn(
          "absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent",
          !reduced && "animate-streak",
        )}
      />
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-10 lg:grid-cols-4" role="status" aria-label="Loading numbers">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="flex flex-col items-center gap-3">
          <Skeleton className="h-12 w-28 !bg-white/10" />
          <Skeleton className="h-3.5 w-24 !bg-white/10" />
        </div>
      ))}
    </div>
  );
}

/** Dark gradient ribbon with the four headline numbers. */
export default function StatsRibbon() {
  const query = useGetSiteQuery();
  const reduced = useReducedMotion();
  const stats = [...(query.data?.stats ?? [])].sort((a, b) => a.order - b.order).slice(0, 4);

  return (
    <section
      aria-label="NepalWill in numbers"
      className="relative overflow-hidden bg-ink-gradient py-14 text-white md:py-20"
    >
      <Atmosphere reduced={reduced} />
      <div className="container-page relative z-10">
        <DataState query={query} skeleton={<StatsSkeleton />} errorTitle="Could not load our numbers">
          {stats.length > 0 && (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id ?? stat.key} className="flex flex-col-reverse items-center gap-2">
                  <dt className="text-sm tracking-wide text-white/60">{stat.label}</dt>
                  <dd className="font-display text-5xl leading-none text-mint md:text-6xl">
                    <CountUp
                      to={stat.value}
                      suffix={stat.suffix || (Number(stat.value) >= 10 ? "+" : "")}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </DataState>
      </div>
    </section>
  );
}
