import { useMemo, useState } from "react";
import { ImageOff } from "lucide-react";
import { useGetGalleryQuery } from "@/api/nepalwillApi";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoryChips from "./components/CategoryChips";
import GalleryGrid from "./components/GalleryGrid";
import GallerySkeleton from "./components/GallerySkeleton";
import { categoriesOf } from "./components/galleryUtils";

export default function Gallery() {
  const { data, isLoading, isError, error, refetch } = useGetGalleryQuery();
  const [category, setCategory] = useState("");

  const items = useMemo(
    () => [...(data ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [data],
  );
  const categories = useMemo(() => categoriesOf(items), [items]);
  const visible = useMemo(
    () => (category ? items.filter((item) => item.category === category) : items),
    [items, category],
  );
  const counts = useMemo(() => {
    const result = { total: items.length };
    for (const item of items) result[item.category] = (result[item.category] ?? 0) + 1;
    return result;
  }, [items]);

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] max-w-full -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(153_242_200/0.3),transparent)]"
      />
      <div className="container-page relative">
        <SectionHeading
          as="h1"
          eyebrow="NepalWill"
          title="Our"
          accent="Gallery."
          subtitle="Moments captured from our programs, events, and community activities across Nepal."
        />

        {categories.length > 1 && (
          <div className="mt-10">
            <CategoryChips options={categories} value={category} onChange={setCategory} counts={counts} />
          </div>
        )}

        <div className="mt-10 md:mt-12">
          {isLoading && <GallerySkeleton />}
          {isError && <ErrorState error={error} onRetry={refetch} title="We could not load the gallery" />}
          {!isLoading && !isError && visible.length === 0 && (
            <EmptyState
              icon={ImageOff}
              title="No photos here yet"
              description="New moments are added after every program and event."
              action={
                category && (
                  <Button variant="outline" size="sm" onClick={() => setCategory("")}>
                    Show all photos
                  </Button>
                )
              }
            />
          )}
          {visible.length > 0 && <GalleryGrid key={category || "all"} items={visible} allItems={items} />}
        </div>
      </div>
    </section>
  );
}
