import { useMemo } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerGrid, { StaggerItem } from "@/components/ui/StaggerGrid";
import { useGetStoriesQuery } from "@/api/nepalwillApi";
import BlogCard from "./BlogCard";

/** Three more of the same kind, same category first. Hidden when there is nothing else to show. */
export default function RelatedStories({ story }) {
  const { data = [] } = useGetStoriesQuery({ kind: story.kind });
  const related = useMemo(() => {
    const others = data.filter((s) => s.slug !== story.slug);
    const same = others.filter((s) => s.category === story.category);
    const rest = others.filter((s) => s.category !== story.category);
    return [...same, ...rest].slice(0, 3);
  }, [data, story]);

  if (related.length === 0) return null;
  const isBlog = story.kind === "blog";
  return (
    <section aria-labelledby="more-heading" className="mt-20 border-t border-ink/5 pt-16 md:mt-28">
      <SectionHeading
        eyebrow="Keep reading"
        title={isBlog ? "More from" : "More"}
        accent={isBlog ? "the blog." : "stories."}
        align="left"
        id="more-heading"
        className="mb-10"
      />
      <StaggerGrid className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {related.map((item) => (
          <StaggerItem key={item.slug}>
            <BlogCard story={item} />
          </StaggerItem>
        ))}
      </StaggerGrid>
      <p className="mt-10 text-center">
        <Link
          to={isBlog ? "/blog" : "/stories"}
          className="font-bold text-purple underline-offset-4 hover:underline"
        >
          {isBlog ? "See all blog posts" : "See all stories"}
        </Link>
      </p>
    </section>
  );
}
