import SectionHeading from "@/components/ui/SectionHeading";

/** Temporary page body used until each page is built. Replace the page file's contents entirely. */
export default function PagePlaceholder({ eyebrow = "NepalWill", title, subtitle }) {
  return (
    <section className="container-page py-24 md:py-32">
      <SectionHeading as="h1" eyebrow={eyebrow} title={title} subtitle={subtitle} />
    </section>
  );
}
