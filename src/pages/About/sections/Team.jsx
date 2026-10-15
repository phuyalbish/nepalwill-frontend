import ImageWithFallback from "@/components/ui/ImageWithFallback";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerGrid, { StaggerItem } from "@/components/ui/StaggerGrid";

const TEAM = [
  { photo: "/team/team1.png", role: "Founder & Director", line: "Sets the direction and leads partnerships." },
  { photo: "/team/team2.png", role: "Co-Founder & Operations", line: "Keeps classes, deliveries and volunteers running." },
  { photo: "/team/team3.png", role: "International Relations", line: "Connects NepalWill with volunteers abroad." },
  { photo: "/team/team4.png", role: "Program Coordinator", line: "Plans lessons with partner school teachers." },
];

/** Team portraits with role titles. */
export default function Team() {
  return (
    <Section id="team" tone="sage">
      <SectionHeading
        eyebrow="NepalWill"
        title="Meet Our Team"
        subtitle="The passionate people behind NepalWill's mission."
      />
      <StaggerGrid className="mt-12 grid grid-cols-2 gap-5 md:mt-16 lg:grid-cols-4 lg:gap-8">
        {TEAM.map((member) => (
          <StaggerItem key={member.role} className="group flex flex-col items-center text-center">
            <ImageWithFallback
              src={member.photo}
              alt={`Portrait of our ${member.role}`}
              className="aspect-[276/334] w-full rounded-card shadow-soft ring-1 ring-line"
              imgClassName="transition-transform duration-700 group-hover:scale-105"
            />
            <h3 className="mt-4 font-bold text-ink">{member.role}</h3>
            <p className="mt-1 text-sm leading-5 text-muted">{member.line}</p>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </Section>
  );
}
