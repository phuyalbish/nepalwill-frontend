import { Link } from "react-router-dom";
import { ChevronRight, Clock, MapPin } from "lucide-react";
import Card from "@/components/ui/Card";
import HeartButton from "@/components/ui/HeartButton";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { MONTH_NAMES, formatTime, parseISODate } from "../utils";

/**
 * Event teaser. One stretched link covers the card; the heart sits above it.
 * @param {object} event  API event
 * @param {boolean} selected  purple 2px border
 */
export default function EventCard({ event, selected, ...rest }) {
  const { month, day } = parseISODate(event.date);
  const monthShort = MONTH_NAMES[month].slice(0, 3).toUpperCase();

  return (
    <Card
      as="article"
      selected={selected}
      className="overflow-hidden hover:border-purple hover:ring-1 hover:ring-purple"
      {...rest}
    >
      <div className="relative">
        <ImageWithFallback
          src={event.image_url}
          alt={`${event.title} event`}
          className="aspect-[4/3] w-full"
          imgClassName="transition-transform duration-700 group-hover/card:scale-105"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-3 flex h-[52px] w-[48px] flex-col items-center justify-center rounded-chip bg-white shadow-soft"
        >
          <span className="text-[10px] font-bold leading-none tracking-wider text-purple">
            {monthShort}
          </span>
          <span className="mt-0.5 text-xl font-bold leading-none text-ink">{day}</span>
        </div>
        <HeartButton
          size="sm"
          className="absolute right-3 top-3 z-10"
          item={{
            type: "event",
            slug: event.slug,
            title: event.title,
            image_url: event.image_url,
            date: event.date,
            subtitle: event.location,
          }}
        />
      </div>

      <div className="flex flex-col gap-2.5 p-5">
        <h3 className="text-lg font-bold leading-snug text-ink">{event.title}</h3>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {event.location}
          </span>
          {event.start_time && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {formatTime(event.start_time)}
            </span>
          )}
        </p>
        <p className="line-clamp-2 text-[15px] leading-6 text-ink-700">{event.description}</p>
        <Link
          to={`/events/${event.slug}`}
          className="mt-1 inline-flex items-center gap-1 self-start rounded text-[15px] font-bold text-purple after:absolute after:inset-0 after:rounded-card after:content-[''] hover:text-purple-600"
        >
          View Details
          <span className="sr-only"> for {event.title}</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
