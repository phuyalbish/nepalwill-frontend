import { useMemo, useState } from "react";
import { PackageSearch } from "lucide-react";
import { useGetContributionsQuery } from "@/api/nepalwillApi";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Skeleton from "@/components/ui/Skeleton";
import RecordCards from "./RecordCards";
import RecordTable from "./RecordTable";
import StatusFilter from "./StatusFilter";

/** Contribution log with status filter. Table on desktop, cards on phones. */
export default function RecordsSection() {
  const { data, isLoading, isError, error, refetch } = useGetContributionsQuery();
  const [status, setStatus] = useState("all");
  const records = useMemo(() => data ?? [], [data]);

  const counts = useMemo(
    () => ({
      all: records.length,
      delivered: records.filter((r) => r.status === "delivered").length,
      in_transit: records.filter((r) => r.status === "in_transit").length,
    }),
    [records],
  );
  const visible = useMemo(
    () => (status === "all" ? records : records.filter((r) => r.status === status)),
    [records, status],
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <StatusFilter value={status} onChange={setStatus} counts={counts} />
        <p role="status" aria-live="polite" className="text-sm text-muted">
          Showing {visible.length} of {records.length} records
        </p>
      </div>
      {isLoading && (
        <div role="status" aria-label="Loading records" className="flex flex-col gap-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-card" />
          ))}
        </div>
      )}
      {isError && <ErrorState error={error} onRetry={refetch} title="We could not load the records" />}
      {!isLoading && !isError && visible.length === 0 && (
        <EmptyState
          icon={PackageSearch}
          title="No records match"
          description="Try a different status filter."
        />
      )}
      {visible.length > 0 && (
        <div key={status}>
          <RecordTable records={visible} />
          <RecordCards records={visible} />
        </div>
      )}
    </div>
  );
}
