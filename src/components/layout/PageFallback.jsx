import Skeleton from "@/components/ui/Skeleton";

/** Minimal Suspense fallback shown while a lazy page chunk loads. */
export default function PageFallback() {
  return (
    <div className="container-page py-24" role="status" aria-label="Loading page">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="mt-4 h-4 w-2/3" />
      </div>
    </div>
  );
}
