import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Skeleton, { SkeletonText } from "@/components/ui/Skeleton";
import { useGetStoryQuery } from "@/api/nepalwillApi";
import ArticleBody from "./ArticleBody";
import ArticleHero from "./ArticleHero";
import ArticleMeta from "./ArticleMeta";
import ReadingProgress from "./ReadingProgress";
import RelatedStories from "./RelatedStories";
import ShareBar from "./ShareBar";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const LIST = {
  story: { to: "/stories", back: "All stories", noun: "story" },
  blog: { to: "/blog", back: "All posts", noun: "post" },
};

function ArticleSkeleton() {
  return (
    <div role="status" aria-label="Loading article">
      <Skeleton className="min-h-[340px] w-full rounded-hero md:min-h-[480px]" />
      <div className="mt-8 flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-10 w-48" />
      </div>
      <SkeletonText lines={6} className="mt-10 max-w-[68ch]" />
    </div>
  );
}

/** Shared story and blog article. kind only changes the back link, copy and 404 text. */
export default function ArticlePage({ kind }) {
  const { slug } = useParams();
  const articleRef = useRef(null);
  const copy = LIST[kind];
  const { data: story, error, isLoading, refetch } = useGetStoryQuery(slug);
  const notFound = error?.status === 404;
  useDocumentTitle(story?.title ?? (notFound ? "Not found" : null));

  return (
    <div className="container-page max-w-5xl pb-20 pt-8 md:pb-28 md:pt-12">
      <Link
        to={copy.to}
        className="mb-6 inline-flex items-center gap-2 rounded-pill text-sm font-medium text-ink-700 hover:text-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {copy.back}
      </Link>

      {isLoading && <ArticleSkeleton />}
      {notFound && (
        <EmptyState
          as="h1"
          icon={SearchX}
          title={`We could not find that ${copy.noun}`}
          description="It may have been moved or unpublished. The full list is a click away."
          action={<Button to={copy.to}>Browse all {kind === "blog" ? "posts" : "stories"}</Button>}
        />
      )}
      {error && !notFound && (
        <ErrorState as="h1" error={error} onRetry={refetch} title={`We could not load this ${copy.noun}`} />
      )}

      {story && (
        <>
          <ArticleHero story={story} />
          <ArticleMeta story={story} />
          <article ref={articleRef} className="mx-auto mt-12 max-w-[68ch] text-[1.0625rem] md:text-lg">
            <ArticleBody content={story.content} />
            <div className="mt-12 flex flex-col gap-4 border-t border-ink/5 pt-8">
              <p className="font-display text-2xl text-ink">Enjoyed this? Pass it on.</p>
              <ShareBar title={story.title} />
            </div>
          </article>
          <ReadingProgress target={articleRef} />
          <RelatedStories story={story} />
        </>
      )}
    </div>
  );
}
