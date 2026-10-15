import { useParams } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import ErrorState from "@/components/ui/ErrorState";
import Skeleton from "@/components/ui/Skeleton";
import { useGetProgramQuery } from "@/api/nepalwillApi";
import DetailHero from "./components/DetailHero";
import DetailNotFound from "./components/DetailNotFound";
import ProgramBody from "./components/ProgramBody";
import ProgramSidebar from "./components/ProgramSidebar";
import ContributeCta from "./components/ContributeCta";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

function DetailSkeleton() {
  return (
    <div role="status" aria-label="Loading program">
      <Skeleton className="h-[340px] w-full !rounded-none md:h-[440px]" />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-72 w-full !rounded-card" />
      </div>
    </div>
  );
}

export default function ProgramDetail() {
  const { slug } = useParams();
  const { data: program, isLoading, isError, error, refetch } = useGetProgramQuery(slug);
  useDocumentTitle(program?.title ?? (error?.status === 404 ? "Program not found" : null));

  if (isLoading) return <DetailSkeleton />;
  if (isError && error?.status === 404)
    return (
      <DetailNotFound
        title="Program not found"
        description="We could not find that program. It may have moved, or the link may be mistyped."
        backTo="/programs"
        backLabel="See all programs"
      />
    );
  if (isError)
    return (
      <div className="container-page py-20">
        <ErrorState as="h1" error={error} title="We could not load this program" onRetry={refetch} />
      </div>
    );

  return (
    <>
      <DetailHero
        image={program.image_url}
        crumbs={[{ label: "Programs", to: "/programs" }, { label: program.title }]}
      >
        <Badge variant="mint">{program.stat_label}</Badge>
        <h1 className="h-display mt-4 !text-white">{program.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">{program.short_description}</p>
      </DetailHero>

      <div className="container-page grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
        {/* On mobile this wrapper dissolves so order puts the sidebar above the CTA. */}
        <div className="contents lg:block">
          <div className="order-1 min-w-0">
            <ProgramBody program={program} />
          </div>
          <div className="order-3 min-w-0 lg:order-none">
            <ContributeCta program={program} />
          </div>
        </div>
        <aside className="order-2 min-w-0" aria-label="Quick facts">
          <ProgramSidebar program={program} />
        </aside>
      </div>
    </>
  );
}
