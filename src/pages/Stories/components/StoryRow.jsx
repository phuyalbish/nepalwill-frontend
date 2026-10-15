import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Clock } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import HeartButton from "@/components/ui/HeartButton";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";
import Avatar from "./Avatar";
import MetricChips from "./MetricChips";
import { CATEGORY_LABEL, detailPath, favoriteItem } from "./storyUtils";

/** One zig-zag row: image and text swap sides on every other row from md up. */
export default function StoryRow({ story, index }) {
  const reduced = useReducedMotion();
  const flipped = index % 2 === 1;
  const to = detailPath(story);

  return (
    <motion.article
      className="grid items-center gap-8 border-b border-ink/5 py-10 md:grid-cols-2 md:gap-12 md:py-14 lg:gap-16"
      initial={{ opacity: 0, y: reduced ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
    >
      <Card
        glow
        tilt
        hover={false}
        className={cn("overflow-hidden rounded-card", flipped && "md:order-2")}
      >
        <ImageWithFallback
          src={story.image_url}
          alt={`${story.title}, by ${story.author}`}
          className="aspect-[4/3] w-full"
          imgClassName="transition-transform duration-700 group-hover/card:scale-105"
        />
        <Link
          to={to}
          tabIndex={-1}
          aria-hidden="true"
          className="absolute inset-0"
        />
        <Badge variant="mint" className="absolute left-4 top-4 z-10 shadow-soft">
          {CATEGORY_LABEL[story.category] ?? "Story"}
        </Badge>
        <HeartButton
          item={favoriteItem(story)}
          size="sm"
          className="absolute right-4 top-4 z-10"
        />
      </Card>

      <div className="flex flex-col items-start gap-5">
        <div className="flex items-center gap-3">
          <Avatar name={story.author} />
          <div className="leading-tight">
            <p className="font-bold text-ink">{story.author}</p>
            <p className="text-sm text-muted">{story.author_role}</p>
          </div>
        </div>
        <h2 className="font-display text-3xl leading-[1.15] text-ink md:text-[2.25rem]">
          <Link
            to={to}
            className="rounded-chip transition-colors hover:text-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple"
          >
            <span className="text-purple" aria-hidden="true">&ldquo;</span>
            {story.title}
            <span className="text-purple" aria-hidden="true">&rdquo;</span>
          </Link>
        </h2>
        <p className="max-w-xl leading-7 text-ink-700">{story.excerpt}</p>
        <MetricChips story={story} />
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Button variant="ghost" to={to} aria-label={`Read full story: ${story.title}`}>
            Read Full Story
          </Button>
          <span className="inline-flex items-center gap-1.5 text-sm text-muted">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {story.read_time} min read
          </span>
        </div>
      </div>
    </motion.article>
  );
}
