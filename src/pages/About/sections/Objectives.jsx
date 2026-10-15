import { BookOpen, Globe, Target, Users, ShieldCheck } from "lucide-react";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerGrid, { StaggerItem } from "@/components/ui/StaggerGrid";

const OBJECTIVES = [
  {
    icon: BookOpen,
    title: "Resource Accessibility",
    text: "Provide essential educational supplies such as books, uniforms, stationery, and digital tools to primary schools in need.",
  },
  {
    icon: Globe,
    title: "Global Connectivity",
    text: "Connect students with international volunteers and mentors for cross-cultural learning and language development.",
  },
  {
    icon: Users,
    title: "Community Engagement",
    text: "Foster collaborations with local and international supporters to create sustainable educational opportunities.",
  },
  {
    icon: ShieldCheck,
    title: "Transparency & Integrity",
    text: "Maintain complete transparency by exclusively accepting in-kind contributions that directly benefit students.",
  },
  {
    icon: Target,
    title: "Skill Development",
    text: "Equip students with practical skills that prepare them for success in a rapidly changing world.",
  },
];

/** Values and objectives grid; the last row is centred. */
export default function Objectives() {
  return (
    <Section id="objectives">
      <SectionHeading eyebrow="NepalWill" title="Our Objectives" />
      <StaggerGrid className="mt-12 flex flex-wrap justify-center gap-6 md:mt-16">
        {OBJECTIVES.map(({ icon: Icon, title, text }) => (
          <StaggerItem key={title} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
            <Card glow className="flex h-full flex-col items-center gap-4 p-8 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple/10 text-purple">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold text-ink">{title}</h3>
              <p className="leading-7 text-muted">{text}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </Section>
  );
}
