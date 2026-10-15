import { Link } from "react-router-dom";
import { CalendarDays, Clock, HandHeart, MapPin } from "lucide-react";
import { useGetProgramQuery } from "@/api/nepalwillApi";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import HeartButton from "@/components/ui/HeartButton";
import DetailHero from "@/pages/Programs/components/DetailHero";
import { formatLongDate, formatTimeRange } from "./eventFormat";

function Meta({ icon: Icon, children }) {
  return (
    <li className="flex items-center gap-2 text-[15px] text-white/85">
      <Icon className="h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

function humanize(slug) {
  return slug.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());
}

/** Small "Part of <Program>" link; uses the program title once loaded, a humanized slug until then. */
function PartOf({ slug }) {
  const { data } = useGetProgramQuery(slug);
  return (
    <p className="mt-3 text-sm text-white/70">
      Part of{" "}
      <Link
        to={`/programs/${slug}`}
        className="rounded-md font-bold text-mint underline-offset-4 outline-none hover:underline focus-visible:ring-4 focus-visible:ring-mint/60"
      >
        {data?.title ?? humanize(slug)}
      </Link>
    </p>
  );
}

/** Hero band with the key facts and the favorite toggle. */
export default function EventHeader({ event }) {
  const time = formatTimeRange(event.start_time, event.end_time);
  return (
    <DetailHero
      image={event.image_url}
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Events", to: "/#events" },
        { label: event.title },
      ]}
    >
      <div className="flex items-center gap-3">
        <Badge variant="mint">Event</Badge>
        <HeartButton
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
      <h1 className="h-display mt-4 !text-white">{event.title}</h1>
      {event.program_slug && <PartOf slug={event.program_slug} />}
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
        <Meta icon={CalendarDays}>{formatLongDate(event.date)}</Meta>
        {time && <Meta icon={Clock}>{time}</Meta>}
        <Meta icon={MapPin}>{event.location}</Meta>
        {event.volunteers_needed > 0 && (
          <Meta icon={HandHeart}>{event.volunteers_needed} volunteers needed</Meta>
        )}
      </ul>
      <Button href="#register" size="md" className="mt-7 lg:hidden">
        Register now
      </Button>
    </DetailHero>
  );
}
