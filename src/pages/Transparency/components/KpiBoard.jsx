import { useGetSiteQuery } from "@/api/nepalwillApi";
import { findStat } from "@/lib/stats";
import Card from "@/components/ui/Card";
import CountUp from "@/components/ui/CountUp";
import StaggerGrid, { StaggerItem } from "@/components/ui/StaggerGrid";
import { KPIS } from "./transparencyData";

/** Four headline numbers. In-kind items and schools reached come from /api/site/; the rest are fixed claims. */
export default function KpiBoard() {
  const { data } = useGetSiteQuery();
  const kpis = KPIS.map((kpi) => {
    const stat = kpi.statKey ? findStat(data?.stats, kpi.statKey) : undefined;
    return stat ? { ...kpi, to: stat.value, suffix: stat.suffix } : kpi;
  });
  return (
    <StaggerGrid className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4" role="group" aria-label="Key figures">
      {kpis.map((kpi) => (
        <StaggerItem key={kpi.id}>
          <Card hover={false} className="flex h-full flex-col items-center gap-2 px-4 py-8 text-center">
            <CountUp
              to={kpi.to}
              prefix={kpi.prefix}
              suffix={kpi.suffix}
              className={`font-display text-5xl leading-none ${kpi.tone}`}
            />
            <span className="text-sm text-muted">{kpi.label}</span>
          </Card>
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
