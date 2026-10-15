import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import MeshBlobs from "@/pages/Home/components/MeshBlobs";
import photo from "@/assets/splashImg1.png";

/** About page opener: title, mission copy and a framed photo. */
export default function Intro() {
  return (
    <Section reveal={false} className="overflow-hidden !pb-[72px] md:!pb-[100px]">
      <MeshBlobs />
      <div className="relative z-10">
        <SectionHeading
          as="h1"
          eyebrow="NepalWill"
          title="About"
          accent="NepalWill"
          subtitle="Dedicated to uplifting primary school children in Nepal through the transformative power of education."
        />
        <div className="mt-14 grid items-center gap-12 md:mt-20 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-5 text-lg leading-8 text-ink-700">
            <p>
              <span className="font-display text-2xl text-ink">NepalWill</span> is a
              non-governmental organization dedicated to uplifting primary school children in Nepal
              by providing essential educational resources and opportunities.
            </p>
            <p>
              What sets NepalWill apart is its commitment to transparency and integrity by
              exclusively accepting in-kind contributions such as books, school supplies, and
              infrastructure support.
            </p>
            <p>
              Our ultimate goal is to create sustainable educational opportunities that inspire
              young learners to dream big and achieve their full potential.
            </p>
          </div>
          <div className="relative mx-3 lg:mx-0">
            <div
              aria-hidden="true"
              className="absolute inset-0 -translate-x-4 translate-y-4 rounded-hero border-2 border-mint-strong/60 bg-mint/25 md:-translate-x-6 md:translate-y-6"
            />
            <ImageWithFallback
              src={photo}
              alt="Smiling students gathered at a partner school"
              priority
              className="relative aspect-[4/3] w-full rounded-hero shadow-lift"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
