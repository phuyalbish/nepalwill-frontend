import Card from "@/components/ui/Card";
import CountUp from "@/components/ui/CountUp";
import StaggerGrid, { StaggerItem } from "@/components/ui/StaggerGrid";
import { KPIS } from "./transparencyData";

/** Four headline numbers. Figures are the published totals from the blueprint. */
export default function KpiBoard() {
  return (
    <StaggerGrid className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4" role="group" aria-label="Key figures">
      {KPIS.map((kpi) => (
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
