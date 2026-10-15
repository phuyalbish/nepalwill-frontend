import Skeleton from "@/components/ui/Skeleton";

const HEIGHTS = ["aspect-[3/2]", "aspect-[4/5]", "aspect-square", "aspect-[5/4]", "aspect-[3/4]", "aspect-[3/2]"];

export default function GallerySkeleton() {
  return (
    <div role="status" aria-label="Loading photos" className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {HEIGHTS.map((ratio, i) => (
        <Skeleton key={i} className={`mb-4 w-full break-inside-avoid rounded-card ${ratio}`} />
      ))}
    </div>
  );
}
