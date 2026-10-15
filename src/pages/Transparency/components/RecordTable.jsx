import { motion, useReducedMotion } from "framer-motion";
import { Package } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { STATUS_BADGE } from "./transparencyData";
import { formatRecordDate, impactText } from "./recordUtils";

const HEAD = ["Item", "Donor", "Recipient school", "Impact", "Status", "Date"];

/** Desktop table. The scroll container lives here so only the table scrolls sideways. */
export default function RecordTable({ records }) {
  const reduced = useReducedMotion();
  return (
    <div
      role="region"
      aria-label="Contribution records table, scrollable"
      tabIndex={0}
      className="hidden overflow-x-auto rounded-card border border-line bg-white shadow-soft md:block"
    >
      <table className="w-full min-w-[820px] border-collapse text-left text-sm">
        <caption className="sr-only">Recent in-kind contribution records</caption>
        <thead>
          <tr className="border-b border-line bg-sage-50/60 text-xs uppercase tracking-[0.14em] text-muted">
            {HEAD.map((h) => (
              <th key={h} scope="col" className="px-5 py-4 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => {
            const badge = STATUS_BADGE[r.status] ?? STATUS_BADGE.in_transit;
            return (
              <motion.tr
                key={r.id}
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.04 }}
                className="border-b border-line/70 last:border-0 hover:bg-mint-50/40"
              >
                <th scope="row" className="px-5 py-4 font-normal">
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-chip bg-mint-50 text-success-strong">
                      <Package className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="font-bold text-ink">{r.item_name}</span>
                  </span>
                </th>
                <td className="px-5 py-4 text-ink-700">{r.donor_name}</td>
                <td className="px-5 py-4 text-ink-700">{r.recipient}</td>
                <td className="px-5 py-4">
                  <span className="block font-bold text-ink">{impactText(r)}</span>
                  <span className="block text-xs text-muted">{r.impact_label}</span>
                </td>
                <td className="px-5 py-4">
                  <Badge variant={badge.variant}>{badge.label}</Badge>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-ink-700">{formatRecordDate(r.date)}</td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
