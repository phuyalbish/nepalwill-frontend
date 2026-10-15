import { BookX } from "lucide-react";
import { useGetStoriesQuery } from "@/api/nepalwillApi";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Skeleton from "@/components/ui/Skeleton";
import StaggerGrid, { StaggerItem } from "@/components/ui/StaggerGrid";
import DataState from "../components/DataState";
import StoryCard from "../components/StoryCard";

function StoriesSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2" role="status" aria-label="Loading stories">
      {Array.from({ length: 4 }, (_, i) => (
        <Skeleton key={i} className="h-[380px] w-full rounded-card md:h-[360px]" />
      ))}
    </div>
  );
}

/** Featured stories first, then the rest, four cards in total. */
const pickFour = (stories) =>
  [...stories].sort((a, b) => Number(b.is_featured) - Number(a.is_featured)).slice(0, 4);

export default function Stories() {
  const query = useGetStoriesQuery({ kind: "story" });
  const stories = pickFour(query.data ?? []);

  return (
    <Section id="stories">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          align="left"
          eyebrow="Stories"
          title="The people behind the numbers"
          className="max-w-xl"
        />
        <Button to="/stories" variant="ghost">
          View all stories
        </Button>
      </div>
      <div className="mt-10 md:mt-14">
        <DataState query={query} skeleton={<StoriesSkeleton />} errorTitle="Could not load stories">
          {stories.length === 0 ? (
            <EmptyState
              icon={BookX}
              title="No stories yet"
              description="Stories from volunteers and students will appear here."
            />
          ) : (
            <StaggerGrid className="grid gap-6 [perspective:1200px] md:grid-cols-2">
              {stories.map((story) => (
                <StaggerItem key={story.slug}>
                  <StoryCard story={story} />
                </StaggerItem>
              ))}
            </StaggerGrid>
          )}
        </DataState>
      </div>
    </Section>
  );
}
