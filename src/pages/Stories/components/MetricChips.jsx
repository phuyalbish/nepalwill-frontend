import Chip from "@/components/ui/Chip";
import { cn } from "@/lib/cn";
import { metricList, splitMetric } from "./storyUtils";

/** Metric chips: a leading number is the purple value, the rest is the muted label. */
export default function MetricChips({ story, max = 3, className }) {
  const metrics = metricList(story, max);
  if (metrics.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Highlights">
      {metrics.map((text) => {
        const { value, label } = splitMetric(text);
        return (
          <li key={text}>
            <Chip
              value={value}
              label={label}
              className="gap-1.5 [&>strong:empty]:hidden [&>span:empty]:hidden"
            />
          </li>
        );
      })}
    </ul>
  );
}
