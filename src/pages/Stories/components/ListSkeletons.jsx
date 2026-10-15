import Skeleton from "@/components/ui/Skeleton";

export function StoryRowsSkeleton() {
  return (
    <div role="status" aria-label="Loading stories" className="mx-auto max-w-5xl">
      {[0, 1].map((i) => (
        <div key={i} className="grid items-center gap-8 border-b border-ink/5 py-10 md:grid-cols-2 md:gap-12">
          <Skeleton className={`aspect-[4/3] w-full rounded-card ${i % 2 ? "md:order-2" : ""}`} />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-48 rounded-pill" />
            <Skeleton className="h-9 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-8 w-56 rounded-pill" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function BlogGridSkeleton() {
  return (
    <div role="status" aria-label="Loading posts" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="overflow-hidden rounded-card border border-line bg-white">
          <Skeleton className="aspect-[16/10] w-full rounded-none" />
          <div className="flex flex-col gap-3 p-6">
            <Skeleton className="h-5 w-20 rounded-pill" />
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
