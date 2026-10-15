import { Check } from "lucide-react";
import { useGetSiteQuery } from "@/api/nepalwillApi";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Skeleton from "@/components/ui/Skeleton";
import StaggerGrid, { StaggerItem } from "@/components/ui/StaggerGrid";
import fallback from "@/assets/splashImg3.png";

const REASONS = [
  {
    title: "Bridging Educational Gaps",
    text: "We bring classes, books and devices to schools on the edge of the valley.",
  },
  {
    title: "Focus on Primary Education",
    text: "Early years are where reading, numbers and curiosity take root.",
  },
  {
    title: "Interactive Learning Environment",
    text: "Hands-on lessons, group work and play keep every child involved.",
  },
  {
    title: "Volunteer Support",
    text: "Local and remote volunteers from many countries teach and mentor.",
  },
  {
    title: "100% In-Kind Donations",
    text: "No cash changes hands. Every item goes straight to a classroom.",
  },
];

/** Image with an offset mint frame next to a checklist of reasons to support NepalWill. */
export default function Why() {
  const { data, isLoading } = useGetSiteQuery();
  const photo = (data?.gallery ?? []).find((item) => item.category === "Community");

  return (
    <Section id="why" className="overflow-hidden">
      <SectionHeading eyebrow="NepalWill" title="Why NepalWill?" />
      <div className="mt-12 grid items-center gap-14 md:mt-16 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-3 lg:mx-0">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-hero border-2 border-mint-strong/60 bg-mint/25 md:translate-x-6 md:translate-y-6"
          />
          {isLoading ? (
            <Skeleton className="relative aspect-[4/3] w-full rounded-hero" />
          ) : (
            <ImageWithFallback
              src={photo?.image_url ?? fallback}
              alt={photo?.title ?? "Students working together at a NepalWill class"}
              className="relative aspect-[4/3] w-full rounded-hero shadow-lift"
            />
          )}
        </div>

        <StaggerGrid role="list" className="flex flex-col" stagger={0.1}>
          {REASONS.map((reason) => (
            <StaggerItem
              key={reason.title}
              role="listitem"
              className="flex items-start gap-4 border-b border-ink/10 py-5 first:pt-0 last:border-b-0 last:pb-0"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint-50 text-success">
                <Check className="h-5 w-5" strokeWidth={3} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-ink">{reason.title}</h3>
                <p className="mt-1 text-[15px] leading-6 text-muted">{reason.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </Section>
  );
}
