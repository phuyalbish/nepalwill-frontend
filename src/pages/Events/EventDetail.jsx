import { useParams } from "react-router-dom";
import ErrorState from "@/components/ui/ErrorState";
import Skeleton from "@/components/ui/Skeleton";
import { useGetEventQuery } from "@/api/nepalwillApi";
import DetailNotFound from "@/pages/Programs/components/DetailNotFound";
import EventBody from "./components/EventBody";
import EventHeader from "./components/EventHeader";
import RegistrationCard from "./components/RegistrationCard";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

function DetailSkeleton() {
  return (
    <div role="status" aria-label="Loading event">
      <Skeleton className="h-[340px] w-full !rounded-none md:h-[440px]" />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-96 w-full !rounded-card" />
      </div>
    </div>
  );
}

export default function EventDetail() {
  const { slug } = useParams();
  const { data: event, isLoading, isError, error, refetch } = useGetEventQuery(slug);
  useDocumentTitle(event?.title ?? (error?.status === 404 ? "Event not found" : null));

  if (isLoading) return <DetailSkeleton />;
  if (isError && error?.status === 404)
    return (
      <DetailNotFound
        title="Event not found"
        description="We could not find that event. It may have passed, or the link may be mistyped."
        backTo="/programs"
        backLabel="Browse programs"
      />
    );
  if (isError)
    return (
      <div className="container-page py-20">
        <ErrorState as="h1" error={error} title="We could not load this event" onRetry={refetch} />
      </div>
    );

  return (
    <>
      <EventHeader event={event} />
      <div className="container-page grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
        <div className="min-w-0">
          <EventBody event={event} />
        </div>
        <aside className="min-w-0" aria-label="Registration">
          <RegistrationCard event={event} />
        </aside>
      </div>
    </>
  );
}
