import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerGrid, { StaggerItem } from "@/components/ui/StaggerGrid";
import GlowCard from "../components/GlowCard";

const GOALS = [
  {
    number: "4",
    icon: GraduationCap,
    title: "Quality Education (SDG 4)",
    text: "We provide resources and free classes to children who would otherwise go without, so access to a good education does not depend on where a family lives.",
    practice: "Weekly digital literacy, English and science lessons taught by volunteers.",
  },
  {
    number: "8",
    icon: BriefcaseBusiness,
    title: "Decent Work and Economic Growth (SDG 8)",
    text: "We build practical skills that match what local employers look for, giving young people a stronger start in the job market.",
    practice: "Typing, spoken English and leadership training that carry into work life.",
  },
];

/** Two glowing cards linking NepalWill programs to UN Sustainable Development Goals. */
export default function Sdg() {
  return (
    <Section id="sdg" className="bg-white/40">
      <SectionHeading
        eyebrow="NepalWill"
        title="Linking Our Vision with the SDGs"
        subtitle="Our programs directly contribute to the UN Sustainable Development Goals."
      />
      <StaggerGrid className="mx-auto mt-12 grid max-w-5xl gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
        {GOALS.map(({ number, icon: Icon, title, text, practice }) => (
          <StaggerItem key={number} className="h-full">
            <GlowCard className="h-full" innerClassName="flex flex-col gap-5 p-7 md:p-9">
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple/10 text-purple">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span
                  aria-hidden="true"
                  className="bg-signature bg-clip-text font-display text-7xl leading-none text-transparent"
                >
                  {number}
                </span>
              </div>
              <h3 className="font-display text-3xl leading-tight text-ink">{title}</h3>
              <p className="leading-7 text-ink-700">{text}</p>
              <p className="mt-auto rounded-xl bg-mint-50 px-4 py-3 text-sm leading-6 text-success-strong">
                <strong className="font-bold">In practice: </strong>
                {practice}
              </p>
            </GlowCard>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </Section>
  );
}
