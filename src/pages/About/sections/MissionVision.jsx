import { Compass, Eye } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerGrid, { StaggerItem } from "@/components/ui/StaggerGrid";

const BLOCKS = [
  {
    icon: Compass,
    title: "Our Mission",
    text: "To uplift primary school children in Nepal by providing essential educational resources and opportunities, accepting in-kind contributions only so that every gift reaches a classroom.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "NepalWill envisions a future where every Nepali, regardless of background, has the skills, confidence, and resources to thrive in a rapidly evolving world. By fostering education, innovation, and global connectivity, we aim to build a society where Nepalese individuals can unlock their full potential and contribute to national and global progress.",
  },
];

/** Mint band with mission and vision side by side. */
export default function MissionVision() {
  return (
    <Section id="mission" className="bg-gradient-to-br from-mint via-[#A8F3D0] to-[#8EE9C3]">
      <SectionHeading eyebrow="NepalWill" title="Mission and Vision" />
      <StaggerGrid className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
        {BLOCKS.map(({ icon: Icon, title, text }) => (
          <StaggerItem
            key={title}
            className="flex flex-col gap-4 rounded-card bg-white/60 p-7 backdrop-blur-sm md:p-9"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-purple shadow-soft">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="font-display text-3xl text-ink">{title}</h3>
            <p className="leading-7 text-ink-700">{text}</p>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </Section>
  );
}
