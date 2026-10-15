import { Link } from "react-router-dom";
import { BookHeart } from "lucide-react";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerGrid, { StaggerItem } from "@/components/ui/StaggerGrid";
import Tabs from "@/components/ui/Tabs";
import { panelId, tabId } from "@/components/ui/tabIds";
import { useGetStoriesQuery } from "@/api/nepalwillApi";
import BlogCard from "./BlogCard";
import { BlogGridSkeleton, StoryRowsSkeleton } from "./ListSkeletons";
import StoryRow from "./StoryRow";
import { useStoryFilter } from "./useStoryFilter";

const TAB_PREFIX = "story-filter";

const COPY = {
  story: {
    eyebrow: "Stories",
    title: "Every number has a name.",
    accent: "Every name has a story.",
    subtitle:
      "Behind every book donated, every lesson taught, every laptop shipped, there is a human being who decided to show up. And on the other side, a child whose world got a little bigger. These are their stories, in their own words.",
    tabsLabel: "Filter stories",
    noun: "stories",
  },
  blog: {
    eyebrow: "NepalWill",
    title: "Blog &",
    accent: "Stories",
    subtitle: "Updates, stories, and insights from the NepalWill community.",
    tabsLabel: "Filter posts",
    noun: "posts",
  },
};

/** Shared list page. kind="story" renders zig-zag rows, kind="blog" a 3-column card grid. */
export default function StoryListPage({ kind }) {
  const copy = COPY[kind];
  const query = useGetStoriesQuery({ kind });
  const { filter, setFilter, tabs, visible } = useStoryFilter(query.data ?? []);
  const loading = query.isLoading;

  return (
    <>
      <header className="relative overflow-hidden pb-12 pt-16 md:pb-16 md:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] max-w-full -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(153_242_200/0.35),transparent)]"
        />
        <div className="container-page relative">
          <SectionHeading
            as="h1"
            eyebrow={copy.eyebrow}
            title={copy.title}
            accent={copy.accent}
            subtitle={copy.subtitle}
            className="max-w-3xl"
          />
        </div>
      </header>

      <Tabs
        sticky
        tabs={tabs}
        value={filter}
        onChange={setFilter}
        label={copy.tabsLabel}
        idPrefix={TAB_PREFIX}
      />

      <div
        role="tabpanel"
        id={panelId(TAB_PREFIX, filter)}
        aria-labelledby={tabId(TAB_PREFIX, filter)}
        className="container-page pb-20 pt-6 md:pb-28"
      >
        {loading && (kind === "story" ? <StoryRowsSkeleton /> : <BlogGridSkeleton />)}
        {query.isError && (
          <ErrorState
            className="mt-10"
            error={query.error}
            onRetry={query.refetch}
            title={`We could not load the ${copy.noun}`}
          />
        )}
        {!loading && !query.isError && visible.length === 0 && (
          <EmptyState
            className="mt-10"
            icon={BookHeart}
            title={`No ${copy.noun} here yet`}
            description="Try another filter, or check back soon."
            action={
              filter !== "all" && (
                <Button variant="outline" size="sm" onClick={() => setFilter("all")}>
                  Show all
                </Button>
              )
            }
          />
        )}
        {!loading && visible.length > 0 && kind === "story" && (
          <div key={filter} className="mx-auto max-w-5xl">
            {visible.map((story, i) => (
              <StoryRow key={story.slug} story={story} index={i} />
            ))}
          </div>
        )}
        {!loading && visible.length > 0 && kind === "blog" && (
          <StaggerGrid key={filter} className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((story) => (
              <StaggerItem key={story.slug}>
                <BlogCard story={story} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </div>

      {kind === "story" && (
        <section className="bg-ink-gradient py-16 text-center text-white md:py-20">
          <div className="container-page flex flex-col items-center gap-5">
            <h2 className="font-display text-4xl md:text-5xl">
              Your story belongs <em className="text-mint">here too.</em>
            </h2>
            <p className="max-w-xl text-white/70">
              Whether you want to contribute your skills, donate materials, or share how NepalWill
              changed your life, we want to hear from you.
            </p>
            <Button to="/contact" magnetic size="lg" arrow>
              Share Your Story
            </Button>
            <Link to="/blog" className="text-sm text-white/60 underline-offset-4 hover:text-white hover:underline">
              Or read the blog
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
