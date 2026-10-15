import { Link } from "react-router-dom";
import { Clock, GraduationCap } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import HeartButton from "@/components/ui/HeartButton";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import ProgramIcon from "./ProgramIcon";

/** Program grid card: stretched link to the detail page, HeartButton sits above it. */
export default function ProgramCard({ program }) {
  return (
    <Card as="article" glow tilt className="flex h-full flex-col overflow-hidden">
      <div className="relative">
        <ImageWithFallback
          src={program.image_url}
          alt=""
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-44 w-full"
          imgClassName="transition-transform duration-700 group-hover/card:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" aria-hidden="true" />
        <div className="absolute right-3 top-3 z-10">
          <HeartButton
            item={{
              type: "program",
              slug: program.slug,
              title: program.title,
              image_url: program.image_url,
              subtitle: program.stat_label,
            }}
          />
        </div>
        <span className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-ink shadow-glow">
          <ProgramIcon name={program.icon} className="h-6 w-6" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-6 pb-6 pt-10">
        <Badge variant="success" className="self-start">
          {program.stat_label}
        </Badge>
        <h3 className="text-lg font-bold text-ink">{program.title}</h3>
        <p className="line-clamp-3 text-[15px] leading-7 text-muted">{program.short_description}</p>
        <ul className="mt-1 flex flex-col gap-1.5 text-sm text-ink-700">
          <li className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-purple" aria-hidden="true" />
            {program.schedule}
          </li>
          <li className="flex items-start gap-2">
            <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-purple" aria-hidden="true" />
            {program.age_range}
          </li>
        </ul>
        <Link
          to={`/programs/${program.slug}`}
          className="mt-auto pt-3 text-[15px] font-bold text-purple outline-none after:absolute after:inset-0 after:rounded-card focus-visible:after:ring-4 focus-visible:after:ring-mint/60"
        >
          Learn More
          <span aria-hidden="true"> &rsaquo;</span>
          <span className="sr-only"> about {program.title}</span>
        </Link>
      </div>
    </Card>
  );
}
