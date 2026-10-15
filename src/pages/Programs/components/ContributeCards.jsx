import { Globe, Handshake, Package } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StaggerGrid, { StaggerItem } from "@/components/ui/StaggerGrid";

const WAYS = [
  {
    type: "material",
    icon: Package,
    title: "Donate Materials",
    text: "Books, stationery, school uniforms, laptops. Every physical resource makes a direct impact.",
    tile: "bg-mint/20 text-mint",
  },
  {
    type: "volunteer",
    icon: Globe,
    title: "Volunteer to Teach",
    text: "Share your knowledge remotely over video calls, or visit Nepal in person to teach in classrooms.",
    tile: "bg-sky-300/15 text-sky-300",
  },
  {
    type: "partner",
    icon: Handshake,
    title: "Partner With Us",
    text: "Represent a school, organisation or company? Let us build something lasting together.",
    tile: "bg-purple/25 text-[#B9A9FF]",
  },
];

/** Dark band with the three ways to contribute. No cash is ever requested. */
export default function ContributeCards() {
  return (
    <Section tone="dark" className="grain overflow-hidden" containerClassName="relative z-10">
      <SectionHeading
        eyebrow="How you can help"
        title="Ways to Contribute"
        subtitle="We don't accept cash donations. Here's what truly makes a difference."
        tone="dark"
      />
      <StaggerGrid className="mt-14 grid gap-5 md:grid-cols-3">
        {WAYS.map(({ type, icon: Icon, title, text, tile }) => (
          <StaggerItem key={type} className="h-full">
            <Card
              glow
              className="flex h-full flex-col items-center gap-4 !border-white/10 !bg-white/5 p-7 text-center text-white"
            >
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tile}`}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="flex-1 text-[15px] leading-7 text-white/70">{text}</p>
              <Button
                variant="ghost"
                to={`/contact?type=${type}`}
                className="!text-mint hover:!text-white"
              >
                Learn More
                <span className="sr-only"> about {title.toLowerCase()} and the contact form</span>
              </Button>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </Section>
  );
}
