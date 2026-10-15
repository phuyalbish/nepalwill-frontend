import { ExternalLink } from "lucide-react";
import { useGetSiteQuery } from "@/api/nepalwillApi";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Skeleton from "@/components/ui/Skeleton";
import StaggerGrid, { StaggerItem } from "@/components/ui/StaggerGrid";
import DataState from "../components/DataState";

const WORDMARK =
  "group/mark flex min-h-[84px] items-center justify-center gap-2 rounded-card border border-transparent px-7 py-4 text-center font-display text-2xl leading-tight text-muted-300 grayscale transition-all duration-300 md:text-[28px]";
const WORDMARK_HOVER = "hover:border-line hover:bg-white hover:text-ink hover:shadow-soft hover:grayscale-0";

function Wordmark({ item }) {
  const trustee = item.kind === "trustee";
  const label = (
    <>
      <span>{item.name}</span>
      {trustee && (
        <span className="rounded-pill bg-ink/5 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
          Trustee
        </span>
      )}
    </>
  );
  if (item.website) {
    return (
      <a
        href={item.website}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.name} (opens in a new tab)`}
        className={`${WORDMARK} ${WORDMARK_HOVER}`}
      >
        {label}
        <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover/mark:opacity-60" aria-hidden="true" />
      </a>
    );
  }
  return <div className={`${WORDMARK} ${WORDMARK_HOVER}`}>{label}</div>;
}

function SupportersSkeleton() {
  return (
    <div className="flex flex-wrap justify-center gap-4" role="status" aria-label="Loading supporters">
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton key={i} className="h-[84px] w-44 rounded-card" />
      ))}
    </div>
  );
}

/** Supporters and trustees as stylised wordmarks: muted at rest, ink on hover. */
export default function Supporters() {
  const query = useGetSiteQuery();
  const items = [...(query.data?.supporters ?? [])].sort((a, b) => a.order - b.order);

  return (
    <Section>
      <SectionHeading eyebrow="NepalWill" title="Our Supporters & Trustees" />
      <div className="mt-10 md:mt-14">
        <DataState query={query} skeleton={<SupportersSkeleton />} errorTitle="Could not load supporters">
          {items.length > 0 && (
            <StaggerGrid role="list" className="flex flex-wrap items-stretch justify-center gap-3 md:gap-4" stagger={0.06}>
              {items.map((item) => (
                <StaggerItem key={item.id ?? item.name} role="listitem" className="flex">
                  <Wordmark item={item} />
                </StaggerItem>
              ))}
            </StaggerGrid>
          )}
        </DataState>
      </div>
    </Section>
  );
}
