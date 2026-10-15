import { MessageCircleQuestion } from "lucide-react";
import { useGetSiteQuery } from "@/api/nepalwillApi";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Skeleton from "@/components/ui/Skeleton";
import DataState from "../components/DataState";

function FaqSkeleton() {
  return (
    <div className="flex flex-col gap-3" role="status" aria-label="Loading questions">
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton key={i} className="h-[62px] w-full rounded-card" />
      ))}
    </div>
  );
}

/** Frequently asked questions plus a "Still have questions?" panel. */
export default function Faq() {
  const query = useGetSiteQuery();
  const faqs = [...(query.data?.faqs ?? [])].sort((a, b) => a.order - b.order);

  return (
    <Section id="faq">
      <SectionHeading eyebrow="NepalWill" title="Frequently Asked Questions" />
      <div className="mt-12 grid items-start gap-8 md:mt-16 lg:grid-cols-[1fr_340px] lg:gap-12">
        <DataState query={query} skeleton={<FaqSkeleton />} errorTitle="Could not load questions">
          {faqs.length > 0 ? (
            <Accordion items={faqs} defaultOpen={faqs[0].id} />
          ) : (
            <p className="rounded-card border border-dashed border-line bg-white/60 px-6 py-10 text-center text-muted">
              Questions will appear here soon. In the meantime, send us a message.
            </p>
          )}
        </DataState>

        <aside className="flex flex-col items-start gap-4 rounded-card bg-ink-gradient p-7 text-white shadow-lift lg:sticky lg:top-28">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-mint">
            <MessageCircleQuestion className="h-6 w-6" aria-hidden="true" />
          </span>
          <h3 className="font-display text-3xl leading-tight">Still have questions?</h3>
          <p className="leading-7 text-white/70">
            Ask us anything about volunteering, in-kind donations or our programs. A real person
            replies.
          </p>
          <Button to="/contact" arrow className="mt-1">
            Contact us
          </Button>
        </aside>
      </div>
    </Section>
  );
}
