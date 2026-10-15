import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, Package, Users } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { STATUS_BADGE } from "./transparencyData";
import { formatRecordDate, impactText } from "./recordUtils";

/** Stacked cards for phones, one per record. */
export default function RecordCards({ records }) {
  const reduced = useReducedMotion();
  return (
    <ul className="flex flex-col gap-4 md:hidden">
      {records.map((r, i) => {
        const badge = STATUS_BADGE[r.status] ?? STATUS_BADGE.in_transit;
        return (
          <motion.li
            key={r.id}
            className="rounded-card border border-line bg-white p-5 shadow-soft"
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(i, 6) * 0.05 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-chip bg-mint-50 text-success-strong">
                  <Package className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-bold leading-snug text-ink">{r.item_name}</h3>
              </div>
              <Badge variant={badge.variant} className="shrink-0">
                {badge.label}
              </Badge>
            </div>
            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-field bg-sage-50/70 px-3 py-2.5 text-sm text-ink-700">
              <span className="font-medium text-ink">{r.donor_name}</span>
              <ArrowRight className="h-3.5 w-3.5 text-mint-strong" aria-label="to" />
              <span>NepalWill</span>
              <ArrowRight className="h-3.5 w-3.5 text-mint-strong" aria-label="to" />
              <span className="font-medium text-success-strong">{r.recipient}</span>
            </p>
            <dl className="mt-4 grid gap-2 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
                <dt className="sr-only">Impact</dt>
                <dd>
                  <strong className="text-ink">{impactText(r)}</strong>, {r.impact_label.toLowerCase()}
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
                <dt className="sr-only">Date</dt>
                <dd>{formatRecordDate(r.date)}</dd>
              </div>
            </dl>
          </motion.li>
        );
      })}
    </ul>
  );
}
