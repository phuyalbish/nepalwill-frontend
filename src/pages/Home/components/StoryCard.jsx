import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import HeartButton from "@/components/ui/HeartButton";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { CATEGORY_LABELS, splitMetric } from "../utils";
import Avatar from "./Avatar";

/** Image story card with a dark scrim, tilt and glow. One stretched link on the title. */
export default function StoryCard({ story }) {
  const metric = splitMetric(story.metric_tag);
  const lifeChanged = story.category === "life_changed";

  return (
    <Card
      as="article"
      tilt
      glow
      className="flex min-h-[380px] flex-col justify-end overflow-hidden border-transparent bg-ink md:min-h-[360px]"
    >
      <ImageWithFallback
        src={story.image_url}
        alt=""
        fill
        imgClassName="transition-transform duration-700 group-hover/card:scale-105"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-scrim" />
      <HeartButton
        size="sm"
        className="absolute right-4 top-4 z-10"
        item={{
          type: "story",
          slug: story.slug,
          title: story.title,
          image_url: story.image_url,
          subtitle: story.author,
        }}
      />

      <div className="relative flex flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant={lifeChanged ? "purple" : "mint"}
            className={lifeChanged ? "!bg-purple !text-white" : undefined}
          >
            {CATEGORY_LABELS[story.category] ?? story.category}
          </Badge>
          {(metric.value || metric.label) && <Chip value={metric.value} label={metric.label} className="py-1 text-xs" />}
        </div>
        <h3 className="font-display text-2xl leading-tight text-white md:text-[28px]">
          <Link
            to={`/stories/${story.slug}`}
            className="rounded after:absolute after:inset-0 after:rounded-card after:content-['']"
          >
            {`“${story.title}”`}
          </Link>
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/80">
          <Avatar name={story.author} className="h-8 w-8 text-[11px]" />
          <span className="font-bold text-white">{story.author}</span>
          {story.author_role && <span className="text-white/60">{story.author_role}</span>}
          {story.read_time ? (
            <span className="inline-flex items-center gap-1 text-white/60">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {story.read_time} min read
            </span>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
