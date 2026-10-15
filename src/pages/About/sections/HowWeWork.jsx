import { ClipboardCheck, Eye, GraduationCap, Package } from "lucide-react";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerGrid, { StaggerItem } from "@/components/ui/StaggerGrid";

const STEPS = [
  {
    icon: Package,
    title: "Donors offer items",
    text: "Books, laptops, stationery and supplies. Contact us first so gifts match real needs.",
  },
  {
    icon: ClipboardCheck,
    title: "We log every item",
    text: "Each gift is recorded with the donor, the item, the recipient school and its status.",
  },
  {
    icon: GraduationCap,
    title: "Items reach classrooms",
    text: "Volunteers deliver and set up everything directly with our partner schools.",
  },
  {
    icon: Eye,
    title: "The record is public",
    text: "The Transparency page shows how every resource flows from donors to students.",
  },
];

/** The in-kind only process in four numbered steps. */
export default function HowWeWork() {
  return (
    <Section id="how" tone="sage">
      <SectionHeading
        eyebrow="How we work"
        title="In-kind only, by design"
        subtitle="We never accept cash. That keeps every contribution visible and every outcome traceable."
      />
      <StaggerGrid className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
        {STEPS.map(({ icon: Icon, title, text }, i) => (
          <StaggerItem
            key={title}
            className="relative flex h-full flex-col gap-3 rounded-card border border-line bg-white p-6 shadow-soft"
          >
            <span
              aria-hidden="true"
              className="absolute right-5 top-4 font-display text-5xl leading-none text-ink/10"
            >
              {i + 1}
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-50 text-success-strong">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="font-bold text-ink">{title}</h3>
            <p className="text-[15px] leading-6 text-muted">{text}</p>
          </StaggerItem>
        ))}
      </StaggerGrid>
      <div className="mt-10 flex justify-center">
        <Button to="/transparency" variant="outline">
          See the donation record
        </Button>
      </div>
    </Section>
  );
}
