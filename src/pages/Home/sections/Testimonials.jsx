import { Quote } from "lucide-react";
import { useGetSiteQuery } from "@/api/nepalwillApi";
import Marquee from "@/components/ui/Marquee";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Skeleton from "@/components/ui/Skeleton";
import Avatar from "../components/Avatar";
import DataState from "../components/DataState";

function QuoteCard({ item }) {
  return (
    <figure className="flex w-[300px] shrink-0 flex-col justify-between gap-6 rounded-card border border-line bg-white p-6 shadow-soft md:w-[360px]">
      <Quote className="h-7 w-7 text-purple/25" aria-hidden="true" />
      <blockquote className="-mt-2 text-[15px] italic leading-7 text-ink-700">
        {`“${item.quote}”`}
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <Avatar name={item.name} src={item.image_url} />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-ink">{item.name}</p>
          <p className="truncate text-xs text-muted">{item.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function TestimonialsSkeleton() {
  return (
    <div className="flex flex-col gap-6 overflow-hidden" role="status" aria-label="Loading testimonials">
      {[0, 1].map((row) => (
        <div key={row} className="flex gap-6">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-[200px] w-[300px] shrink-0 rounded-card md:w-[360px]" />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Pad a short list so each marquee half is wider than a wide screen. */
const fill = (list, min = 6) =>
  list.length ? Array.from({ length: Math.max(list.length, min) }, (_, i) => list[i % list.length]) : [];

/** Two quote marquees moving in opposite directions. */
export default function Testimonials() {
  const query = useGetSiteQuery();
  const items = [...(query.data?.testimonials ?? [])].sort((a, b) => a.order - b.order);
  const rowOne = fill(items);
  const rowTwo = fill([...items].reverse());

  return (
    <Section id="testimonials" tone="sage" contained={false} className="overflow-hidden">
      <div className="container-page">
        <SectionHeading
          eyebrow="NepalWill"
          title="What People Say"
          subtitle="Hear from our community: parents, teachers, volunteers, and partners."
        />
      </div>
      <div className="mt-12 flex flex-col gap-6 md:mt-16">
        <DataState query={query} skeleton={<TestimonialsSkeleton />} errorTitle="Could not load testimonials" className="container-page mx-auto max-w-3xl">
          {items.length > 0 && (
            <>
              <Marquee direction="left" speed={70}>
                {rowOne.map((item, i) => (
                  <QuoteCard key={`a-${item.id}-${i}`} item={item} />
                ))}
              </Marquee>
              <Marquee direction="right" speed={80}>
                {rowTwo.map((item, i) => (
                  <QuoteCard key={`b-${item.id}-${i}`} item={item} />
                ))}
              </Marquee>
            </>
          )}
        </DataState>
      </div>
    </Section>
  );
}
