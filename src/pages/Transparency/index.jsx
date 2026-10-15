import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactBand from "./components/ContactBand";
import FlowStepper from "./components/FlowStepper";
import KpiBoard from "./components/KpiBoard";
import NoCashBanner from "./components/NoCashBanner";
import RecordsSection from "./components/RecordsSection";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Transparency() {
  useDocumentTitle("Transparency");
  return (
    <>
      <header className="relative overflow-hidden pb-10 pt-16 md:pb-14 md:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] max-w-full -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(153_242_200/0.3),transparent)]"
        />
        <div className="container-page relative flex flex-col gap-10 md:gap-14">
          <SectionHeading
            as="h1"
            eyebrow="Open books"
            title="Accountability."
            accent="Transparency Report."
            subtitle="Every book, every laptop, every pencil, publicly tracked from donor to student. We believe accountability is not optional. It is the foundation."
            className="max-w-3xl"
          />
          <NoCashBanner />
          <KpiBoard />
        </div>
      </header>

      <Section tone="sage">
        <SectionHeading
          eyebrow="NepalWill"
          title="How Resources"
          accent="Flow."
          subtitle="From the moment a contribution is made to when it reaches a student's hands."
          className="mb-14 md:mb-20"
        />
        <FlowStepper />
      </Section>

      <Section id="records">
        <SectionHeading
          eyebrow="NepalWill"
          title="Recent Contribution"
          accent="Records."
          subtitle="A public log of all tracked contributions with delivery details."
          className="mb-10 md:mb-12"
        />
        <RecordsSection />
      </Section>

      <ContactBand />
    </>
  );
}
