import { useRef, useState } from "react";
import { CalendarX } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useGetEventsQuery } from "@/api/nepalwillApi";
import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Skeleton from "@/components/ui/Skeleton";
import Calendar from "../components/Calendar";
import DataState from "../components/DataState";
import EventCard from "../components/EventCard";

function EventsSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]" role="status" aria-label="Loading events">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-[290px] w-full rounded-card" />
        <Skeleton className="h-14 w-full rounded-card" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-[420px] w-full rounded-card" />
        ))}
      </div>
    </div>
  );
}

/** Calendar plus a scrollable grid of upcoming event cards. */
export default function Events() {
  const query = useGetEventsQuery({ upcoming: 1 });
  const reduced = useReducedMotion();
  const listRef = useRef(null);
  const events = query.data ?? [];
  const [picked, setPicked] = useState(null);
  const selectedSlug = picked ?? events[0]?.slug;

  const jumpTo = (event) => {
    setPicked(event.slug);
    const list = listRef.current;
    const card = list ? [...list.children].find((el) => el.dataset.slug === event.slug) : null;
    if (!list || !card) return;
    const behavior = reduced ? "auto" : "smooth";
    list.scrollTo({ top: Math.max(card.offsetTop - 8, 0), behavior });
    if (window.matchMedia("(max-width: 1023px)").matches) {
      list.scrollIntoView({ behavior, block: "start" });
    }
  };

  return (
    <Section id="events">
      <SectionHeading
        eyebrow="NepalWill"
        title="Upcoming Events"
        subtitle="Join us in making a difference through community programs and events."
      />
      <div className="mt-12 md:mt-16">
        <DataState query={query} skeleton={<EventsSkeleton />} errorTitle="Could not load events">
          {events.length === 0 ? (
            <EmptyState
              icon={CalendarX}
              title="No upcoming events right now"
              description="New community events are added often. Check back soon."
            />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <Calendar events={events} selectedSlug={selectedSlug} onSelect={jumpTo} />
              </div>
              <div
                ref={listRef}
                role="region"
                aria-label="Upcoming events"
                tabIndex={0}
                className="relative -m-2 grid max-h-[720px] gap-6 overflow-y-auto p-2 sm:grid-cols-2 lg:max-h-[900px]"
              >
                {events.map((event) => (
                  <EventCard
                    key={event.slug}
                    event={event}
                    selected={event.slug === selectedSlug}
                    data-slug={event.slug}
                  />
                ))}
              </div>
            </div>
          )}
        </DataState>
      </div>
    </Section>
  );
}
