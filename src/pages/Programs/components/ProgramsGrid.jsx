import { Sparkles } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import StaggerGrid, { StaggerItem } from "@/components/ui/StaggerGrid";
import ProgramCard from "./ProgramCard";

const GRID = "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

function GridSkeleton() {
  return (
    <div className={GRID} role="status" aria-label="Loading programs">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="overflow-hidden rounded-card border border-line bg-white">
          <Skeleton className="h-44 w-full !rounded-none" />
          <div className="flex flex-col gap-3 p-6 pt-10">
            <Skeleton className="h-5 w-32 !rounded-pill" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** The six program cards with loading, error and empty states. `query` is the RTK Query result. */
export default function ProgramsGrid({ query }) {
  const { data, isLoading, isError, error, refetch } = query;
  let body;
  if (isLoading) body = <GridSkeleton />;
  else if (isError)
    body = <ErrorState className={GRID} error={error} title="We could not load programs" onRetry={refetch} />;
  else if (!data?.length)
    body = (
      <EmptyState
        className={GRID}
        icon={Sparkles}
        title="No programs yet"
        description="New programs are on the way. Check back soon."
      />
    );
  else
    body = (
      <StaggerGrid className={GRID}>
        {data.map((program) => (
          <StaggerItem key={program.slug} className="h-full">
            <ProgramCard program={program} />
          </StaggerItem>
        ))}
      </StaggerGrid>
    );

  return (
    <Section id="programs">
      <SectionHeading eyebrow="NepalWill" title="Our" accent="Programs" align="left" />
      {body}
    </Section>
  );
}
