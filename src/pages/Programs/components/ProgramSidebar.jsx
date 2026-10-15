import { Link } from "react-router-dom";
import { CalendarDays, GraduationCap, Users } from "lucide-react";
import Card from "@/components/ui/Card";
import CountUp from "@/components/ui/CountUp";
import HeartButton from "@/components/ui/HeartButton";
import { useGetEventsQuery } from "@/api/nepalwillApi";
import { formatShortDate } from "@/pages/Events/components/eventFormat";

function Fact({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
        <p className="font-bold text-ink">{children}</p>
      </div>
    </div>
  );
}

// Same arg as the home page ({ upcoming: 1 }) so RTK Query shares one cache entry.
function RelatedEvents({ slug }) {
  const { data } = useGetEventsQuery({ upcoming: 1 });
  const events = (data || []).filter((e) => e.program_slug === slug).slice(0, 3);
  return (
    <div className="mt-6 border-t border-line pt-5">
      <h3 className="text-sm font-bold text-ink">Upcoming events</h3>
      {events.length === 0 ? (
        <p className="mt-2 text-sm text-muted">No events scheduled for this program right now.</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-2">
          {events.map((e) => (
            <li key={e.slug}>
              <Link
                to={`/events/${e.slug}`}
                className="flex items-center gap-3 rounded-xl p-2 outline-none transition-colors hover:bg-mint-50 focus-visible:ring-4 focus-visible:ring-mint/60"
              >
                <span className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-chip bg-white text-center shadow-soft ring-1 ring-line">
                  <span className="text-[10px] font-bold uppercase leading-none text-purple">
                    {formatShortDate(e.date).month}
                  </span>
                  <span className="text-base font-bold leading-tight text-ink">{formatShortDate(e.date).day}</span>
                </span>
                <span className="min-w-0 text-sm font-medium text-ink">{e.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Sticky Quick Facts card with related upcoming events and the favorite toggle. */
export default function ProgramSidebar({ program }) {
  return (
    <Card hover={false} className="p-6 lg:sticky lg:top-24">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-display text-2xl text-ink">Quick Facts</h2>
        <HeartButton
          variant="plain"
          item={{
            type: "program",
            slug: program.slug,
            title: program.title,
            image_url: program.image_url,
            subtitle: program.stat_label,
          }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Fact icon={CalendarDays} label="Schedule">
          {program.schedule}
        </Fact>
        <Fact icon={GraduationCap} label="Age range">
          {program.age_range}
        </Fact>
        <Fact icon={Users} label="Active volunteers">
          <CountUp to={program.active_volunteers} />
        </Fact>
      </div>
      <RelatedEvents slug={program.slug} />
    </Card>
  );
}
