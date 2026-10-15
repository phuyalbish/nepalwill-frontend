import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import HeartButton from "@/components/ui/HeartButton";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import Avatar from "./Avatar";
import { CATEGORY_LABEL, detailPath, favoriteItem, formatDate } from "./storyUtils";

/** Grid card used by the blog list and the "More stories" rail. Stretched title link, heart above it. */
export default function BlogCard({ story }) {
  const tags = (story.tags || []).slice(0, 2);
  return (
    <Card as="article" glow tilt className="flex h-full flex-col overflow-hidden">
      <div className="relative">
        <ImageWithFallback
          src={story.image_url}
          alt=""
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[16/10] w-full"
          imgClassName="transition-transform duration-700 group-hover/card:scale-105"
        />
        <Badge variant="mint" className="absolute left-4 top-4 shadow-soft">
          {CATEGORY_LABEL[story.category] ?? "Story"}
        </Badge>
        <HeartButton
          item={favoriteItem(story)}
          size="sm"
          className="absolute right-4 top-4 z-10"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Tags">
            {tags.map((tag) => (
              <li key={tag}>
                <Badge className="px-2.5 py-1 text-[10px]">{tag}</Badge>
              </li>
            ))}
          </ul>
        )}
        <h3 className="text-lg font-bold leading-snug text-ink">
          <Link
            to={detailPath(story)}
            className="rounded-chip after:absolute after:inset-0 after:content-[''] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
          >
            {story.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-6 text-muted">{story.excerpt}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-ink/5 pt-4 text-sm text-muted">
          <span className="flex min-w-0 items-center gap-2">
            <Avatar name={story.author} size="sm" />
            <span className="truncate">{story.author}</span>
          </span>
          <span className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {formatDate(story.published_at, { month: "short", day: "numeric" })}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {story.read_time} min
            </span>
          </span>
        </div>
      </div>
    </Card>
  );
}
