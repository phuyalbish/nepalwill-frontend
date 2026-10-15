import { Calendar, Clock } from "lucide-react";
import HeartButton from "@/components/ui/HeartButton";
import Avatar from "./Avatar";
import MetricChips from "./MetricChips";
import ShareBar from "./ShareBar";
import { favoriteItem, formatDate } from "./storyUtils";

/** Author block, read time, date, heart, metric chips and share links under the hero. */
export default function ArticleMeta({ story }) {
  return (
    <div className="mt-8 flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar name={story.author} size="lg" />
          <div className="leading-tight">
            <p className="font-bold text-ink">{story.author}</p>
            <p className="text-sm text-muted">{story.author_role}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <time dateTime={story.published_at}>{formatDate(story.published_at)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {story.read_time} min read
          </span>
          <HeartButton item={favoriteItem(story)} variant="plain" />
        </div>
      </div>
      <MetricChips story={story} max={4} />
      <ShareBar title={story.title} className="border-y border-ink/5 py-4" />
    </div>
  );
}
